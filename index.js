const fetch = require("node-fetch");

const API_TOKEN = "fqthilF8Q-5yXTMJGW1x1CdYnvdcJM_cdeSbEh-BBdk";
// const HUNTER_API_KEY = "your_hunter_api_key";

// Get latest startups from Product Hunt
async function getLatestStartups() {
  const query = `
  query {
    posts(first: 5) {
      edges {
        node {
          id
          name
          tagline
          url
        }
      }
    }
  }`;

  const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  const data = await response.json();
  return data.data.posts.edges.map(post => post.node);
}

// Get detailed info about a startup
async function getStartupDetails(postId) {
    const query = `
    query {
      post(id: "${postId}") {
        id
        name
        tagline
        description
        url
        website
        createdAt
        featuredAt
        votesCount
        commentsCount
        reviewsCount
        reviewsRating
        thumbnail {
          url
        }
        
        makers {
          id
          name
          username
          twitterUsername
          websiteUrl
          profileImage
          headline
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
        
        media {
          url
          type
        }
        
        # Limiting comments to reduce complexity
        comments(first: 5) {
          edges {
            node {
              id
              body
              createdAt
              user {
                name
                username
              }
            }
          }
        }
      }
    }
  `;


  const response = await fetch("https://api.producthunt.com/v2/api/graphql", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${API_TOKEN}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ query })
  });

  
  const data = await response.json();

  console.log("Raw API Response:", JSON.stringify(data, null, 2)); // 👈 Log the full response
  
  if (!data.data || !data.data.post) {
    console.error("❌ Error: No post data found for ID:", postId);
    return null; // Return null instead of breaking the script
  }
  return data.data.post;
}

// Get email from website using Hunter.io
async function getEmails(domain) {
  const response = await fetch(`https://api.hunter.io/v2/domain-search?domain=${domain}&api_key=${HUNTER_API_KEY}`);
  const data = await response.json();
  return data.data.emails ? data.data.emails.map(email => email.value) : [];
}

// Run full lead generation process
async function runLeadGen() {
  const startups = await getLatestStartups();
  console.log(startups)

//   for (let startup of startups) {
//     console.log(`Fetching details for ${startup.name}...`);
//     const details = await getStartupDetails(startup.id);

//     // let emails = [];
//     // if (details.makers.length > 0 && details.makers[0].website) {
//     //   const domain = new URL(details.makers[0].website).hostname;
//     //   emails = await getEmails(domain);
//     // }

//     console.log({
//       name: details.name,
//       description: details.description,
//       url: details.url,
//       twitter: details.makers.length > 0 ? `https://twitter.com/${details.makers[0].twitterUsername}` : "N/A",
//     //   emails
//     });
//   }
}

runLeadGen();
