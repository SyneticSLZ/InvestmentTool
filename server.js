const express = require('express');
const axios = require('axios');
require('dotenv').config();
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Crunchbase API base URL
const CRUNCHBASE_API_URL = 'https://api.crunchbase.com/api/v4/entities/organizations';
const apiKey = process.env.api

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
    const url = `https://piloterr.com/api/v2/crunchbase/funding_rounds?days_since_announcement=${daysAgo}&investment_type=${investmentType}`;
    
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
        const data = await getFundingRounds(apiKey);
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


app.listen(PORT, async() => {
    console.log(`Server is running on http://localhost:${PORT}`);
    saveFundingRounds(apiKey, 'output.json');

// const data = await getFundingRounds(apiKey)
//     .then(data => console.log(data))
//     .catch(error => console.error(error));
});