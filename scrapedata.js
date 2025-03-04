const puppeteer = require('puppeteer');
const fs = require('fs').promises;

async function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// async function scrapeCompanyDetails(page, url) {
//     try {
//         await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
//         await delay(2000); // Wait for dynamic content

//         const details = await page.evaluate(() => {
//             function getTextContent(selector) {
//                 const el = document.querySelector(selector);
//                 return el ? el.textContent.trim() : null;
//             }

//             function getMetaContent(name) {
//                 const el = document.querySelector(`meta[name="${name}"]`);
//                 return el ? el.getAttribute('content') : null;
//             }

//             // Get all team members
//             const teamMembers = Array.from(document.querySelectorAll('[class*="teamMember"]')).map(member => {
//                 const name = member.querySelector('h3')?.textContent.trim();
//                 const role = member.querySelector('p')?.textContent.trim();
//                 const linkedIn = member.querySelector('a[href*="linkedin.com"]')?.href;
//                 return { name, role, linkedIn };
//             });

//             // Get all jobs
//             const jobs = Array.from(document.querySelectorAll('[class*="jobListing"]')).map(job => {
//                 const title = job.querySelector('h3')?.textContent.trim();
//                 const location = job.querySelector('[class*="location"]')?.textContent.trim();
//                 return { title, location };
//             });

//             // Get funding information
//             const fundingInfo = Array.from(document.querySelectorAll('[class*="funding"]')).map(funding => {
//                 const round = funding.querySelector('[class*="round"]')?.textContent.trim();
//                 const amount = funding.querySelector('[class*="amount"]')?.textContent.trim();
//                 const date = funding.querySelector('[class*="date"]')?.textContent.trim();
//                 return { round, amount, date };
//             });

//             return {
//                 companyName: getTextContent('h1'),
//                 description: getMetaContent('description') || getTextContent('[class*="description"]'),
//                 founded: getTextContent('[class*="founded"]'),
//                 location: getTextContent('[class*="location"]'),
//                 teamSize: getTextContent('[class*="teamSize"]'),
//                 website: document.querySelector('a[class*="website"]')?.href,
//                 socialLinks: {
//                     twitter: document.querySelector('a[href*="twitter.com"]')?.href,
//                     linkedin: document.querySelector('a[href*="linkedin.com"]')?.href,
//                     facebook: document.querySelector('a[href*="facebook.com"]')?.href,
//                 },
//                 teamMembers,
//                 openPositions: jobs,
//                 fundingHistory: fundingInfo,
//                 techStack: Array.from(document.querySelectorAll('[class*="techStack"] [class*="tag"]')).map(tag => tag.textContent.trim()),
//                 metrics: {
//                     revenue: getTextContent('[class*="revenue"]'),
//                     growth: getTextContent('[class*="growth"]'),
//                     users: getTextContent('[class*="users"]')
//                 }
//             };
//         });

//         return details;
//     } catch (error) {
//         console.error(`Error scraping details for ${url}:`, error.message);
//         return null;
//     }
// }

async function scrapeCompanyDetails(page, url) {
    try {
        await page.goto(url, {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Extract all the detailed information
        const details = await page.evaluate(() => {
            // Helper function to safely extract text
            const getText = (selector) => {
                const el = document.querySelector(selector);
                return el ? el.textContent.trim() : null;
            };

            // Helper function to extract URLs
            const getUrl = (selector) => {
                const el = document.querySelector(selector);
                return el ? el.href : null;
            };

            // Specific function to get the company website URL from the main nav section
            const getCompanyWebsite = () => {
                // Look for the URL in the navigation area after the Company/Jobs tabs
                const navLinks = document.querySelectorAll('nav + div a[href^="http"]');
                for (const link of navLinks) {
                    // Skip YCombinator internal links
                    if (!link.href.includes('ycombinator.com')) {
                        return link.href;
                    }
                }
                return null;
            };

            // Extract company metrics
            const getMetrics = () => {
                const metricsDiv = document.querySelector('.ycdc-card-new');
                if (!metricsDiv) return {};

                const metrics = {};
                const rows = metricsDiv.querySelectorAll('.flex.flex-row.justify-between');
                
                rows.forEach(row => {
                    const label = row.querySelector('span:first-child')?.textContent.trim().replace(':', '');
                    const value = row.querySelector('span:last-child')?.textContent.trim();
                    if (label && value) {
                        metrics[label.toLowerCase().replace(/\s+/g, '_')] = value;
                    }
                });

                return metrics;
            };

            // Extract founder information
            const getFounders = () => {
                const founders = [];
                const founderDivs = document.querySelectorAll('div[class*="flex-row flex-col items-start gap-6"]');
                
                founderDivs.forEach(div => {
                    const nameEl = div.querySelector('h3');
                    const bioEl = div.querySelector('.prose.max-w-full.whitespace-pre-line');
                    const linkedinEl = div.querySelector('a[href*="linkedin.com"]');
                    const twitterEl = div.querySelector('a[href*="twitter.com"]');
                    
                    if (nameEl) {
                        founders.push({
                            name: nameEl.textContent.replace(', Founder', '').trim(),
                            title: 'Founder',
                            bio: bioEl ? bioEl.textContent.trim() : null,
                            linkedin_url: linkedinEl ? linkedinEl.href : null,
                            twitter_url: twitterEl ? twitterEl.href : null
                        });
                    }
                });

                return founders;
            };

            // Get company logos
            const getLogos = () => {
                const logos = {
                    main_logo: null,
                    small_logo: null
                };
                
                // Get the main large logo from the header area
                const mainLogoImg = document.querySelector('.flex-row.items-center.gap-x-5 img');
                if (mainLogoImg) {
                    logos.main_logo = mainLogoImg.src;
                }
                
                // Get the small logo from the side card
                const smallLogoImg = document.querySelector('.ycdc-card-new img');
                if (smallLogoImg) {
                    logos.small_logo = smallLogoImg.src;
                }
                
                return logos;
            };

            // Get social/website links
            const links = {
                website: getCompanyWebsite(),
                linkedin: getUrl('a[href*="linkedin.com/company"]'),
                twitter: getUrl('a[href*="twitter.com"]'),
                github: getUrl('a[href*="github.com"]')
            };

            // Get company description
            const description = getText('.prose.max-w-full.whitespace-pre-line');

            // Get all tags
            const tags = Array.from(document.querySelectorAll('a[href^="/companies/industry/"] .yc-tw-Pill'))
                .map(tag => tag.textContent.trim());

            return {
                ...getMetrics(),
                ...getLogos(),
                links,
                description,
                tags,
                founders: getFounders()
            };
        });

        return details;

    } catch (error) {
        console.error(`Error scraping details for ${url}:`, error);
        return null;
    }
}


async function getRecentYCStartups(limit = 10) {
    let browser;
    
    try {
        browser = await puppeteer.launch({ 
            headless: false,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-web-security'
            ],
            defaultViewport: {
                width: 1920,
                height: 1080
            }
        });
        
        const page = await browser.newPage();
        
        console.log('Navigating to YCombinator companies page...');
        
        await page.goto('https://www.ycombinator.com/companies', {
            waitUntil: 'networkidle0',
            timeout: 60000
        });

        // Wait for sort dropdown to be available
        console.log('Setting sort order to Launch Date...');
        await page.waitForSelector('select');
        
        // Change sort to Launch Date
        await page.select('select', 'YCCompany_By_Launch_Date_production');
        await delay(3000); // Wait for sort to take effect

        // Wait for companies to be visible
        await page.waitForSelector('a[href^="/companies/"]', { timeout: 30000 });

        console.log('Extracting initial company information...');

        const companies = await page.evaluate((maxCompanies) => {
            const companyElements = Array.from(document.querySelectorAll('a[href^="/companies/"]'))
                .filter(el => el.textContent && el.href.split('/').length === 5)
                .slice(0, maxCompanies);

            return companyElements.map(company => {
                const nameEl = company.querySelector('span[class*="coName"]');
                const locationEl = company.querySelector('span[class*="coLocation"]');
                const descEl = company.querySelector('span[class*="coDescription"]');
                const batchEl = company.querySelector('span.pill svg[class*="fa-y-combinator"]');
                const tagElements = Array.from(company.querySelectorAll('span.pill'))
                    .filter(el => !el.querySelector('svg'))
                    .map(el => el.textContent.trim());

                return {
                    name: nameEl ? nameEl.textContent.trim() : '',
                    location: locationEl ? locationEl.textContent.trim() : '',
                    description: descEl ? descEl.textContent.trim() : '',
                    batch: batchEl ? batchEl.closest('span').textContent.trim() : '',
                    industries: tagElements,
                    url: company.href,
                    scrapedAt: new Date().toISOString()
                };
            });
        }, limit);

        // Filter out any invalid entries
        const validCompanies = companies.filter(c => c.name);

        console.log(`Found ${validCompanies.length} companies. Scraping detailed information...`);

        // Scrape detailed information for each company
        const detailedCompanies = [];
        for (const company of validCompanies) {
            console.log(`Scraping details for ${company.name}...`);
            const details = await scrapeCompanyDetails(page, company.url);
            detailedCompanies.push({
                ...company,
                details
            });
            await delay(1000); // Polite delay between requests
        }

        // Save results
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        const outputFile = `yc-startups-detailed-${timestamp}.json`;
        
        await fs.writeFile(
            outputFile,
            JSON.stringify(detailedCompanies, null, 2)
        );

        console.log(`Data saved to ${outputFile}`);

        // Display summary
        detailedCompanies.forEach((company, index) => {
            console.log(`\n${index + 1}. ${company.name}`);
            console.log(`   Location: ${company.location}`);
            console.log(`   Batch: ${company.batch}`);
            console.log(`   Team Size: ${company.details?.teamSize || 'N/A'}`);
            console.log(`   Open Positions: ${company.details?.openPositions?.length || 0}`);
            console.log(`   Tech Stack: ${company.details?.techStack?.join(', ') || 'N/A'}`);
        });

        return detailedCompanies;

    } catch (error) {
        console.error('Error during scraping:', error);
        throw error;
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Run the script
(async () => {
    try {
        await getRecentYCStartups(10);
    } catch (error) {
        console.error('Script failed:', error);
        process.exit(1);
    }
})();