// const puppeteer = require('puppeteer');

// async function scrapeProductHunt(url) {
//   const browser = await puppeteer.launch({
//     headless: "new",
//     defaultViewport: {
//       width: 1920,
//       height: 1080
//     },
//     args: ['--no-sandbox']
//   });

//   try {
//     const page = await browser.newPage();
    
//     await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
    
//     console.log('Navigating to page...');
//     await page.goto(url, { 
//       waitUntil: 'networkidle0', 
//       timeout: 30000 
//     });

//     await new Promise(resolve => setTimeout(resolve, 5000));

//     const productData = await page.evaluate(() => {
//       // Helper function to safely get text content
//       const getText = (selector) => {
//         const element = document.querySelector(selector);
//         return element ? element.innerText.trim() : '';
//       };

//       // Helper function to get all maker links
//       const getMakers = () => {
//         const makerElements = document.querySelectorAll('a[href*="/products/one-shot-lora/maker"]');
//         return Array.from(makerElements).map(maker => {
//           const name = maker.innerText.trim();
//           const profileUrl = maker.href;
          
//           // Try to find social links near the maker element
//           const parentElement = maker.closest('[class*="maker"]') || maker.parentElement;
//           const socialLinks = parentElement?.querySelectorAll('a[href*="://"]') || [];
          
//           const socials = Array.from(socialLinks).reduce((acc, link) => {
//             const href = link.href.toLowerCase();
//             if (href.includes('twitter.com')) acc.twitter = href;
//             if (href.includes('linkedin.com')) acc.linkedin = href;
//             if (href.includes('github.com')) acc.github = href;
//             if (href.includes('producthunt.com/@')) acc.producthunt = href;
//             return acc;
//           }, {});

//           return {
//             name,
//             profileUrl,
//             socials
//           };
//         });
//       };

//       // Get additional metadata
//       const getMetadata = () => {
//         const metadata = {};
//         const metaTags = document.getElementsByTagName('meta');
//         for (const tag of metaTags) {
//           const property = tag.getAttribute('property') || tag.getAttribute('name');
//           if (property) {
//             metadata[property] = tag.getAttribute('content');
//           }
//         }
//         return metadata;
//       };

//       return {
//         title: getText('h1'),
//         description: document.querySelector('meta[name="description"]')?.content || '',
//         tagline: getText('[class*="tagline"]') || getText('[class*="headline"]'),
//         makers: getMakers(),
//         metadata: getMetadata(),
//         url: window.location.href
//       };
//     });

//     console.log('Raw scraped data:', JSON.stringify(productData, null, 2));
//     return productData;

//   } catch (error) {
//     console.error('Detailed error:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name
//     });
//     throw error;
//   } finally {
//     await browser.close();
//   }
// }

// // Execute
// (async () => {
//   try {
//     console.log('Starting scrape...');
//     const data = await scrapeProductHunt('https://www.producthunt.com/posts/one-shot-lora');
//     console.log('Final scraped data:', JSON.stringify(data, null, 2));
//   } catch (error) {
//     console.error('Script failed:', {
//       message: error.message,
//       stack: error.stack,
//       name: error.name
//     });
//   }
// })();
const puppeteer = require('puppeteer');

async function scrapeProductHunt(url) {
  const browser = await puppeteer.launch({
    headless: "new",
    defaultViewport: {
      width: 1920,
      height: 1080
    },
    args: ['--no-sandbox']
  });

  try {
    const page = await browser.newPage();
    
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/121.0.0.0 Safari/537.36');
    
    console.log('Navigating to product page...');
    await page.goto(url, { 
      waitUntil: 'networkidle0', 
      timeout: 30000 
    });

    await new Promise(resolve => setTimeout(resolve, 3000));

    // Extract makers from the HTML content
    const makers = await page.evaluate(() => {
      const makerElements = document.querySelectorAll('[data-test="user-image-link"]');
      return Array.from(makerElements).map(maker => ({
        name: maker.getAttribute('aria-label'),
        profileUrl: 'https://producthunt.com' + maker.getAttribute('href')
      }));
    });

    console.log('Found makers:', makers);

    // Visit each maker's profile and get Twitter handles
    const makersWithSocial = [];
    for (const maker of makers) {
      console.log('Visiting profile:', maker.profileUrl);
      await page.goto(maker.profileUrl, { waitUntil: 'networkidle0' });
      await new Promise(resolve => setTimeout(resolve, 2000));

      const socialLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="twitter.com"], a[href*="linkedin.com"]'))
          .map(link => link.href);
        return {
          twitter: links.find(link => link.includes('twitter.com')),
          linkedin: links.find(link => link.includes('linkedin.com'))
        };
      });

      makersWithSocial.push({
        ...maker,
        socialLinks
      });

      console.log('Found social links for', maker.name, ':', socialLinks);
    }

    return {
      makers: makersWithSocial
    };

  } catch (error) {
    console.error('Detailed error:', {
      message: error.message,
      stack: error.stack,
      name: error.name
    });
    throw error;
  } finally {
    await browser.close();
  }
}

// Execute
(async () => {
  try {
    console.log('Starting scrape...');
    const data = await scrapeProductHunt('https://www.producthunt.com/posts/one-shot-lora');
    console.log('Final scraped data:', JSON.stringify(data, null, 2));
  } catch (error) {
    console.error('Script failed:', error);
  }
})();