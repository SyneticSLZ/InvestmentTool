const express = require('express');
const axios = require('axios');
require('dotenv').config();
const fetch = require('node-fetch');
const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const cors = require('cors');
const app = express();
const PORT = 3000;


// CORS Configuration
const corsOptions = {
    origin: function (origin, callback) {
        // Add your frontend URL(s) here
        const allowedOrigins = ['http://localhost:3000', 'https://syneticslz.github.io', 'http://127.0.0.1:5501'];
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true, // Allow credentials
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors({
    origin: ['http://localhost:3000', 'https://syneticslz.github.io', 'http://127.0.0.1:5501'],
    credentials: true
}));;
app.use(express.json())

// Crunchbase API base URL
const CRUNCHBASE_API_URL = 'https://api.crunchbase.com/api/v4/entities/organizations';
const CRUNCHBASE_API_KEY = process.env.CRUNCHBASE_API_KEY;
const CRUNCHBASE_BASE_URL = 'https://api.crunchbase.com/api/v4';
const apiKey = process.env.api

const HUNTER_API_KEY = process.env.HUNTER_API_KEY;
const HUNTER_API_URL = 'https://api.hunter.io/v2';


const nodemailer = require('nodemailer');


app.post('/send-email', async (req, res) => {
    try {
        const { to, subject, text, smtp } = req.body;

        const transporter = nodemailer.createTransport({
            host: smtp.host,
            port: smtp.port,
            secure: smtp.secure,
            auth: {
                user: 'syneticslz@gmail.com',
                pass: 'gble ksdb ntdq hqlx'
              }
        });

        const info = await transporter.sendMail({
            from: process.env.GMAIL_USER,
            to: to,
            subject: subject,
            text: text
        });

        res.json({ success: true, messageId: info.messageId });
    } catch (error) {
        console.error('Email sending error:', error);
        res.status(500).json({ success: false, error: error.message });
    }
});

// Mock data simulating Hunter.io response
const mockContactsResponse = {
    "data": {
        "domain": "stripe.com",
        "disposable": false,
        "webmail": false,
        "accept_all": true,
        "pattern": "{first}{l}",
        "organization": "Stripe",
        "description": "Stripe is a fintech company that specializes in online payment processing services.",
        "industry": "Technology, Information and Internet",
        "headcount": "1001-5000",
        "company_type": "privately held",
        "emails": [
            {
                "value": "adaly@stripe.com",
                "type": "personal",
                "confidence": 94,
                "first_name": "Aoibheann",
                "last_name": "Daly",
                "position": "Technical Account Manager",
                "seniority": "senior",
                "department": "sales",
                "linkedin": "https://www.linkedin.com/in/aoibhdaly",
                "verification": {
                    "date": "2025-01-22",
                    "status": "accept_all"
                }
            },
            {
                "value": "rishabh@stripe.com",
                "type": "personal",
                "confidence": 94,
                "first_name": "Rishabh",
                "last_name": "Tandon",
                "position": "Engineering Manager",
                "seniority": "senior",
                "department": "it",
                "linkedin": "https://www.linkedin.com/in/rishabh-tandon-29318143",
                "verification": {
                    "date": "2025-01-23",
                    "status": "accept_all"
                }
            },
            {
                "value": "hugh@stripe.com",
                "type": "personal",
                "confidence": 94,
                "first_name": "Hugh",
                "last_name": "Adams",
                "position": "Account Executive",
                "seniority": "executive",
                "department": "sales",
                "linkedin": "https://www.linkedin.com/in/hugh-adams",
                "verification": {
                    "date": "2025-01-14",
                    "status": "accept_all"
                }
            }
        ]
    },
    "meta": {
        "results": 948,
        "limit": 10,
        "offset": 0,
        "params": {
            "domain": "stripe.com",
            "company": null,
            "type": null,
            "seniority": null,
            "department": null
        }
    }
};


app.post('/search-contacts', async (req, res) => {
    // const { domain } = req.body;
    console.log(req.body)
    const { domain } = req.body

    if (!domain) {
        return res.status(400).json({ error: 'Domain is required' });
    }

    try {
        const response = await axios.get(`${HUNTER_API_URL}/domain-search`, {
            params: {
                domain,
                api_key: HUNTER_API_KEY,
                limit: 3, // Adjust as needed
                seniority: ['executive', 'senior'], // Filter for senior positions
                department: ['executive', 'finance', 'investment'] // Relevant departments
            }
        });

        console.log(response.data)
        // Cache the results if needed
        res.json(response.data);
    } catch (error) {
        console.error('Hunter.io API error:', error);
        res.status(500).json({ 
            error: 'Error fetching contacts',
            details: error.response?.data || error.message 
        });
    }

    // try {
    //     // Simulate API delay
    //     await new Promise(resolve => setTimeout(resolve, 1000));
        
    //     // Return mock data
    //     res.json(mockContactsResponse);
    // } catch (error) {
    //     console.error('Error:', error);
    //     res.status(500).json({ 
    //         error: 'Error fetching contacts',
    //         details: error.message 
    //     });
    // }
});
// Fetch latest funding rounds
app.get('/latest-investments', async (req, res) => {
    try {
        const response = await axios.get(`${CRUNCHBASE_API_URL}`, {
            params: {
                user_key: process.env.CRUNCHBASE_API_KEY,
                card_ids: 'investors', // Fetch investor data
                order: 'created_at DESC', // Get latest funding rounds first
                per_page: 10, // Limit to 10 results for testing
            },
        });

        const organizations = response.data.entities;

        // Map organizations to companies and investors
        const investments = organizations.map(org => ({
            company: org.properties.name,
            investors: org.relationships.investments.map(investment => investment.properties.investor_name),
            amount: org.properties.total_funding_usd,
            date: org.properties.founded_on,
        }));

        res.json(investments);
    } catch (error) {
        console.error('Error fetching funding data:', error);
        res.status(500).json({ error: 'Failed to fetch funding data' });
    }
});



async function getFundingRounds(apiKey, daysAgo = 30, investmentType = 'seed') {
    const url = `https://piloterr.com/api/v2/crunchbase/funding_rounds?days_since_announcement=${daysAgo}&investment_type=angel`;
    
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error fetching funding rounds:', error);
        throw error;
    }
}

async function saveFundingRounds(apiKey, outputPath = 'funding-rounds.json') {
    try {
        const data = await nfetchCrunchbaseDatao('c1bf457d-08a2-4e0d-a99f-33e2edb3897a')
        // getFundingRounds(apiKey); 
        await require('fs').promises.writeFile(
            outputPath, 
            JSON.stringify(data, null, 2)
        );
        console.log(`Data saved to ${outputPath}`);
        return data;
    } catch (error) {
        console.error('Error saving data:', error);
        throw error;
    }
}

// module.exports = getFundingRounds;

// Usage example:
async function fetchCrunchbaseData(uuid, type = 'organization') {
    try {
        const endpoint = type === 'organization' 
            ? `/entities/organizations/${uuid}`
            : `/entities/people/${uuid}`;
            
        const response = await fetch(`${CRUNCHBASE_BASE_URL}${endpoint}`, {
            headers: {
                'X-cb-user-key': CRUNCHBASE_API_KEY
            }
        });
// Clone the response and read it as text
const textResponse = await response.clone().text();
        
try {
    return JSON.parse(response.text());
} catch (parseError) {
    console.error('Error parsing response:', parseError);
    return null;
}
} catch (error) {
console.error('Crunchbase API error:', error);
return null;
}
}

app.get('/entity/:type/:uuid', async (req, res) => {
    const { type, uuid } = req.params;
    console.log("working")

    try {
        // // Check cache first
        // if (companyCache[uuid] && 
        //     Date.now() - companyCache[uuid].timestamp < CACHE_DURATION) {
        //     return res.json(companyCache[uuid].data);
        // }

        // Fetch from Crunchbase
        const response = await axios.get(
            `${CRUNCHBASE_BASE_URL}/entities/${type}/${uuid}`, {
                params: {
                    card_ids: 'fields'
                },
                headers: {
                    'X-cb-user-key': CRUNCHBASE_API_KEY
                }
            }
        );
console.log(response.data)
        res.json(response.data);
    } catch (error) {
        handleCrunchbaseError(error, res);
    }
});

// Middleware to handle Crunchbase API errors
const handleCrunchbaseError = (error, res) => {
    console.error('Crunchbase API error:', error);
    if (error.response) {
        return res.status(error.response.status).json({
            error: 'Crunchbase API error',
            details: error.response.data
        });
    }
    return res.status(500).json({ error: 'Internal server error' });
};


async function nfetchCrunchbaseDatap(uuid, type = 'people') {
    try {
        const endpoint = `/entities/${type}/${uuid}`;
        const response = await fetch(`${CRUNCHBASE_BASE_URL}${endpoint}?card_ids=fields`, {
            method: 'GET',
            headers: {
                'X-cb-user-key': CRUNCHBASE_API_KEY,
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('Crunchbase API error:', error);
        return null;
    }
}

    async function nfetchCrunchbaseDatao(uuid, type = 'organizations') {
        // async function fetchCrunchbaseData(uuid, type) {
            try {
                const endpoint = `/entities/${type === 'people' ? 'people' : 'organizations'}/${uuid}`;
                // /entities/people/{entity_id}
                
                const response = await fetch(`${CRUNCHBASE_BASE_URL}${endpoint}?card_ids=fields`, {
                    method: 'GET',
                    headers: {
                        'X-cb-user-key': CRUNCHBASE_API_KEY,
                        'Content-Type': 'application/json'
                    }
                });
        
                const data = await response.json();
                // console.log('API Response:', data); // Debug log
                return data;
            } catch (error) {
                console.error('Crunchbase API error:', error);
                return null;
            }
        }


        // Configure API request
const API_KEY = '656dc69a-ccf0-444c-8f9a-b47c72397a40'; // Replace with your actual API key
const API_URL = 'https://piloterr.com/api/v2/producthunt/product/info?query=ToolJet';
// https://piloterr.com/api/v2/producthunt/product/info?query=miro

const options = {
    method: 'GET',
    headers: {
        'x-api-key': API_KEY,
        'Content-Type': 'application/json'
    }
};

// Function to format date for filename
function getFormattedDate() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    
    return `${year}${month}${day}_${hours}${minutes}`;
}

// Function to save data to file
async function saveToFile(data, filename) {
    try {
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(a.href);
        console.log(`Data successfully saved to ${filename}`);
    } catch (error) {
        console.error('Error saving file:', error);
        throw error;
    }
}

// Main function to fetch and save data
async function fetchAndSaveProductData() {
    try {
        const response = await fetch(API_URL, options);
        
        console.log(response)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        
        const data = await response.json();
        const filename = `producthunt_data_${getFormattedDate()}.json`;
        
        await saveToFile(data, filename);
        return data;
    } catch (error) {
        console.error('Error fetching or saving data:', error);
        throw error;
    }
}

// Usage


const API_TOKEN = "fqthilF8Q-5yXTMJGW1x1CdYnvdcJM_cdeSbEh-BBdk"; // Replace with your API token
// query {
//     posts(first: 10) {
//       edges {
//         node {
//           id
//           name
//           tagline
//           url
//           votesCount
//           createdAt
//         }
//       }
//     }
//   }`;
const query = `


query {
    posts(first: 10) {
      edges {
        node {
          id
          name
          tagline
          description
          url
          votesCount
          commentsCount
          reviewsCount
          reviewsRating
          thumbnail {
            url
          }
          topics {
            edges {
              node {
                id
                name
                slug
                followersCount
              }
            }
          }
        }
      }
    }
  }`;

async function getLatestProductHuntPosts() {
  const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const outputFile = `prod-detailed-${timestamp}.json`;
  
  await fs.writeFile(
      outputFile,
      JSON.stringify(data, null, 2)
  );

  console.log(`Data saved to ${outputFile}`);
  console.log(data)
//   console.log(data.data.posts.edges.map(post => ({
//     name: post.node.name,
//     url: post.node.url,
//     tagline: post.node.tagline
//   })));
}




app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    getLatestProductHuntPosts();
    // fetchAndSaveProductData()
    // .then(data => {
    //     console.log('Operation completed successfully');
    //     console.log('Response data:', data);
    // })
    // .catch(error => {
    //     console.error('Operation failed:', error);
    // });
    // saveFundingRounds(apiKey);
    // data = await nfetchCrunchbaseDatao('c1bf457d-08a2-4e0d-a99f-33e2edb3897a')
    // console.log(data)
    // await require('fs').promises.writeFile(
    //     'company.json', 
    //     JSON.stringify(data, null, 2)
    // );
    // console.log(`Data saved`);
const data = await getFundingRounds(apiKey)
    .then(data => console.log(data))
    .catch(error => console.error(error));
});

