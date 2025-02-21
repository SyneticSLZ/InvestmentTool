

let postsData = [];
let ycData = [];
let fundingData = []
currentEventId = null
let activeTab = 'producthunt';
let currentCompanyData = null;
let currentModalTab = 'details';
let lastRefreshTime = new Date();
let activeModalTab = 'details';
let factiveModalTab = 'details';
let currentPostId = null;
let API_TOKEN = "fqthilF8Q-5yXTMJGW1x1CdYnvdcJM_cdeSbEh-BBdk";
const CRUNCHBASE_BASE_URL = 'https://api.crunchbase.com/api/v4';
const API_BASE_URL = 'https://investmenttool.onrender.com'; // Replace with your server URL

let companyCache = {};


// outputdata.js
const outputdata = {
    "results": [
      {
        "id": "853105",
        "name": "FirstHR 2.0 with HR Copilot",
        "tagline": "All-in-one HR platform for small business",
        "description": "For small business, FirstHR is an HR platform, focused on hiring and team development with a pinch of AI.",
        "url": "https://www.producthunt.com/posts/firsthr-2-0-with-hr-copilot?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+test++%28ID%3A+169128%29",
        "votesCount": 245,
        "commentsCount": 35,
        "reviewsCount": 0,
        "reviewsRating": 0,
        "thumbnail": {
          "url": "https://ph-files.imgix.net/7dd45374-635c-4d7a-a629-c0f1bd46e632.jpeg?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=64&h=64&fit=crop&frame=1&dpr=1"
        },
        "topics": {
          "edges": [
            {
              "node": {
                "id": "44",
                "name": "HR Tools",
                "slug": "hr-tools",
                "followersCount": 153962
              }
            },
            {
              "node": {
                "id": "268",
                "name": "Artificial Intelligence",
                "slug": "artificial-intelligence",
                "followersCount": 444637
              }
            }
          ]
        }
      },
      {
        "id": "810871",
        "name": "Readdy",
        "tagline": "Your AI Product Designer. Beautiful UI + Ready-to-use Code",
        "description": "Generate beautiful, professional designs in seconds, with ready-to-use code. Readdy is an AI product designer that turns your ideas into beautiful UI. Perfect for founders, product managers and developers.",
        "url": "https://www.producthunt.com/posts/readdy?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+test++%28ID%3A+169128%29",
        "votesCount": 335,
        "commentsCount": 76,
        "reviewsCount": 0,
        "reviewsRating": 0,
        "thumbnail": {
          "url": "https://ph-files.imgix.net/bb10ae0d-dda5-4f06-9a14-d97f62e97912.png?auto=format"
        },
        "topics": {
          "edges": [
            {
              "node": {
                "id": "44",
                "name": "Design Tools",
                "slug": "design-tools",
                "followersCount": 253962
              }
            },
            {
              "node": {
                "id": "267",
                "name": "Developer Tools",
                "slug": "developer-tools",
                "followersCount": 496539
              }
            }
          ]
        }
      },
      {
        "id": "865959",
        "name": "Figr Identity",
        "tagline": "Design systems in minutes: Ship consistent products faster",
        "description": "Create and manage design systems effortlessly. Generate comprehensive documentation, maintain component libraries, and ensure consistent product design across your organization.",
        "url": "https://www.producthunt.com/posts/figr-identity?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+test++%28ID%3A+169128%29",
        "votesCount": 182,
        "commentsCount": 28,
        "reviewsCount": 0,
        "reviewsRating": 0,
        "thumbnail": {
          "url": "https://ph-files.imgix.net/836d8fcd-cd6e-4a08-ae6a-38e469d5405a.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=64&h=64&fit=crop&frame=1&dpr=1"
        },
        "topics": {
          "edges": [
            {
              "node": {
                "id": "44",
                "name": "Design Tools",
                "slug": "design-tools",
                "followersCount": 253962
              }
            }
          ]
        }
      },
      {
        "id": "865689",
        "name": "ToolJet",
        "tagline": "Build Custom AI-Powered Apps & Agents Using AI",
        "description": "Create powerful AI applications without code. ToolJet lets you build custom AI-powered tools and agents that integrate with your existing workflows and data sources.",
        "url": "https://www.producthunt.com/posts/tooljet-fbec1c40-d2b4-4b33-a450-bae02664676d?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+test++%28ID%3A+169128%29",
        "votesCount": 275,
        "commentsCount": 42,
        "reviewsCount": 0,
        "reviewsRating": 0,
        "thumbnail": {
          "url": "https://ph-files.imgix.net/d0245164-2ca8-4d12-a60c-eff210767b53.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=64&h=64&fit=crop&frame=1&dpr=1"
        },
        "topics": {
          "edges": [
            {
              "node": {
                "id": "267",
                "name": "Developer Tools",
                "slug": "developer-tools",
                "followersCount": 496539
              }
            },
            {
              "node": {
                "id": "268",
                "name": "Artificial Intelligence",
                "slug": "artificial-intelligence",
                "followersCount": 444637
              }
            }
          ]
        }
      },
      {
        "id": "866753",
        "name": "One Shot LoRA",
        "tagline": "Video to LoRA made easy - High-quality consistent AI models",
        "description": "Transform videos into customized AI models effortlessly. One Shot LoRA simplifies the process of creating high-quality, consistent AI models from video content.",
        "url": "https://www.producthunt.com/posts/one-shot-lora?utm_campaign=producthunt-api&utm_medium=api-v2&utm_source=Application%3A+test++%28ID%3A+169128%29",
        "votesCount": 156,
        "commentsCount": 23,
        "reviewsCount": 0,
        "reviewsRating": 0,
        "thumbnail": {
          "url": "https://ph-files.imgix.net/cf96d13a-6024-4e6c-ab33-a27d265f41c0.png?auto=compress&codec=mozjpeg&cs=strip&auto=format&w=64&h=64&fit=crop&frame=1&dpr=1"
        },
        "topics": {
          "edges": [
            {
              "node": {
                "id": "268",
                "name": "Artificial Intelligence",
                "slug": "artificial-intelligence",
                "followersCount": 444637
              }
            },
            {
              "node": {
                "id": "269",
                "name": "Video Tools",
                "slug": "video-tools",
                "followersCount": 124537
              }
            }
          ]
        }
      }
    ]
  };
  
data = outputdata

const YCdata = [
    {
      "name": "Infinite",
      "location": "San Francisco, CA, USA",
      "description": "Fast, affordable global B2B payments",
      "batch": "W25",
      "industries": [
        "Fintech",
        "Payments"
      ],
      "url": "https://www.ycombinator.com/companies/infinite",
      "scrapedAt": "2025-02-18T15:32:11.587Z",
      "details": {
        "founded": "2024",
        "team_size": "3",
        "status": "Active",
        "location": "San Francisco",
        "main_logo": "https://bookface-images.s3.amazonaws.com/small_logos/eb918a1c2da0e7143351dc449810630e78b19bed.png",
        "small_logo": "https://bookface-images.s3.us-west-2.amazonaws.com/logos/06fe642a19b453ea3710d2e7202684aaf56d85f8.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQC4NIECAGSJYRTSF%2F20250218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250218T153211Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDMgsb%2Fg9FbPrfet2kO%2BxTuNNrPIn%2Fbq6sVuHluge8uNgIgGdOw6SWXxoInnUQqO3y6DWX%2FTwtTJ7TaDOQqwbUIQsoq7gMIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwMDYyMDE4MTEwNzIiDCuX%2B0Xbl%2FWp2p4IpCrCA%2BLckbV82qcrAsUhOfhjdgfCf0CCqmpjXMHgySq%2BH%2FbYl%2FkxoXuyG%2B7OHFFrYVncOexp4X3J2EB%2FzsUdF5I2AGbKSdCnGP8JWt%2B454Q9NjG8HCaKo95Xsk44jl%2FPNIxl5WD4wKFu7XVkVmpdLKMO4YtZCRUDN%2BpmrKjB%2FfBB%2FpjiBPmpuaI9O7Rzv0UpmcsUvgIHVG0XWB3QvkTXGSQ2vrBASkUoASXjjuT0wd4xC%2F%2BCEYG2xIqpZaAHhvOvpzfaixCWs%2FeGd9qgBuHX5iOFczEIry7BIBBnEl7ZLOOtuNapNFl94wYsL7UmTYJDOb%2Bp0TMwZAEWZgknVT68J6dosP2vlqvcg0B5GQaIqsYc0GTTbAHQsKChHanrnkk%2FCzCtPE5Ktc%2BB4RCmlhwbvNtE3vuHd61TKVO3kbh7HaMFMyYa%2FPgyK4pE9b9l%2Bzc%2F3lkMWmHpJPJlE4yUOp8J20YMkdHJfer4kQ6LSsTdKyPHaPsFU2qFXDtJj9FEpNC%2BFY0DbvMSogI77kEIjFVk8Gak8i%2BPQ3x0IlqDKYjJye0FT8%2FK9of%2BHxcyzoX5a4NusjL10WgdVAJTrcOimU9hhzJqK8crkjC919G9BjqlAWOKMWWfO1i1Didq3JL4EG26qgztzcRiDpNqwUCsBvSl9XnEbzaV18kQnYLp%2FZpjnz6iR%2F8EyTJtNrr4jXXRFJyGNBrFySEn6UborApdJuAczYZmLq9ZXu76okVobQLSbq9c1ykm5GBsFmMgmIyGi%2FMkFILKjfsYJq%2BFcJ9VPZrhu5UZ%2Fh8h0wBfOkC%2BpxY49ylwynsge2HsOocni2cvvHfeP4vwlA%3D%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=011117c3fadc03a56e9b1317a218edd534853678857ebcc2b0070e6e0dba22ee",
        "links": {
          "website": "https://infinite.dev/",
          "linkedin": "https://linkedin.com/company/infiniteinc",
          "twitter": "https://twitter.com/nvs",
          "github": "https://github.com/infiniteagents"
        },
        "description": "Infinite is a stablecoin payment processor. We offer businesses turnkey APIs and SDKs to move money cross-border same-day with low fees, all without crypto complexity.",
        "tags": [
          "payments",
          "b2b"
        ],
        "founders": [
          {
            "name": "Raj Lad",
            "title": "Founder",
            "bio": "Cofounder and CTO at Infinite. Previously payments tech lead at Sardine where I launched the global stablecoin payments and credit risk workflow products.",
            "linkedin_url": "https://www.linkedin.com/in/rajlad/",
            "twitter_url": null
          },
          {
            "name": "Nikhil Srinivasan, Cofounder & CEO",
            "title": "Founder",
            "bio": "Cofounder and CEO of Infinite with Raj Lad. Previously platform product lead at Sardine and Coinbase (S12) via Distributed Systems (F1).",
            "linkedin_url": "https://linkedin.com/in/nikhilsrinivasan",
            "twitter_url": "https://twitter.com/nvs"
          }
        ]
      }
    },
    {
      "name": "Closure",
      "location": "New York, NY, USA",
      "description": "We help law enforcement solve crime",
      "batch": "W25",
      "industries": [
        "Government"
      ],
      "url": "https://www.ycombinator.com/companies/closure",
      "scrapedAt": "2025-02-18T15:32:11.587Z",
      "details": {
        "founded": "2024",
        "team_size": "4",
        "status": "Active",
        "location": "New York",
        "main_logo": "https://bookface-images.s3.amazonaws.com/small_logos/c5b9a8ffa191d64a12f160ab46ed4cf4f2dd85dc.png",
        "small_logo": "https://bookface-images.s3.us-west-2.amazonaws.com/logos/fc01a2ba3ba66c6e25056ecebe0d978226b103f1.png?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Credential=ASIAQC4NIECAGSJYRTSF%2F20250218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20250218T153214Z&X-Amz-Expires=3600&X-Amz-Security-Token=IQoJb3JpZ2luX2VjEGMaCXVzLXdlc3QtMiJHMEUCIQDMgsb%2Fg9FbPrfet2kO%2BxTuNNrPIn%2Fbq6sVuHluge8uNgIgGdOw6SWXxoInnUQqO3y6DWX%2FTwtTJ7TaDOQqwbUIQsoq7gMIjP%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FARAAGgwwMDYyMDE4MTEwNzIiDCuX%2B0Xbl%2FWp2p4IpCrCA%2BLckbV82qcrAsUhOfhjdgfCf0CCqmpjXMHgySq%2BH%2FbYl%2FkxoXuyG%2B7OHFFrYVncOexp4X3J2EB%2FzsUdF5I2AGbKSdCnGP8JWt%2B454Q9NjG8HCaKo95Xsk44jl%2FPNIxl5WD4wKFu7XVkVmpdLKMO4YtZCRUDN%2BpmrKjB%2FfBB%2FpjiBPmpuaI9O7Rzv0UpmcsUvgIHVG0XWB3QvkTXGSQ2vrBASkUoASXjjuT0wd4xC%2F%2BCEYG2xIqpZaAHhvOvpzfaixCWs%2FeGd9qgBuHX5iOFczEIry7BIBBnEl7ZLOOtuNapNFl94wYsL7UmTYJDOb%2Bp0TMwZAEWZgknVT68J6dosP2vlqvcg0B5GQaIqsYc0GTTbAHQsKChHanrnkk%2FCzCtPE5Ktc%2BB4RCmlhwbvNtE3vuHd61TKVO3kbh7HaMFMyYa%2FPgyK4pE9b9l%2Bzc%2F3lkMWmHpJPJlE4yUOp8J20YMkdHJfer4kQ6LSsTdKyPHaPsFU2qFXDtJj9FEpNC%2BFY0DbvMSogI77kEIjFVk8Gak8i%2BPQ3x0IlqDKYjJye0FT8%2FK9of%2BHxcyzoX5a4NusjL10WgdVAJTrcOimU9hhzJqK8crkjC919G9BjqlAWOKMWWfO1i1Didq3JL4EG26qgztzcRiDpNqwUCsBvSl9XnEbzaV18kQnYLp%2FZpjnz6iR%2F8EyTJtNrr4jXXRFJyGNBrFySEn6UborApdJuAczYZmLq9ZXu76okVobQLSbq9c1ykm5GBsFmMgmIyGi%2FMkFILKjfsYJq%2BFcJ9VPZrhu5UZ%2Fh8h0wBfOkC%2BpxY49ylwynsge2HsOocni2cvvHfeP4vwlA%3D%3D&X-Amz-SignedHeaders=host&X-Amz-Signature=994aed222174400be632d444b213a9898852c5d13cb17dc7185118deaa945f1c",
        "links": {
          "website": "https://closure-intel.com/",
          "linkedin": "https://www.linkedin.com/company/closure-intel",
          "twitter": "https://twitter.com/ycombinator",
          "github": null
        },
        "description": "Law enforcement is drowning in data. Closure helps search it to solve crime. \r\n\n- Hiring: UX, Engineering; \r\n- Expanding: Local, state, and federal law enforcement.",
        "tags": [
          "govtech",
          "ai"
        ],
        "founders": [
          {
            "name": "Gilad Levy, Co-Founder and CTO",
            "title": "Founder",
            "bio": "Building the platform for closing cases faster.\nAn engineer with 12 years of experience building data systems. I served as a combat helicopter pilot in the Israeli Air Force and as a Cyber Security Engineer. Subsequently, I worked at Spot.io (acquired by NetApp), Microsoft, and Rivery (acquired by Boomi).\nI hold a Master's degree in Computer Science from Reichman University and an MBA from Tel Aviv University.",
            "linkedin_url": "https://www.linkedin.com/in/gilad-levy/",
            "twitter_url": null
          },
          {
            "name": "Aaron Zelinger, Co-Founder",
            "title": "Founder",
            "bio": "Helping law enforcement solve crime @Closure with @GiladLevy. \n\nTakes helping government seriously; takes himself not so seriously.\n\nPreviously: 2 yrs @Arena, 6 yrs @Palantir (#savetheshire)",
            "linkedin_url": "https://www.linkedin.com/in/aaron-zelinger/",
            "twitter_url": null
          }
        ]
      }
    }
  ]


  const cbdata = {
    "total": 421,
    "results": [

      {
        "uuid": "354f542d-fbd6-4aaf-8868-ace325fa5516",
        "identifier": {
          "uuid": "354f542d-fbd6-4aaf-8868-ace325fa5516",
          "value": "Seed Round - Zuriq",
          "image_id": "buwijdsn9a28phfppg79",
          "permalink": "zuriq-seed--354f542d",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-23",
        "money_raised": {
          "value": 4000000,
          "currency": "EUR",
          "value_usd": 4164385
        },
  
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "9438fa24-1320-40a7-ac63-979ae41600a5",
            "value": "First Momentum Ventures",
            "image_id": "6b091e1b6d484a39a48242757db2379a",
            "permalink": "first-momentum-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "c1bf457d-08a2-4e0d-a99f-33e2edb3897a",
            "value": "Founderful",
            "image_id": "jvctqymaa9mqi1znfigb",
            "permalink": "wingman-897a",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "c7f65f86-8af0-4faf-8e54-95571cc25a39",
            "value": "Onsight Ventures",
            "image_id": "zfn93rnefywjq75v5j5n",
            "permalink": "onsight-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "4b87b74c-f896-4d97-a53c-c8baedb642bc",
            "value": "QAI Ventures",
            "image_id": "r57uoytoqwmizo9amcud",
            "permalink": "qai-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "fef9b481-08ab-7b92-1791-0f142631c163",
            "value": "SquareOne Venture Capital",
            "image_id": "v6llipxxellqubk5kquk",
            "permalink": "squarone-vc",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "465d9590-3e5f-44a4-b016-e98a3f562de3",
          "value": "Zuriq",
          "image_id": "buwijdsn9a28phfppg79",
          "permalink": "zuriq",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "d892f457-86ac-46ff-a10a-a45dabef3118",
        "identifier": {
          "uuid": "d892f457-86ac-46ff-a10a-a45dabef3118",
          "value": "Seed Round - 1Money Network Technologies",
          "image_id": "eeaa25a389b74380867125fc5b56df46",
          "permalink": "1money-network-technologies-seed--d892f457",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-15",
        "money_raised": {
          "value": 20000000,
          "currency": "USD",
          "value_usd": 20000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "bcf2a632-affb-41cd-b136-dcbf456624dc",
            "value": "A100x Ventures",
            "image_id": "jq3apzcj2isqdyuulgj9",
            "permalink": "a100x",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "9b4513a5-8e32-45d0-8af9-bd5f1301e35a",
            "value": "Ambush Capital",
            "image_id": "mfsycmzwzkijonijegzt",
            "permalink": "ambush-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "ece32d9e-2a20-421f-8e30-e3d9b2ba43bc",
            "value": "Anagram",
            "image_id": "blex6xtn9m1ywldlkfez",
            "permalink": "anagram-43bc",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "921aaba4-e458-4ef2-aca3-a3f248c1dab5",
            "value": "Bankless Ventures",
            "image_id": "ovbbcw51ddie0wagitaw",
            "permalink": "bankless-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "c7f867bf-3934-40a9-aaad-491d2f60b3ac",
            "value": "Bing Ventures",
            "image_id": "owmjzdzy5a5rkjvmheqc",
            "permalink": "bing-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "16e918b8-2835-4440-b7b1-76933f11a299",
            "value": "BitGo Ventures",
            "image_id": "6209ce16473948f280327e54c6e0864a",
            "permalink": "bitgo-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "236281db-e754-4967-bb1d-1d47e7f9a424",
            "value": "Borderless Capital",
            "image_id": "s2up3crmmkcr9357g0uk",
            "permalink": "borderless-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "07ffde2d-5cbc-450d-a138-a0e195ca4939",
            "value": "CMT Digital",
            "image_id": "u2xskxnlszei2mg8krmv",
            "permalink": "cmt-digital-ventures-llc",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "c8d65538-70ab-45a4-bcb7-74d6f114458e",
            "value": "Coinflip canada",
            "permalink": "coinflip-canada",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "b823fd58-6a7f-47a8-a440-4f0a8112deb2",
            "value": "Ethereal Ventures",
            "image_id": "xjbefnblm29packywult",
            "permalink": "ethereal-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a80524bc-d772-2f8b-f3d6-d564cd06a286",
            "value": "F-Prime Capital",
            "image_id": "fzkvcdslbatqgifgk1cf",
            "permalink": "f-prime-capital-partners",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a9621317-1827-729c-c159-1b81808050a2",
            "value": "Galaxy Ventures",
            "image_id": "v1397178742/dcb32e7a2038e50ff91ba96d11d06ba8.png",
            "permalink": "galaxy-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "9366abd6-cb47-43a5-95f8-649a37f36681",
            "value": "Generative Ventures",
            "image_id": "duwwgcjwf9nscevaxiwa",
            "permalink": "generative-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "96efd3b5-6e76-42b7-9475-efbb97bb0db0",
            "value": "gumi Cryptos Capital (gCC)",
            "image_id": "a25bcgemqv684h5knti3",
            "permalink": "gumi-cryptos",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "9183d3fb-c801-bc11-1594-04850e47cf60",
            "value": "Hack VC",
            "image_id": "v1498608716/ljyjt4pmb0pimbtefpl4.png",
            "permalink": "hack-vc",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "43e4d15e-74a8-4b4f-9b02-e2be69e7cee4",
            "value": "Karman Ventures",
            "image_id": "fkv4gpkbrk3bucyqgki3",
            "permalink": "karman-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "d9335974-6844-4994-831d-43856b1018e9",
            "value": "Kraken Ventures",
            "image_id": "mrmkavoh40faji1owdtb",
            "permalink": "kraken-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "ae172858-f8ad-479c-ba99-44a23586cd11",
            "value": "KuCoin Ventures",
            "image_id": "lngj9azq2ygji9p6xkwx",
            "permalink": "kucoin-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "8f3de3d8-9a7e-4fe1-84d9-7df89c12cf89",
            "value": "Lvna Capital",
            "image_id": "b2e2kpvwqgkcbd9lpehh",
            "permalink": "lvna-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "3047963c-d0cf-4530-84d5-71a43ee7b0ae",
            "value": "MoonPay",
            "image_id": "jglje7ar0xc6j5lvai6t",
            "permalink": "moonpay",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "08bc78e5-b94c-4b8d-9771-c519cf485a69",
            "value": "Perry Creek Capital",
            "image_id": "vpq4g6pwebh9s3juns2g",
            "permalink": "perry-creek-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "b3fe3c55-4d7e-478e-b454-cfa6c359ea36",
            "value": "Pharsalus Capital",
            "image_id": "7d9fed16b6414519a23e7799248ef037",
            "permalink": "pharsalus-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "0b105988-5b46-9260-40a8-e9b8bc42db35",
            "value": "Portage Ventures",
            "image_id": "jey8o9acaqfybererhbr",
            "permalink": "portag3-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f8527641-abd1-4253-828e-e0d659b627b9",
            "value": "Protagonist",
            "image_id": "vu5unf8q9rum77s205uo",
            "permalink": "protagonist-27b9",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "7d0c774b-c784-4613-b9b9-9955d641818a",
            "value": "R3D3 Ventures",
            "image_id": "a858cea7982b473f9f271a2d61141ce8",
            "permalink": "r3d3-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a897be7c-d062-4a01-979a-b53b651bb4a7",
            "value": "T-Rex Capital",
            "image_id": "8ccaa50bff5e47d49f497537b00e8371",
            "permalink": "t-rex-capital-b4a7",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f065b291-ae61-41db-9475-3713a3da36d4",
            "value": "Tribe Capital",
            "image_id": "ugxxfumlaeca0mickiuh",
            "permalink": "tribe-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "634e1028-2cc1-470b-8034-deab86332f03",
            "value": "VARIV",
            "image_id": "gxqcot5lyr4qhqcfqt5e",
            "permalink": "variv",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "2fcf5ac2-f2df-4fca-a662-cc93a3cb99a4",
          "value": "1Money Network Technologies",
          "image_id": "eeaa25a389b74380867125fc5b56df46",
          "permalink": "1money-network-technologies",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "1da9670e-b8e6-40dd-b4fd-c9821d352bf2",
        "identifier": {
          "uuid": "1da9670e-b8e6-40dd-b4fd-c9821d352bf2",
          "value": "Seed Round - Orchid Security",
          "image_id": "7af2b4d49d6b4536b752ad6a35f84c7d",
          "permalink": "orchid-security-seed--1da9670e",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-14",
        "money_raised": {
          "value": 36000000,
          "currency": "USD",
          "value_usd": 36000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "6f1a3325-7525-1699-d0f5-a45cb4ba4b42",
            "value": "Capital One",
            "image_id": "v1445634535/xtvpuqbr9r1sc1x9wbas.jpg",
            "permalink": "capital-one",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "b2bbf559-9310-ad20-1eb9-87a9640f370f",
            "value": "Dror Davidoff",
            "image_id": "v1397188869/c71475a775f58491dbc1259af8864a09.jpg",
            "permalink": "david-dror-davidoff",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "f3716725-552d-b9b5-59ad-de4ec64b1751",
            "value": "Intel Capital",
            "image_id": "jxwdopx92vnwayv437lk",
            "permalink": "intel-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "eb70b5ac-bb39-f395-0588-6ca24fc0c641",
            "value": "Jeffrey C. Williams",
            "image_id": "xjt7i19hfxzbbw6fxovi",
            "permalink": "jeffrey-c-williams",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "192acc26-46d6-5961-2a18-2ec462242091",
            "value": "Team8",
            "image_id": "jgzvsw4o9vpv30kqv7yg",
            "permalink": "team8",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "45528860-133f-6b3b-fd20-509e6332af53",
            "value": "Zohar Alon",
            "image_id": "w6zw630rrrecbdujf0rh",
            "permalink": "zohar-alon",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "c30974a9-c90e-4f41-a655-49e0d9983ecc",
          "value": "Orchid Security",
          "image_id": "7af2b4d49d6b4536b752ad6a35f84c7d",
          "permalink": "orchid-security",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "7fca0798-3cc2-494f-abcd-8e5452285a08",
        "identifier": {
          "uuid": "7fca0798-3cc2-494f-abcd-8e5452285a08",
          "value": "Seed Round - BPR Hub",
          "image_id": "1ba043cb3d4543d59b572bbd3b6b84ec",
          "permalink": "bpr-hub-seed--7fca0798",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-20",
        "money_raised": {
          "value": 2600000,
          "currency": "USD",
          "value_usd": 2600000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "b08efc27-da40-505a-6f9d-c9e14247bf36",
            "value": "Accel",
            "image_id": "kxcwecxf439wsgluv7jv",
            "permalink": "accel",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "0645a432-c9d3-5373-e90f-6d446b038640",
            "value": "Kae Capital",
            "image_id": "v1397179575/99d604fb0f9f5c958bab324b1d41966a.jpg",
            "permalink": "kae-capital",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "d014fe3d-3c0b-4c20-9812-ee4b59f275a4",
          "value": "BPR Hub",
          "image_id": "1ba043cb3d4543d59b572bbd3b6b84ec",
          "permalink": "bpr-hub",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "956a9109-1b8a-4307-bb46-1d2c7166a518",
        "identifier": {
          "uuid": "956a9109-1b8a-4307-bb46-1d2c7166a518",
          "value": "Seed Round - Brickken",
          "image_id": "phw7kjtdetnxzzitny6p",
          "permalink": "brickken-seed--956a9109",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-15",
        "money_raised": {
          "value": 2500000,
          "currency": "USD",
          "value_usd": 2500000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "79e07fe4-2cdc-4564-9bb7-96c51a1c5e64",
            "value": "Blue Bay Ventures",
            "image_id": "ezhtxlkamj2fmlyq4fwb",
            "permalink": "blue-bay-ventures-5e64",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "0ea06118-5451-4b27-943c-2f5707c2d76b",
            "value": "Ergodic Capital",
            "image_id": "w72igxd5vl2qtwrop5ma",
            "permalink": "ergodic-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "5243a710-b74c-4e0d-9e8f-34b86717b914",
            "value": "Hodl",
            "image_id": "f9lv99jwt6psg0ignefk",
            "permalink": "hodl-b914",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "8efa6039-d0b3-4d38-97b1-ad9319491b7b",
            "value": "Mocha Ventures",
            "image_id": "rbd7xzpxmmptzf1abxmj",
            "permalink": "mocha-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "8ab8a7ec-c073-4fdf-9b56-007031e1cdbc",
            "value": "Psalion VC",
            "image_id": "jwfao0tov7hxaqnjd1al",
            "permalink": "psalion-vc",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "5b992092-2bb0-4073-abbd-d13d5f5e5030",
            "value": "SNZ Holding",
            "image_id": "um4fp64etczn36eqi4wv",
            "permalink": "snz-holding",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "f838919f-3c81-47bb-96aa-546a9e283abc",
          "value": "Brickken",
          "image_id": "phw7kjtdetnxzzitny6p",
          "permalink": "brickken",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "019597f3-01ba-4385-b9da-a4d6e65f9774",
        "identifier": {
          "uuid": "019597f3-01ba-4385-b9da-a4d6e65f9774",
          "value": "Seed Round - ProcureYard",
          "image_id": "0a9f9c151282406fbb0afb2eaaa9e2d4",
          "permalink": "procureyard-seed--019597f3",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-20",
        "money_raised": {
          "value": 1720000,
          "currency": "USD",
          "value_usd": 1720000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "6260839b-b664-48bf-8ef2-1bb64c37a7b3",
            "value": "2am VC",
            "image_id": "vsreybor3gl1mgrrgr4q",
            "permalink": "2-am-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "d94e85cf-4208-45a1-a94a-635e6b32378d",
            "value": "Abhishek Goyal",
            "image_id": "e4n8mzhhxxvddje2tlgs",
            "permalink": "abhishek-goyal-378d",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "9eada08d-9297-4c32-9603-6d8d2bb11456",
            "value": "Java Capital",
            "image_id": "qvk9yq7owlyiom1g9u9f",
            "permalink": "java-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f4bc9863-c3a2-7865-ba2b-49e6298615ee",
            "value": "Powerhouse Ventures",
            "image_id": "fthmetgrsxippfdiuz8s",
            "permalink": "powerhouse-ventures-2",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "295c173d-9ad3-e683-4b23-9d800b5d0fc9",
            "value": "Rajesh Sawhney",
            "image_id": "xxxgtwebqdrmhtbmkopd",
            "permalink": "rajesh-sawhney",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "53874e1e-c5cb-4db1-859f-d630a5bb71d2",
          "value": "ProcureYard",
          "image_id": "0a9f9c151282406fbb0afb2eaaa9e2d4",
          "permalink": "procureyard",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "75d7b7be-a2aa-461f-a1d0-cf1a9b193d10",
        "identifier": {
          "uuid": "75d7b7be-a2aa-461f-a1d0-cf1a9b193d10",
          "value": "Seed Round - Genesy AI",
          "image_id": "40143c28b48c4ea7ae14566eac1c846b",
          "permalink": "genesy-ai-seed--75d7b7be",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-14",
        "money_raised": {
          "value": 5000000,
          "currency": "EUR",
          "value_usd": 5153800
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "5e089f89-8fef-7669-4322-471e7b24b6d2",
            "value": "Itnig",
            "image_id": "uyj6azkyusn9mf36zku5",
            "permalink": "itnig",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f05dab89-e313-a83c-9dba-0d104b24a696",
            "value": "K Fund",
            "image_id": "vsufzviqub5oii1otbtj",
            "permalink": "kfund",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "4878e94f-9c24-87be-9778-d44a191d093e",
            "value": "Samaipata",
            "image_id": "rh4cnfatihopz9nauwtn",
            "permalink": "samaipata-ventures",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "7b652262-c344-4dd6-a2c0-e582bfba8211",
          "value": "Genesy AI",
          "image_id": "40143c28b48c4ea7ae14566eac1c846b",
          "permalink": "genesy-ai",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "80832b89-96bc-43ec-947f-03385990dacf",
        "identifier": {
          "uuid": "80832b89-96bc-43ec-947f-03385990dacf",
          "value": "Seed Round - Merit Systems",
          "image_id": "df48d3b4a7bd497a8af05c527a316ba0",
          "permalink": "merit-systems-6320-seed--80832b89",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-16",
        "money_raised": {
          "value": 10000000,
          "currency": "USD",
          "value_usd": 10000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "063bf170-ddb2-4041-8068-409fab18d502",
            "value": "a16z crypto",
            "image_id": "tupgsoxii6rudzqzp7sp",
            "permalink": "a16z-crypto",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "b0f292d5-08c6-4450-91f8-df49624db155",
            "value": "Alan Curtis",
            "image_id": "fpvrevo00zl2wapqwvho",
            "permalink": "alan-curtis-b155",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "e0921e09-02a0-4cf5-b6ee-e260570a6807",
            "value": "Alex Dees",
            "permalink": "alex-dees-6807",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "8190f386-f785-4fe0-ac62-4cab98d78b18",
            "value": "Anatoly Yakovenko",
            "permalink": "toly-toly",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "874a1e98-754f-454a-afc3-a7c92d3307fa",
            "value": "Block Daddy",
            "permalink": "block-daddy",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "467c04e8-580c-cefa-8d51-f2eb42ab0844",
            "value": "Blockchain Capital",
            "image_id": "okvkgpuerigjjkk2fjxu",
            "permalink": "crypto-currency-partners",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f634108a-c7fd-4242-88ae-c977179c23b6",
            "value": "camiinthis thang",
            "permalink": "camiinthis-thang",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "72ad6187-d24a-19a7-9ed0-30b7c768473f",
            "value": "Chad Byers",
            "image_id": "ccgpq54dvsjnjhtuwluw",
            "permalink": "chad-byers",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "7e8d76a6-4563-b4c7-0b67-3dab1572a19e",
            "value": "Dan Romero",
            "image_id": "naoe9lmxwr14jzatz3vt",
            "permalink": "dan-romero",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "c19095e5-1bb4-436f-a705-ad918c55d7ba",
            "value": "daniel museles",
            "permalink": "daniel-museles-d7ba",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "979e5559-c706-49fb-becc-583da84c6687",
            "value": "lil perp",
            "permalink": "lil-perp",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "747bfb63-0681-45fd-971e-253b5b44546a",
            "value": "Matan Grinberg",
            "image_id": "btxsdnqxgsmru2xssaoh",
            "permalink": "matan-grinberg",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "e2e5a69b-b8ac-2c6a-8c50-c44e712a24fa",
            "value": "Michael Anderson",
            "image_id": "v1427401870/ejax0rxpugioazdloaxn.jpg",
            "permalink": "michael-anderson-4",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "1059c1a4-78bd-e4ab-e16d-3a3b4483783a",
            "value": "Packy McCormick",
            "image_id": "v1458592125/uestwxpvr772ez6ksi2g.jpg",
            "permalink": "packy-mccormick",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "3caa303c-6f78-46db-aa3f-0d2d0a66fbbc",
            "value": "Ricky Moezinia",
            "permalink": "ricky-moezinia",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "a7c7d6b7-c7d5-4535-a3d6-4558bacd35ff",
            "value": "Vance Spencer",
            "image_id": "gec5pjgtiu6nlnzcl9nd",
            "permalink": "vance-spencer",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "98d16aa8-01a6-4152-bd4b-4be469586320",
          "value": "Merit Systems",
          "image_id": "df48d3b4a7bd497a8af05c527a316ba0",
          "permalink": "merit-systems-6320",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "4c9542d8-c15f-434b-9c90-d01de9564791",
        "identifier": {
          "uuid": "4c9542d8-c15f-434b-9c90-d01de9564791",
          "value": "Seed Round - Doti AI",
          "image_id": "54e4ec0572c647d3804a5054ac625241",
          "permalink": "doti-ai-seed--4c9542d8",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-22",
        "money_raised": {
          "value": 7000000,
          "currency": "USD",
          "value_usd": 7000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "b4bda9bf-62cd-9569-43f5-6f179850b735",
            "value": "F2 Venture Capital",
            "image_id": "d6f4nepodqvl0anrpo37",
            "permalink": "f2-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "372a2d1d-563b-4a26-809e-b94ca3f8125e",
            "value": "Guy Flechter",
            "image_id": "7ce5fca900bd46288c5c336bbefbe3c6",
            "permalink": "guy-flechter",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "f48f4a16-1c08-474e-ba85-b31d7a158183",
            "value": "Jared Kasner",
            "image_id": "55563a9884fc46fa97cca705374aabb5",
            "permalink": "jared-kasner-8183",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "3f9af825-66f9-46ad-9f2a-c3e31849a5d4",
          "value": "Doti AI",
          "image_id": "54e4ec0572c647d3804a5054ac625241",
          "permalink": "doti-ai",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "94411e03-01f9-45ff-931c-f7013a4b940d",
        "identifier": {
          "uuid": "94411e03-01f9-45ff-931c-f7013a4b940d",
          "value": "Seed Round - MoneyHash",
          "image_id": "ieulfg5oibmmmjru8xsr",
          "permalink": "moneyhash-seed--94411e03",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-20",
        "money_raised": {
          "value": 5200000,
          "currency": "USD",
          "value_usd": 5200000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "e406fcdc-c4f4-4353-b617-a814dd256e5a",
            "value": "AB Xelerate",
            "image_id": "46df6bd2cc7d423c9bb59874f828ea15",
            "permalink": "ab-accelerator",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "630805b4-b724-4478-b29e-5f559fe9c446",
            "value": "COTU Ventures",
            "image_id": "xikabsmd7n07tendxgkr",
            "permalink": "cotu-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "ff19354e-4105-473f-85b9-d7043be6408b",
            "value": "EMURGO Kepple Ventures",
            "image_id": "4a5fefff6b1b4c75a81105a329f1bd72",
            "permalink": "emurgo-kepple-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "cff30e78-1a5b-402a-9bda-b3a76ef952df",
            "value": "Flourish Ventures",
            "image_id": "fa84nwarvabb2x23xyzm",
            "permalink": "flourish-venture",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "9dfe87bc-42c8-eede-92e1-c83462591887",
            "value": "Jason Gardner",
            "image_id": "q2ymphcik7gdwfdxscwx",
            "permalink": "jason-gardner-2",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "f1225c29-9793-4906-b888-81b07a74bd74",
            "value": "RZM Investments",
            "image_id": "lvug9r1kganoqkbriqry",
            "permalink": "rzm-investments",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "e37bfcba-7c04-1eb2-9abf-404725cf9fc9",
            "value": "Tom Preston-Werner",
            "image_id": "v1495339877/bemeiyxa1t3ukovn4flm.png",
            "permalink": "tom-preston-werner",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "ad1bb557-4b32-ff0b-a846-b551485ca414",
            "value": "Vision Ventures",
            "image_id": "kau9dnhmygu5i2xpr9yo",
            "permalink": "vision-ventures-2",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "3cfe45b4-4d4d-4982-a665-1d5b9acabf05",
          "value": "MoneyHash",
          "image_id": "ieulfg5oibmmmjru8xsr",
          "permalink": "moneyhash",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "b5844bea-5281-451d-ad6f-35fcbab95fe3",
        "identifier": {
          "uuid": "b5844bea-5281-451d-ad6f-35fcbab95fe3",
          "value": "Seed Round - Prantae Solutions",
          "image_id": "v6fcd91ma0qexj9vc6ba",
          "permalink": "prantae-solutions-seed--b5844bea",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-20",
        "money_raised": {
          "value": 50000000,
          "currency": "INR",
          "value_usd": 579842
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "c3355f23-ec6c-4f51-bc28-9f506109e1cc",
            "value": "Deepank Kumar, CFA",
            "image_id": "b409451c59d94447ac5e0425b867c195",
            "permalink": "deepank-kumar-cfa",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "87122bae-6631-4a29-afd7-5a423e9aba3d",
            "value": "IAN Fund",
            "image_id": "ehjbjsbudu25t5mjl6qa",
            "permalink": "ian-fund-ba3d",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "aad7932d-12ea-95a4-b184-3202cf55ef69",
            "value": "IAN Group",
            "image_id": "v1397178728/f620b89bb7fec2dc7958d7d8dce4df62.jpg",
            "permalink": "indian-angel-network",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "7577f3e1-ec04-48ab-bc45-7c4bda154a78",
            "value": "Nitin Zamre",
            "permalink": "nitin-zamre",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "dee6e55a-4eef-a781-9f29-829d025a4de2",
            "value": "Samir Kalia",
            "image_id": "v1404477944/eewohtyrbey65dol6thz.jpg",
            "permalink": "samir-kalia",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "22ed1359-72a8-4501-b7b7-784e4c32baa3",
          "value": "Prantae Solutions",
          "image_id": "v6fcd91ma0qexj9vc6ba",
          "permalink": "prantae-solutions",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "53de712f-dbf7-4337-844c-98b929912f3a",
        "identifier": {
          "uuid": "53de712f-dbf7-4337-844c-98b929912f3a",
          "value": "Seed Round - Nevermined",
          "image_id": "sscvnvef5n09trxinbfa",
          "permalink": "nevermined-seed--53de712f",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-09",
        "money_raised": {
          "value": 4000000,
          "currency": "USD",
          "value_usd": 4000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "566d5a33-1fa4-4768-9ec1-ed6eff2b5fb9",
            "value": "Arca",
            "image_id": "bxg9icepqac7cg9l6x3i",
            "permalink": "arca-5fb9",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "f0c15b89-30a0-4582-aba5-27ffe3244104",
            "value": "Ben Fielding",
            "image_id": "dhe8uhy4owb08ajzbbma",
            "permalink": "ben-fielding",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "e1e64a70-dd39-44c1-b156-3a38de4a301c",
            "value": "David Minarsch",
            "image_id": "jgqzkt9q2pkjymlescpt",
            "permalink": "david-minarsch",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "c8cf6d34-e638-4bac-b390-5ea2d94bd64e",
            "value": "Factor Capital",
            "image_id": "tqbaytc8nkwc2mjhbis8",
            "permalink": "factor-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "9366abd6-cb47-43a5-95f8-649a37f36681",
            "value": "Generative Ventures",
            "image_id": "duwwgcjwf9nscevaxiwa",
            "permalink": "generative-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "ef9d1b55-193c-4260-835c-2354f9da436e",
            "value": "Halo Capital",
            "image_id": "17dea770110e401ca75b089a1da096e2",
            "permalink": "halo-capital-436e",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "92ca7f9f-28f0-49f6-b689-db35e0e4695e",
            "value": "Lyrik Ventures",
            "image_id": "wuoxxpa4cuwq36lu6h8l",
            "permalink": "lyrik-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a88cd47b-ac5d-ef95-bc42-3367483c8747",
            "value": "Mark Schmidt",
            "image_id": "po12bkyyaprego4xjny0",
            "permalink": "mark-schmidt-4",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "79a01b8e-ddc2-4647-9cf3-63b81a82f896",
            "value": "NEAR",
            "image_id": "cqyiy5mj0msvkppktrbi",
            "permalink": "near-f896",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "b5da37e8-78c9-4bf4-aea9-173c17b6b564",
            "value": "Oak sprout",
            "permalink": "oak-sprout",
            "entity_def_id": "person"
          },
          {
            "role": "investor",
            "uuid": "10d3449b-d48b-4ea9-b1cc-7f3e82e683ee",
            "value": "Polymorphic Capital",
            "image_id": "fwcp3jep0hoftajres16",
            "permalink": "polymorphic-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "09bd4401-89fc-4d42-ad1e-bdf307bdb0ba",
            "value": "Richard Blythman",
            "image_id": "418518abc4de44398daef1aad4835fc9",
            "permalink": "richard-blythman",
            "entity_def_id": "person"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "457c1ab3-8fae-4edb-a7f5-5093b76e9f56",
          "value": "Nevermined",
          "image_id": "sscvnvef5n09trxinbfa",
          "permalink": "nevermined",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "2bc3b7c7-7a41-4942-bfe1-521f33c5ff0a",
        "identifier": {
          "uuid": "2bc3b7c7-7a41-4942-bfe1-521f33c5ff0a",
          "value": "Seed Round - Hyperline",
          "image_id": "sqjaucv6xlfdgsc53xwt",
          "permalink": "hyperline-seed--2bc3b7c7",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-16",
        "money_raised": {
          "value": 9400000,
          "currency": "EUR",
          "value_usd": 9682935
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "c8ad1e24-5a2b-4a0c-9473-74513df6f656",
            "value": "Adelie Capital.",
            "permalink": "adelie-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "60b5dade-24ed-84b0-99e2-1ecda554a1ab",
            "value": "Index Ventures",
            "image_id": "ct3kzpmkbqmqtatmhkfa",
            "permalink": "index-ventures",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "a81e9c10-e2bf-4274-9355-34856d85abd7",
          "value": "Hyperline",
          "image_id": "sqjaucv6xlfdgsc53xwt",
          "permalink": "hyperline",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "9670673a-2dd9-4cc6-b2d3-bb03f510f48b",
        "identifier": {
          "uuid": "9670673a-2dd9-4cc6-b2d3-bb03f510f48b",
          "value": "Seed Round - JAN3",
          "image_id": "nuv3x5di0gf5wc7ulsyc",
          "permalink": "jan3-seed--9670673a",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-03",
        "money_raised": {
          "value": 5000000,
          "currency": "USD",
          "value_usd": 5000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "45723702-86f3-4092-b0ff-21feda302b1b",
            "value": "Bitcoin Opportunity Fund",
            "image_id": "bvh6cmorq2igtuae44ad",
            "permalink": "bitcoin-opportunity-fund",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "236aca5c-0f35-d156-5ba4-36926de6425e",
            "value": "East Ventures",
            "image_id": "akfbikc5yv9hbrjrgvsq",
            "permalink": "east-ventures",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a622aa66-bb93-458f-a12a-9151c8007524",
            "value": "Fulgur Ventures",
            "image_id": "mgwm46kv2pfhxisujtpe",
            "permalink": "fulgur-venture",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "908e5f48-d43a-23ea-f0fd-bc1a574c2c45",
            "value": "Grupo Salinas",
            "image_id": "v1407362284/q6sxukinq4zvm4ursvxz.jpg",
            "permalink": "grupo-salinas",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "54ffcd2a-bf5f-4ca3-990e-3ee0450ca525",
            "value": "Lightning Ventures",
            "image_id": "dlaryylyfbccpcjasml9",
            "permalink": "lightning-ventures-a525",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "b0ba7a27-0c34-4ade-b513-8ccec14a6e46",
            "value": "NYDIG",
            "image_id": "pn3fjargwqaw4vvijc1f",
            "permalink": "nydig",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "0da19061-8498-46b1-ae47-bd2404d0745b",
            "value": "Plan B Fund",
            "image_id": "2e0f77cc07fd435b908e8b8c5d28baf4",
            "permalink": "plan-b-fund",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "a9510682-b08f-464a-b99a-45d741fb50cc",
            "value": "Tether Operations Limited",
            "image_id": "93c680e9461d4985aa2c0e753f3d2242",
            "permalink": "tether-50cc",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "8dc6a28a-1e1a-4537-8bb7-045b383d658f",
          "value": "JAN3",
          "image_id": "nuv3x5di0gf5wc7ulsyc",
          "permalink": "jan3",
          "entity_def_id": "organization"
        }
      },
      {
        "uuid": "6cda9407-969e-4274-93ad-58f1cdcb01f6",
        "identifier": {
          "uuid": "6cda9407-969e-4274-93ad-58f1cdcb01f6",
          "value": "Seed Round - SONEX",
          "image_id": "dcfa1ffa12224e6680d61f861f4af5be",
          "permalink": "sonex-194c-seed--6cda9407",
          "entity_def_id": "funding_round"
        },
        "announced_on": "2025-01-21",
        "money_raised": {
          "value": 1000000,
          "currency": "USD",
          "value_usd": 1000000
        },
        "investment_type": "seed",
        "investor_identifiers": [
          {
            "role": "investor",
            "uuid": "9c75404d-f00a-4c28-986f-b6ae2305887d",
            "value": "Baboon.VC",
            "image_id": "vjsep1s9v9l1mdolmnw7",
            "permalink": "baboon-vc",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "5cb515c0-f009-7868-600a-4165f16ed27a",
            "value": "Flow Traders",
            "image_id": "rmbxvn1rhyovusjmsdhe",
            "permalink": "flow-traders",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "0cd13660-504f-440f-a66e-cc4167b7fc7a",
            "value": "Gate Ventures",
            "image_id": "68cdab540fde4aa8984142d0d4ddbd5a",
            "permalink": "gate-ventures-fc7a",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "323b921e-d326-425f-8e36-a33c2c8d229f",
            "value": "Lootex",
            "image_id": "lzdlztuh3p8tsgay0bk6",
            "permalink": "lootex",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "76f2ca65-72e7-4fb6-8c3a-59b8795d97c9",
            "value": "Nonagon Capital",
            "image_id": "jkkyjjs3jevzmperd8eh",
            "permalink": "nonagon-capital",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "746bb932-1e7f-4b3c-815c-a081e51bab73",
            "value": "Outliers Fund",
            "image_id": "ju14kh3xostb1z6nbcpd",
            "permalink": "outliers",
            "entity_def_id": "organization"
          },
          {
            "role": "investor",
            "uuid": "149a4cd6-c439-45cc-87e6-15f5c07106cc",
            "value": "Taisu Ventures",
            "image_id": "wwjlbvzujan1gksnchv7",
            "permalink": "taisu-ventures",
            "entity_def_id": "organization"
          }
        ],
        "funded_organization_identifier": {
          "role": "investee",
          "uuid": "b25809bd-a540-4b9d-bfee-c34acf62194c",
          "value": "SONEX",
          "image_id": "dcfa1ffa12224e6680d61f861f4af5be",
          "permalink": "sonex-194c",
          "entity_def_id": "organization"
        }
      }
    ]
  }
  

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await loadAllData();
    // await refreshData();
});

function switchTab(tab) {
    activeTab = tab;
    
    // Update tab styles
    const productHuntTab = document.getElementById('productHuntTab');
    const ycTab = document.getElementById('ycTab');
    const productHuntContent = document.getElementById('productHuntContent');
    const ycContent = document.getElementById('ycContent');
    
    if (tab === 'producthunt') {
        productHuntTab.classList.add('text-purple-500', 'border-b-2', 'border-purple-500');
        productHuntTab.classList.remove('text-gray-500');
        ycTab.classList.remove('text-purple-500', 'border-b-2', 'border-purple-500');
        ycTab.classList.add('text-gray-500');
        
        productHuntContent.classList.remove('hidden');
        ycContent.classList.add('hidden');
    } else {
        ycTab.classList.add('text-purple-500', 'border-b-2', 'border-purple-500');
        ycTab.classList.remove('text-gray-500');
        productHuntTab.classList.remove('text-purple-500', 'border-b-2', 'border-purple-500');
        productHuntTab.classList.add('text-gray-500');
        
        ycContent.classList.remove('hidden');
        productHuntContent.classList.add('hidden');
    }
}


// New function to render combined content
// function renderCombinedContent() {
//     const mainContent = document.getElementById('mainContent');
    
//     // Ensure we have arrays for both data sources
//     const phItems = postsData || [];
//     const ycItems = ycData || [];
    
//     console.log("About to render - PH items:", phItems);
//     console.log("About to render - YC items:", ycItems);
    
//     // Create combined array
//     const combinedItems = [...phItems, ...ycItems];
    
//     const cardsHTML = combinedItems.map(item => {
//         // Determine if item is from YC
//         const isYC = 'batch' in item;
        
//         return `
//             <div class="product-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative">
//                 <!-- Source Label -->
//                 <div class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
//                           ${isYC ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
//                                 : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'}">
//                     ${isYC ? 'Y Combinator' : 'Product Hunt'}
//                 </div>
                
//                 <div class="p-6">
//                     <!-- Header -->
//                     <div class="flex items-start space-x-4 mb-4">
//                         <div class="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
//                             ${isYC
//                                 ? `<img src="${item.details?.main_logo || 'https://via.placeholder.com/64'}" 
//                                        alt="${item.name}" class="w-full h-full object-cover"
//                                        onerror="this.src='https://via.placeholder.com/64';">`
//                                 : `<img src="${item.thumbnail?.url || 'https://ph-static.imgix.net/ph-logo-1.png'}" 
//                                        alt="${item.name}" class="w-full h-full object-cover"
//                                        onerror="this.src='https://ph-static.imgix.net/ph-logo-1.png';">`
//                             }
//                         </div>
//                         <div class="flex-1 min-w-0">
//                             <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
//                                 ${item.name}
//                             </h3>
//                             <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
//                                 ${isYC ? item.description : item.tagline}
//                             </p>
//                         </div>
//                     </div>

//                     <!-- Tags -->
//                     <div class="flex flex-wrap gap-2 mb-4">
//                         ${isYC 
//                             ? `
//                                 ${(item.industries || []).map(industry => `
//                                     <span class="px-2.5 py-1 text-xs font-medium rounded-full 
//                                                bg-blue-100 dark:bg-blue-900/30 
//                                                text-blue-700 dark:text-blue-300">
//                                         ${industry}
//                                     </span>
//                                 `).join('')}
//                                 <span class="px-2.5 py-1 text-xs font-medium rounded-full 
//                                            bg-orange-100 dark:bg-orange-900/30 
//                                            text-orange-700 dark:text-orange-300">
//                                     ${item.batch}
//                                 </span>
//                             `
//                             : `
//                                 ${(item.topics?.edges || []).slice(0, 2).map(({node}) => `
//                                     <span class="px-2.5 py-1 text-xs font-medium rounded-full 
//                                                bg-purple-100 dark:bg-purple-900/30 
//                                                text-purple-700 dark:text-purple-300">
//                                         ${node.name}
//                                     </span>
//                                 `).join('')}
//                             `
//                         }
//                     </div>

//                     <!-- Stats & Action -->
//                     <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
//                         <div class="flex items-center space-x-4">
//                             ${isYC 
//                                 ? `
//                                     <div class="flex items-center">
//                                         <i class="fas fa-users text-gray-400 mr-2"></i>
//                                         <span class="text-gray-700 dark:text-gray-300">
//                                             Team: ${item.details?.team_size || 'N/A'}
//                                         </span>
//                                     </div>
//                                 `
//                                 : `
//                                     <div class="flex items-center">
//                                         <i class="fas fa-arrow-up text-orange-500 mr-2"></i>
//                                         <span class="text-gray-700 dark:text-gray-300">${item.votesCount || 0}</span>
//                                     </div>
//                                     <div class="flex items-center">
//                                         <i class="fas fa-comment text-gray-400 mr-2"></i>
//                                         <span class="text-gray-700 dark:text-gray-300">${item.commentsCount || 0}</span>
//                                     </div>
//                                 `
//                             }
//                         </div>
//                         <button onclick="${isYC ? `showYCDetails('${item.name}')` : `showPostDetails('${item.id}')`}"
//                                 class="px-4 py-2 text-sm font-medium rounded-lg 
//                                        ${isYC 
//                                          ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
//                                          : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'}
//                                        transition-colors">
//                             View Details
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }).join('');

//     mainContent.innerHTML = `
//         <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             ${cardsHTML}
//         </div>
//     `;
// }


function renderCombinedContent() {
    const mainContent = document.getElementById('mainContent');
    
    // Get data from all sources
    const phItems = postsData || [];
    const ycItems = ycData || [];
    const fundingItems = cbdata.results || [];
    
    // Create combined array of all items
    const combinedItems = [
        ...phItems.map(item => ({...item, source: 'producthunt'})),
        ...ycItems.map(item => ({...item, source: 'yc'})),
        ...fundingItems.map(item => ({...item, source: 'funding'}))
    ];
    
    const cardsHTML = combinedItems.map(item => {
        // Determine source type
        const source = item.source;
        let sourceLabel, sourceStyle;
        
        switch(source) {
            case 'producthunt':
                sourceLabel = 'Product Hunt';
                sourceStyle = 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300';
                break;
            case 'yc':
                sourceLabel = 'Y Combinator';
                sourceStyle = 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300';
                break;
            case 'funding':
                sourceLabel = 'Funding Round';
                sourceStyle = 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300';
                break;
        }

        // Generate card based on source
        if (source === 'funding') {
            return `
                <div class=" product-card flex flex-col  rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative">
                    <div class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${sourceStyle}">
                        ${sourceLabel}
                    </div>
                    
                    <div class="p-6 flex-1">
                        <div class="flex items-start space-x-4 mb-4">
                            <div class="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                ${item.identifier?.image_id 
                                    ? `<img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${item.identifier.image_id}" 
                                           alt="${item.funded_organization_identifier.value}"
                                           class="w-full h-full object-cover"
                                           onerror="this.src='/api/placeholder/64/64';">`
                                    : `<i class="fas fa-chart-line text-gray-400 text-2xl"></i>`}
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
                                    ${item.funded_organization_identifier.value}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    ${formatCurrency(item.money_raised.value, item.money_raised.currency)} - ${item.investment_type}
                                </p>
                            </div>
                        </div>

                        <div class="flex flex-wrap gap-2 mb-4">
                            <span class="px-2.5 py-1 text-xs font-medium rounded-full ${sourceStyle}">
                                ${item.investment_type.toUpperCase()}
                            </span>
                            <span class="px-2.5 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                ${new Date(item.announced_on).toLocaleDateString()}
                            </span>
                        </div>
                    </div>

                    <div class="p-6 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div class="flex items-center justify-between">
                            <div class="flex items-center">
                                <i class="fas fa-users text-gray-400 mr-2"></i>
                                <span class="text-gray-700 dark:text-gray-300">
                                    ${item.investor_identifiers?.length || 0} Investors
                                </span>
                            </div>
                            <button onclick="showFundingDets('${item.uuid}')"
                                    class="px-4 py-2 text-sm font-medium rounded-lg 
                                           bg-green-100 dark:bg-green-900/30 
                                           text-green-700 dark:text-green-300 
                                           hover:bg-green-200 dark:hover:bg-green-900/50
                                           transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        else {
            const isYC = 'batch' in item;
        
            return `
                <div class="product-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 relative">
                    <!-- Source Label -->
                    <div class="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium
                              ${isYC ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300'}">
                        ${isYC ? 'Y Combinator' : 'Product Hunt'}
                    </div>
                    
                    <div class="p-6">
                        <!-- Header -->
                        <div class="flex items-start space-x-4 mb-4">
                            <div class="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                                ${isYC
                                    ? `<img src="${item.details?.main_logo || 'https://via.placeholder.com/64'}" 
                                           alt="${item.name}" class="w-full h-full object-cover"
                                           onerror="this.src='https://via.placeholder.com/64';">`
                                    : `<img src="${item.thumbnail?.url || 'https://ph-static.imgix.net/ph-logo-1.png'}" 
                                           alt="${item.name}" class="w-full h-full object-cover"
                                           onerror="this.src='https://ph-static.imgix.net/ph-logo-1.png';">`
                                }
                            </div>
                            <div class="flex-1 min-w-0">
                                <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">
                                    ${item.name}
                                </h3>
                                <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                                    ${isYC ? item.description : item.tagline}
                                </p>
                            </div>
                        </div>
    
                        <!-- Tags -->
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${isYC 
                                ? `
                                    ${(item.industries || []).map(industry => `
                                        <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                                   bg-blue-100 dark:bg-blue-900/30 
                                                   text-blue-700 dark:text-blue-300">
                                            ${industry}
                                        </span>
                                    `).join('')}
                                    <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                               bg-orange-100 dark:bg-orange-900/30 
                                               text-orange-700 dark:text-orange-300">
                                        ${item.batch}
                                    </span>
                                `
                                : `
                                    ${(item.topics?.edges || []).slice(0, 2).map(({node}) => `
                                        <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                                   bg-purple-100 dark:bg-purple-900/30 
                                                   text-purple-700 dark:text-purple-300">
                                            ${node.name}
                                        </span>
                                    `).join('')}
                                `
                            }
                        </div>
    
                        <!-- Stats & Action -->
                        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                            <div class="flex items-center space-x-4">
                                ${isYC 
                                    ? `
                                        <div class="flex items-center">
                                            <i class="fas fa-users text-gray-400 mr-2"></i>
                                            <span class="text-gray-700 dark:text-gray-300">
                                                Team: ${item.details?.team_size || 'N/A'}
                                            </span>
                                        </div>
                                    `
                                    : `
                                        <div class="flex items-center">
                                            <i class="fas fa-arrow-up text-orange-500 mr-2"></i>
                                            <span class="text-gray-700 dark:text-gray-300">${item.votesCount || 0}</span>
                                        </div>
                                        <div class="flex items-center">
                                            <i class="fas fa-comment text-gray-400 mr-2"></i>
                                            <span class="text-gray-700 dark:text-gray-300">${item.commentsCount || 0}</span>
                                        </div>
                                    `
                                }
                            </div>
                            <button onclick="${isYC ? `showYCDetails('${item.name}')` : `showPostDetails('${item.id}')`}"
                                    class="px-4 py-2 text-sm font-medium rounded-lg 
                                           ${isYC 
                                             ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50'
                                             : 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 hover:bg-purple-200 dark:hover:bg-purple-900/50'}
                                           transition-colors">
                                View Details
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }
        
        // Return existing ProductHunt and YC cards
        return /* Your existing card generation code */;
    }).join('');

    mainContent.innerHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            ${cardsHTML}
        </div>
    `;
}

// Add this function to show funding details
async function showFundingDets(eventId) {
    const data = await fetchFundingData();
    fundingData = data;
    const event = fundingData.find(e => e.uuid === eventId);
    
    if (!event) {
        console.log("Event not found");
        return;
    }

    // Set the current event ID
    currentEventId = eventId;
    
    const modal = document.getElementById('fundingModalfund');
    const modalContent = document.getElementById('modalContentfund');
    
    // First set up loading state
    modalContent.innerHTML = `
        <div class="flex items-center justify-center p-12">
            <div class="flex flex-col items-center space-y-4">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p class="text-gray-500">Loading company data...</p>
            </div>
        </div>
    `;

    // Show the modal
    modal.style.display = 'block';
    
    // Set the title
    document.getElementById('modalTitle').textContent = event.funded_organization_identifier.value;
    
    try {
        // Then update the content
        await updateModalContentfunding(event);
        console.log("Modal content updated successfully");
    } catch (error) {
        console.error("Error updating modal content:", error);
        modalContent.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600">Error loading data. Please try again.</p>
            </div>
        `;
    }
}


async function updateModalContentfunding(event) {

    try {
        console.log('updating modal content')
        const modalContent = document.getElementById('modalContentfund');
        
        if (factiveModalTab === 'details') {
            modalContent.innerHTML = await generateDetailsTab(event);
        } else {
            modalContent.innerHTML = await generateInvestorsTab(event);
        }
    } catch (error) {
        console.error('Error updating modal content:', error);
        modalContent.innerHTML = `
        
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600">Error loading data. Please try again.</p>
            </div>
        `;
    }
}

async function fetchCrunchbaseEntity(uuid, type = 'organizations') {
    try {
        console.log('fetching data')
        const response = await fetch(`${API_BASE_URL}/entity/${type}/${uuid}`);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        console.log(response)
        return await response.json();
    } catch (error) {
        console.error('Error fetching entity:', error);
        return null;
    }
}

async function generateDetailsTab(event) {
    const company = event.funded_organization_identifier;
    let crunchbaseData = null;
    
    try {
        crunchbaseData = await fetchCrunchbaseEntity(company.uuid);
    } catch (error) {
        console.error('Error fetching company details:', error);
    }

    const fields = crunchbaseData?.cards?.fields || {};
    const properties = crunchbaseData?.properties?.identifier || {};

    return `
    <div class="space-y-8">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6 transition-colors">
            <!-- Company Header -->
            <div class="flex items-start space-x-6">
                ${company.image_id ? `
                    <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${company.image_id}" 
                         alt="${company.value}"
                         class="w-24 h-24 rounded-lg object-cover flex-shrink-0 border dark:border-gray-600">
                ` : `
                    <div class="w-24 h-24 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                        <span class="text-3xl font-semibold text-gray-400 dark:text-gray-500">
                            ${company.value.charAt(0)}
                        </span>
                    </div>
                `}
                <div class="flex-1 min-w-0">
                    <div class="flex items-start justify-between">
                        <div>
                            <h2 class="text-2xl font-bold text-gray-900 dark:text-white truncate">${company.value}</h2>
                            ${fields.short_description ? `
                                <p class="mt-2 text-gray-600 dark:text-gray-300">${fields.short_description}</p>
                            ` : ''}
                        </div>
                        <div class="flex space-x-4 ml-4">
                            ${fields.linkedin?.value ? `
                                <a href="${fields.linkedin.value}" 
                                   target="_blank"
                                   class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                    <i class="fab fa-linkedin text-xl"></i>
                                </a>
                            ` : ''}
                            ${fields.twitter?.value ? `
                                <a href="https://twitter.com/${fields.twitter.value}" 
                                   target="_blank"
                                   class="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                    <i class="fab fa-twitter text-xl"></i>
                                </a>
                            ` : ''}
                            ${fields.website_url ? `
                                <a href="${fields.website_url}" 
                                   target="_blank"
                                   class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                    <i class="fas fa-globe text-xl"></i>
                                </a>
                            ` : ''}
                        </div>
                    </div>



                    <!-- Company Quick Stats -->
                    <div class="mt-4 flex flex-wrap gap-4">
                        ${fields.created_at ? `
                            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <i class="far fa-calendar mr-2"></i>
                                Founded ${new Date(fields.created_at).toLocaleDateString()}
                            </div>
                        ` : ''}
                        ${fields.last_funding_date ? `
                            <div class="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <i class="fas fa-money-bill mr-2"></i>
                                Last Funding ${new Date(fields.last_funding_date).toLocaleDateString()}
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>

                            <!-- Contact Search Section -->
                <div class="mt-6 border-t dark:border-gray-700 pt-6">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Contact Search</h4>
                        <button onclick="searchContacts(event, '${fields.website_url}')"
                                class="px-4 py-2 bg-blue-500 dark:bg-purple-900/30 text-gray-500 dark:text-gray-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                            <i class="fas fa-search mr-2"></i>
                            Find Contacts
                        </button>
                    </div>
                    <div id="contacts-list" class="space-y-4">
                        <!-- Contacts will be loaded here -->
                    </div>
                </div>

            <!-- Current Funding Round -->
            <div class="mt-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Current Funding Round</h3>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600 transition-colors">
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Amount Raised</p>
                            <div class="flex items-baseline space-x-2 mt-1">
                                <p class="text-2xl font-bold text-gray-900 dark:text-white">
                                    ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
                                </p>
                                ${event.money_raised.currency !== 'USD' ? `
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        (${formatCurrency(event.money_raised.value_usd, 'USD')})
                                    </p>
                                ` : ''}
                            </div>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Round Type</p>
                            <p class="text-xl font-semibold text-gray-900 dark:text-white capitalize mt-1">
                                ${event.investment_type}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Announcement Date</p>
                            <p class="text-xl font-semibold text-gray-900 dark:text-white mt-1">
                                ${new Date(event.announced_on).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Organization Metrics -->
            <div class="mt-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Organization Metrics</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Rankings -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600 transition-colors">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Rankings</h4>
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Organization Rank</p>
                                <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    ${fields.rank_org || 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">Company Rank</p>
                                <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                    ${fields.rank_org_company || 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>

                    <!-- Performance Changes -->
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600 transition-colors">
                        <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4">Recent Performance</h4>
                        <div class="grid grid-cols-3 gap-4">
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">7 Days</p>
                                <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d7 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                    ${fields.rank_delta_d7 ? `${fields.rank_delta_d7.toFixed(1)}%` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">30 Days</p>
                                <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d30 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                    ${fields.rank_delta_d30 ? `${fields.rank_delta_d30.toFixed(1)}%` : 'N/A'}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500 dark:text-gray-400">90 Days</p>
                                <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d90 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                    ${fields.rank_delta_d90 ? `${fields.rank_delta_d90.toFixed(1)}%` : 'N/A'}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Location Information -->
            ${fields.location_identifiers ? `
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Location</h3>
                    <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600 transition-colors">
                        <div class="flex flex-wrap gap-2">
                            ${fields.location_identifiers.map(location => `
                                <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 transition-colors">
                                    ${location.value}
                                    ${location.location_type ? `
                                        <span class="ml-1.5 text-blue-500 dark:text-blue-400 text-xs">(${location.location_type})</span>
                                    ` : ''}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                </div>
            ` : ''}

            <!-- Additional Information -->
            <div class="mt-8">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Additional Information</h3>
                <div class="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 border dark:border-gray-600 transition-colors">
                    <div class="grid grid-cols-2 gap-6">
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Created</p>
                            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                ${new Date(fields.created_at).toLocaleDateString()}
                            </p>
                        </div>
                        <div>
                            <p class="text-sm text-gray-500 dark:text-gray-400">Last Updated</p>
                            <p class="text-sm font-medium text-gray-900 dark:text-white mt-1">
                                ${new Date(fields.updated_at).toLocaleDateString()}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
`;
}

async function generateInvestorsTab(event) {
    // Fetch Crunchbase data for all investors
    const investorsWithData = await Promise.all(event.investor_identifiers.map(async investor => {
        let crunchbaseData = null;
        try {
            crunchbaseData = await fetchCrunchbaseEntity(
                investor.uuid,
                investor.entity_def_id === 'person' ? 'people' : 'organizations'
            );
        } catch (error) {
            console.error(`Error fetching data for investor ${investor.uuid}:`, error);
        }
        return { ...investor, crunchbaseData };
    }));

    return `
    <div class="space-y-6">
        ${investorsWithData.map(investor => {
            const fields = investor.crunchbaseData?.cards?.fields || {};
            const properties = investor.crunchbaseData?.properties?.identifier || {};
            
            return `
                <div class="investor-card bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-6 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all">
                    <div class="flex items-start justify-between">
                        <div class="flex items-start space-x-4">
                            ${investor.image_id ? `
                                <img class="h-16 w-16 rounded-lg object-cover border dark:border-gray-600" 
                                     src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${investor.image_id}"
                                     alt="${properties.value}">
                            ` : `
                                <div class="h-16 w-16 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                    <span class="text-xl font-semibold text-gray-400 dark:text-gray-500">
                                        ${investor.value.charAt(0)}
                                    </span>
                                </div>
                            `}
                            <div class="flex-1 min-w-0">
                                <div class="flex items-start justify-between">
                                    <div>
                                        <h3 class="text-xl font-semibold text-gray-900 dark:text-white truncate">${investor.value}</h3>
                                        <p class="text-sm text-gray-500 dark:text-gray-400 capitalize">
                                            ${investor.role || 'Investor'} · ${investor.entity_def_id}
                                        </p>
                                    </div>
                                </div>
                                ${fields.short_description ? `
                                    <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                        ${fields.short_description}
                                    </p>
                                ` : ''}
                            </div>
                        </div>
                        <div class="flex items-start space-x-4 ml-4">
                            ${fields.linkedin?.value ? `
                                <a href="${fields.linkedin.value}" 
                                   target="_blank"
                                   class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                    <i class="fab fa-linkedin text-xl"></i>
                                </a>
                            ` : ''}
                            ${fields.twitter?.value ? `
                                <a href="https://twitter.com/${fields.twitter.value}" 
                                   target="_blank"
                                   class="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors">
                                    <i class="fab fa-twitter text-xl"></i>
                                </a>
                            ` : ''}
                            ${fields.website_url ? `
                                <a href="${fields.website_url}" 
                                   target="_blank"
                                   class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors">
                                    <i class="fas fa-globe text-xl"></i>
                                </a>
                            ` : ''}
                            <button onclick="toggleInvestorDetails('${investor.uuid}')"
                                    class="text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                                <i class="fas fa-chevron-down transform transition-transform duration-200"></i>
                            </button>
                        </div>
                    </div>
                    
                    <!-- Expandable Details Section -->
                    <div id="investor-${investor.uuid}-details" class="hidden mt-6">
                        <div class="border-t dark:border-gray-700 pt-6">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <!-- Company Stats -->
                                <div class="space-y-4">
                                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Organization Stats</h4>
                                    <div class="grid grid-cols-2 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600">
                                        <div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">Org Rank</p>
                                            <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                                ${fields.rank_org || 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">Principal Rank</p>
                                            <p class="text-lg font-semibold text-gray-900 dark:text-white mt-1">
                                                ${fields.rank_principal || 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <!-- Recent Performance -->
                                <div class="space-y-4">
                                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Recent Performance</h4>
                                    <div class="grid grid-cols-3 gap-4 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600">
                                        <div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">7 Days</p>
                                            <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d7 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                                ${fields.rank_delta_d7 ? `${fields.rank_delta_d7.toFixed(1)}%` : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">30 Days</p>
                                            <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d30 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                                ${fields.rank_delta_d30 ? `${fields.rank_delta_d30.toFixed(1)}%` : 'N/A'}
                                            </p>
                                        </div>
                                        <div>
                                            <p class="text-sm text-gray-500 dark:text-gray-400">90 Days</p>
                                            <p class="text-lg font-semibold mt-1 ${fields.rank_delta_d90 > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}">
                                                ${fields.rank_delta_d90 ? `${fields.rank_delta_d90.toFixed(1)}%` : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <!-- Location Information -->
                            ${fields.location_identifiers ? `
                                <div class="mt-6">
                                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Location</h4>
                                    <div class="flex flex-wrap gap-2">
                                        ${fields.location_identifiers.map(location => `
                                            <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                                                ${location.value}
                                            </span>
                                        `).join('')}
                                    </div>
                                </div>
                            ` : ''}

                            <!-- Additional Info -->
                            <div class="mt-6 grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-medium">Created:</span> 
                                        ${new Date(fields.created_at).toLocaleDateString()}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500 dark:text-gray-400">
                                        <span class="font-medium">Last Updated:</span> 
                                        ${new Date(fields.updated_at).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <!-- Contact Search Section -->
                            <div class="mt-6 border-t dark:border-gray-700 pt-6">
                                <div class="flex justify-between items-center mb-4">
                                    <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400">Contact Information</h4>
                                    <button onclick="searchContacts('${investor.uuid}', '${fields.website_url || ''}')"
                                            class="inline-flex items-center px-4 py-2 rounded-lg text-sm font-medium text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900 transition-colors">
                                        <i class="fas fa-search mr-2"></i>
                                        Find Contacts
                                    </button>
                                </div>
                                <div id="contacts-list-${investor.uuid}" class="space-y-4">
                                    <!-- Contacts will be loaded here -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('')}
    </div>

   
`;
}

function generateEmailTemplate(contact, company) {
    return {
        subject: `Regarding your investment in ${company}`,
        body: `Dear ${contact.name},

I noticed your investment in ${company} and wanted to connect regarding potential opportunities for collaboration.

Best regards,
[Your name]`
    };
}


function toggleInvestorDetails(investorId) {
    const detailsElement = document.getElementById(`investor-${investorId}-details`);
    const button = detailsElement.previousElementSibling.querySelector('button i');
    
    if (detailsElement.classList.contains('hidden')) {
        detailsElement.classList.remove('hidden');
        button.classList.remove('fa-chevron-down');
        button.classList.add('fa-chevron-up');
    } else {
        detailsElement.classList.add('hidden');
        button.classList.remove('fa-chevron-up');
        button.classList.add('fa-chevron-down');
    }
}


// Utility function to format currency
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

async function fetchFundingData() {
    try {
        // Ensure we're returning an array
        if (Array.isArray(cbdata.results)) {
            return cbdata.results;
        } else {
            console.error('Data is not in expected format');
            return [];
        }
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

async function loadAllData() {
    try {
        // Load Product Hunt data
        const phData = await fetchPostsData();
        postsData = phData

        const data = await fetchFundingData();
        fundingData = data
        
        // Load YC data
        // const ycResponse = await window.fs.readFile('paste-3.txt', { encoding: 'utf8' });
        // ycData = YCdata
        try {
            const ycResponse =YCdata
            console.log("YC Data loaded:", ycResponse.slice(0, 100)); // Debug log
            ycData = ycResponse
        } catch (ycError) {
            console.error('Error loading YC data:', ycError);
            ycData = [];
        }
        
        // Debug log to check both data sources
        console.log("PH Data length:", postsData.length);
        console.log("YC Data length:", ycData.length);
        // Render combined content
        renderCombinedContent();
        updateRefreshTimestamp();
    } catch (error) {
        console.error('Error loading data:', error);
        showNotification('Error fetching data', 'error');
    }
}


async function refreshData() {
    try {
        const data = await fetchPostsData();
        postsData = data;
        lastRefreshTime = new Date();
        currentPostId = null;
        updateRefreshTimestamp();
        // renderMainTable(data);
    } catch (error) {
        console.error(error);
        showNotification('Error fetching data', 'error');
    }
}

async function fetchPostsData() {
    try {
        // Return the test data array
        return outputdata.results;
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}


// Simulated Hunter.io data generator
function simulateHunterData(companyName, domain) {
    const titles = ['CEO', 'CTO', 'CMO', 'Product Manager', 'Software Engineer', 'Marketing Director'];
    const firstNames = ['John', 'Sarah', 'Michael', 'Emma', 'David', 'Lisa'];
    const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia'];
    
    const numContacts = Math.floor(Math.random() * 5) + 3; // 3-7 contacts
    const contacts = [];
    
    for (let i = 0; i < numContacts; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const title = titles[Math.floor(Math.random() * titles.length)];
        const email = `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`;
        
        contacts.push({
            firstName,
            lastName,
            title,
            email,
            confidence: Math.floor(Math.random() * 30) + 70, // 70-99 confidence score
            linkedIn: `https://linkedin.com/in/${firstName.toLowerCase()}-${lastName.toLowerCase()}-${Math.random().toString(36).substring(7)}`
        });
    }
    
    return {
        domain,
        pattern: '{first}.{last}@${domain}',
        organization: companyName,
        contacts
    };
}

async function searchContacts(event, domain) {
    // event.preventDefault();
    const contactsList = document.getElementById('contacts-list');
    console.log(domain)
    
    // Show loading state
    contactsList.innerHTML = `
        <div class="flex justify-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
        </div>
    `;

    try {
        const response = await fetch('https://investmenttool.onrender.com/search-contacts', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ domain: domain || getDomainFromCurrentModal() })
        });

        if (!response.ok) throw new Error('Failed to fetch contacts');
        const data = await response.json();
        const contacts = data.data.emails || [];

        renderContacts(contacts);
    } catch (error) {
        contactsList.innerHTML = `
            <div class="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg">
                Error finding contacts: ${error.message}
            </div>
        `;
    }
}

function getDomainFromCurrentModal() {
    // Get domain from current modal content
    // This is a simplified example - modify based on your data structure
    const currentCompany = document.querySelector('#modalTitle').textContent;
    return `${currentCompany.toLowerCase().replace(/\s+/g, '')}.com`;
}

function renderContacts(contacts) {
    const contactsList = document.getElementById('contacts-list');
    
    if (contacts.length === 0) {
        contactsList.innerHTML = `
            <div class="text-center text-gray-500 dark:text-gray-400 py-4">
                No contacts found
            </div>
        `;
        return;
    }

    const contactsHTML = contacts.map(contact => `
        <div class="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5">
            <div class="flex justify-between items-start">
                <div class="flex-1 min-w-0">
                    <h5 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                        ${contact.first_name} ${contact.last_name}
                    </h5>
                    ${contact.position ? `
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${contact.position}</p>
                    ` : ''}
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${contact.value}</p>
                    
                    <div class="mt-2">
                        <div class="flex items-center">
                            <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full">
                                <div 
                                    class="h-2 rounded-full transition-all ${
                                        contact.confidence >= 80 ? 'bg-green-500' : 
                                        contact.confidence >= 60 ? 'bg-yellow-500' : 
                                        'bg-red-500'
                                    }"
                                    style="width: ${contact.confidence}%">
                                </div>
                            </div>
                            <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                ${contact.confidence}%
                            </span>
                        </div>
                    </div>
                </div>
                
                <div class="flex space-x-3 ml-4">
                    ${contact.linkedin ? `
                        <a href="${contact.linkedin}"
                           target="_blank"
                           rel="noopener noreferrer"
                           class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                            <i class="fab fa-linkedin"></i>
                        </a>
                    ` : ''}
                    <button 
                        onclick="openEmailModal('${contact.value}', '${contact.first_name}', '${contact.last_name}', '${contact.position || ''}')"
                        class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');

    contactsList.innerHTML = contactsHTML;
}

function openEmailModal(email, firstName, lastName, position) {
    const modal = document.getElementById('emailModal');
    const toInput = document.getElementById('emailTo');
    const subjectInput = document.getElementById('emailSubject');
    const bodyInput = document.getElementById('emailBody');
    
    toInput.value = email;
    subjectInput.value = `Connecting regarding opportunities`;
    bodyInput.value = `Dear ${firstName},

I noticed your role as ${position} and wanted to connect regarding potential opportunities that align with your expertise.

Would you be open to a brief conversation?

Best regards,
[Your name]`;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.classList.add('hidden');
    modal.classList.remove('flex');
}

async function sendEmail() {
    const toInput = document.getElementById('emailTo');
    const subjectInput = document.getElementById('emailSubject');
    const bodyInput = document.getElementById('emailBody');

    try {
        const response = await fetch('https://investmenttool.onrender.com/send-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                to: toInput.value,
                subject: subjectInput.value,
                text: bodyInput.value
            })
        });

        if (!response.ok) throw new Error('Failed to send email');
        
        showNotification('Email sent successfully!', 'success');
        closeEmailModal();
    } catch (error) {
        showNotification('Failed to send email', 'error');
    }
}



function updateRefreshTimestamp() {
    const timestamp = document.getElementById('refreshTimestamp');
    timestamp.textContent = `Last updated: ${lastRefreshTime.toLocaleString()}`;
}

// New function to render YC content
function renderYCContent(data) {
    
    const ycContent = document.getElementById('ycContent');
    
    const cardsHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${data.map(company => `
            <div class="product-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div class="p-6">
                    <!-- Company Header -->
                    <div class="flex items-start space-x-4 mb-4">
                        <div class="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                            ${company.details?.main_logo 
                                ? `<img src="${company.details.main_logo}" alt="${company.name}" 
                                       class="w-full h-full object-cover"
                                       onerror="this.src='https://via.placeholder.com/64';">`
                                : `<div class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                     <i class="fas fa-building text-gray-400 text-2xl"></i>
                                   </div>`
                            }
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">${company.name}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${company.location}</p>
                        </div>
                    </div>

                    <!-- Description -->
                    <p class="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">${company.description}</p>

                    <!-- Industries -->
                    <div class="flex flex-wrap gap-2 mb-4">
                        ${company.industries.map(industry => `
                            <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                       bg-blue-100 dark:bg-blue-900/30 
                                       text-blue-700 dark:text-blue-300">
                                ${industry}
                            </span>
                        `).join('')}
                        <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                   bg-orange-100 dark:bg-orange-900/30 
                                   text-orange-700 dark:text-orange-300">
                            ${company.batch}
                        </span>
                    </div>

                    <!-- Stats & Action -->
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <i class="fas fa-users text-gray-400 mr-2"></i>
                                <span class="text-gray-700 dark:text-gray-300">
                                    Team: ${company.details?.team_size || 'N/A'}
                                </span>
                            </div>
                        </div>
                        <a href="${company.url}" target="_blank" rel="noopener noreferrer"
                           class="px-4 py-2 text-sm font-medium rounded-lg 
                                  bg-blue-100 dark:bg-blue-900/30 
                                  text-blue-700 dark:text-blue-300
                                  hover:bg-blue-200 dark:hover:bg-blue-900/50 
                                  transition-colors">
                            View Details
                        </a>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`;
    
    ycContent.innerHTML = cardsHTML;
}



function renderMainTable(data) {
    const mainContent = document.getElementById('mainContent');
    
    const cardsHTML = `
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        ${data.map(post => `
            <div class="product-card rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300">
                <div class="p-6">
                    <!-- Product Header -->
                    <div class="flex items-start space-x-4 mb-4">
                        <div class="w-16 h-16 rounded-lg flex-shrink-0 overflow-hidden">
                            ${post.thumbnail?.url 
                                ? `<img src="${post.thumbnail.url}" alt="${post.name}" 
                                       class="w-full h-full object-cover"
                                       onerror="this.onerror=null; this.src='https://ph-static.imgix.net/ph-logo-1.png';">`
                                : `<div class="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                     <i class="fas fa-cube text-gray-400 text-2xl"></i>
                                   </div>`
                            }
                        </div>
                        <div class="flex-1 min-w-0">
                            <h3 class="text-lg font-medium text-gray-900 dark:text-white truncate">${post.name}</h3>
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">${post.tagline}</p>
                        </div>
                    </div>

                    <!-- Topics -->
                    ${post.topics?.edges?.length ? `
                        <div class="flex flex-wrap gap-2 mb-4">
                            ${post.topics.edges.slice(0, 2).map(({node}) => `
                                <span class="px-2.5 py-1 text-xs font-medium rounded-full 
                                           bg-purple-100 dark:bg-purple-900/30 
                                           text-purple-700 dark:text-purple-300">
                                    ${node.name}
                                </span>
                            `).join('')}
                        </div>
                    ` : ''}

                    <!-- Stats & Action -->
                    <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                        <div class="flex items-center space-x-4">
                            <div class="flex items-center">
                                <i class="fas fa-arrow-up text-orange-500 mr-2"></i>
                                <span class="text-gray-700 dark:text-gray-300">${post.votesCount || 0}</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-comment text-gray-400 mr-2"></i>
                                <span class="text-gray-700 dark:text-gray-300">${post.commentsCount || 0}</span>
                            </div>
                        </div>
                        <button onclick="showPostDetails('${post.id}')"
                                class="px-4 py-2 text-sm font-medium rounded-lg 
                                       bg-purple-100 dark:bg-purple-900/30 
                                       text-purple-700 dark:text-purple-300
                                       hover:bg-purple-200 dark:hover:bg-purple-900/50 
                                       transition-colors">
                            View Details
                        </button>
                    </div>
                </div>
            </div>
        `).join('')}
    </div>`;
    
    mainContent.innerHTML = cardsHTML;
}

async function scrapeWebsitefromprod(url) {
    fetch('https://pupetteer.onrender.com/producthuntwebsite', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: url })
    })
      .then(response => response.json())
      .then(data => {
        console.log('Website data:', data.website);
      })
      .catch(error => console.error('Error fetching data:', error));
  }
  

async function showPostDetails(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;

    currentPostId = postId;
    
    const modal = document.getElementById('fundingModal');
    const modalContent = document.getElementById('modalContent');
    document.getElementById('modalTitle').textContent = post.name;
    
    // Show loading state
    modalContent.innerHTML = `
        <div class="flex items-center justify-center p-12">
            <div class="flex flex-col items-center space-y-4">
                <div class="loading-spin w-8 h-8 border-4 border-purple-500 border-t-transparent rounded-full"></div>
                <p class="text-gray-500 dark:text-gray-400">Loading product details...</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'flex';
    
    try {
        const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
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
                            comments {
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
                `
            })
        });

        const data = await response.json();
        
        if (data.errors) {
            throw new Error(data.errors[0].message);
        }

       

        const postDetails = data.data.post;
        prodhuntwebsite = await scrapeWebsitefromprod(postDetails.url)
        modalContent.innerHTML = `
            <div class="space-y-8">
                <!-- Product Header -->
                <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <div class="flex items-start space-x-6">
                        ${postDetails.thumbnail?.url ? `
                            <img src="${postDetails.thumbnail.url}" alt="${postDetails.name}" 
                                 class="w-24 h-24 rounded-xl object-cover border dark:border-gray-700">
                        ` : `
                            <div class="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <i class="fas fa-cube text-gray-400 text-3xl"></i>
                            </div>
                        `}
                        <div class="flex-1">
                            <div class="flex items-start justify-between">
                                <div>
                                    <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${postDetails.name}</h2>
                                    <p class="mt-1 text-gray-600 dark:text-gray-300">${postDetails.tagline}</p>
                                </div>
                                <div class="flex items-center space-x-4">
                                    <a href="${prodhuntwebsite}" target="_blank" 
                                       class="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300">
                                        <i class="fas fa-external-link-alt"></i>
                                    </a>
                                </div>
                            </div>
                            
                            <!-- Stats -->
                            <div class="mt-4 flex items-center space-x-6">
                                <div class="flex items-center">
                                    <i class="fas fa-arrow-up text-orange-500 mr-2"></i>
                                    <span class="text-gray-900 dark:text-white font-medium">${postDetails.votesCount}</span>
                                    <span class="text-gray-500 dark:text-gray-400 ml-1">votes</span>
                                </div>
                                <div class="flex items-center">
                                    <i class="fas fa-comment text-purple-500 mr-2"></i>
                                    <span class="text-gray-900 dark:text-white font-medium">${postDetails.commentsCount}</span>
                                    <span class="text-gray-500 dark:text-gray-400 ml-1">comments</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Description -->
                <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                    <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">${postDetails.description}</p>
                </div>

                <!-- Contact Search Section -->
                <div class="mt-6 border-t dark:border-gray-700 pt-6">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Contact Search</h4>
                        <button onclick="searchContacts(event, '${prodhuntwebsite}')"
                                class="px-4 py-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors">
                            <i class="fas fa-search mr-2"></i>
                            Find Contacts
                        </button>
                    </div>
                    <div id="contacts-list" class="space-y-4">
                        <!-- Contacts will be loaded here -->
                    </div>
                </div>

                <!-- Topics -->
                ${postDetails.topics?.edges?.length ? `
                    <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topics</h3>
                        <div class="flex flex-wrap gap-2">
                            ${postDetails.topics.edges.map(({node}) => `
                                <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium 
                                           bg-purple-100 dark:bg-purple-900/30 
                                           text-purple-700 dark:text-purple-300">
                                    ${node.name}
                                    <span class="ml-2 text-purple-500 dark:text-purple-400 text-xs">
                                        ${node.followersCount.toLocaleString()} followers
                                    </span>
                                </span>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Makers -->
                ${postDetails.makers?.length ? `
                    <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Makers</h3>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            ${postDetails.makers.map(maker => `
                                <div class="flex items-center space-x-4">
                                    ${maker.profileImage ? `
                                        <img src="${maker.profileImage}" alt="${maker.name}"
                                             class="w-12 h-12 rounded-full object-cover border dark:border-gray-700">
                                    ` : `
                                        <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                            <span class="text-xl font-semibold text-gray-500 dark:text-gray-400">
                                                ${maker.name.charAt(0)}
                                            </span>
                                        </div>
                                    `}
                                    <div>
                                        <h4 class="text-sm font-medium text-gray-900 dark:text-white">${maker.name}</h4>
                                        ${maker.headline ? `
                                            <p class="text-sm text-gray-500 dark:text-gray-400">${maker.headline}</p>
                                        ` : ''}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Media Gallery -->
                ${postDetails.media?.length ? `
                    <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media</h3>
                        <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                            ${postDetails.media.map(item => `
                                ${item.type === 'image' ? `
                                    <img src="${item.url}" alt="Product media"
                                         class="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                         onclick="showMediaPreview('${item.url}')">
                                ` : `
                                    <div class="relative rounded-lg overflow-hidden">
                                        <img src="${item.url}" alt="Video thumbnail"
                                             class="w-full h-48 object-cover">
                                        <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                            <i class="fas fa-play text-white text-3xl"></i>
                                        </div>
                                    </div>
                                `}
                            `).join('')}
                        </div>
                    </div>
                ` : ''}

                <!-- Comments -->
                ${postDetails.comments?.edges?.length ? `
                    <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                        <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Comments</h3>
                        <div class="space-y-6">
                            ${postDetails.comments.edges.slice(0, 5).map(({node}) => `
                                <div class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                    <div class="flex justify-between items-start mb-2">
                                        <span class="font-medium text-gray-900 dark:text-white">${node.user.name}</span>
                                        <span class="text-sm text-gray-500 dark:text-gray-400">
                                            ${formatDate(node.createdAt)}
                                        </span>
                                    </div>
                                    <div class="text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                                        ${node.body}
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : ''}
            </div>
        `;
    } catch (error) {
        console.error('Error fetching post details:', error);
        modalContent.innerHTML = `
            <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
                <p class="text-red-600 dark:text-red-400">Error loading post details. Please try again.</p>
            </div>
        `;
    }
}

// Utility function to format dates
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    
    return date.toLocaleDateString();
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await refreshData();
});


// Add this function to your producthunt-view.js file
function showYCDetails(companyName) {
    const company = ycData.find(c => c.name === companyName);
    if (!company) return;
    
    const modal = document.getElementById('ycModal');
    const modalContent = document.getElementById('ycModalContent');
    document.getElementById('ycModalTitle').textContent = company.name;
    console.log(company.details.links.website, company.details.links)
    modalContent.innerHTML = `
        <div class="space-y-8">
            <!-- Company Header -->
            <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <div class="flex items-start space-x-6">
                    ${company.details?.main_logo 
                        ? `<img src="${company.details.main_logo}" alt="${company.name}" 
                               class="w-24 h-24 rounded-xl object-cover border dark:border-gray-700">`
                        : `<div class="w-24 h-24 rounded-xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                             <i class="fas fa-building text-gray-400 text-3xl"></i>
                           </div>`
                    }
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${company.name}</h2>
                                <p class="mt-1 text-gray-600 dark:text-gray-300">${company.location}</p>
                                <p class="mt-2 text-sm text-blue-600 dark:text-blue-400">${company.batch}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">${company.details.description}</p>
            </div>

                        <!-- Contact Search Section -->
            <div class="mt-6 border-t dark:border-gray-700 pt-6">
                <div class="flex justify-between items-center mb-4">
                    <h4 class="text-lg font-semibold text-gray-900 dark:text-white">Contact Search</h4>
                    <button onclick="searchContacts(event, '${company.details.links.website}')"
                            class="px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                        <i class="fas fa-search mr-2"></i>
                        Find Contacts
                    </button>
                </div>
                <div id="contacts-list" class="space-y-4">
                    <!-- Contacts will be loaded here -->
                </div>
            </div>

            <!-- Industries -->
            <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Industries</h3>
                <div class="flex flex-wrap gap-2">
                    ${company.industries.map(industry => `
                        <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium 
                                   bg-blue-100 dark:bg-blue-900/30 
                                   text-blue-700 dark:text-blue-300">
                            ${industry}
                        </span>
                    `).join('')}
                </div>
            </div>

            <!-- Founders -->
            ${company.details.founders?.length ? `
                <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Founders</h3>
                    <div class="space-y-6">
                        ${company.details.founders.map(founder => `
                            <div class="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                <h4 class="font-medium text-gray-900 dark:text-white">${founder.name}</h4>
                                ${founder.title ? `
                                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">${founder.title}</p>
                                ` : ''}
                                ${founder.bio ? `
                                    <p class="text-gray-600 dark:text-gray-300 mt-2">${founder.bio}</p>
                                ` : ''}
                                <div class="flex gap-4 mt-3">
                                    ${founder.linkedin_url ? `
                                        <a href="${founder.linkedin_url}" target="_blank" rel="noopener noreferrer"
                                           class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                            <i class="fab fa-linkedin"></i> LinkedIn
                                        </a>
                                    ` : ''}
                                    ${founder.twitter_url ? `
                                        <a href="${founder.twitter_url}" target="_blank" rel="noopener noreferrer"
                                           class="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                                            <i class="fab fa-twitter"></i> Twitter
                                        </a>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Links -->
            ${company.details.links ? `
                <div class="bg-white dark:bg-[rgba(17,16,28,0.95)] rounded-xl border border-gray-200 dark:border-gray-800 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Links</h3>
                    <div class="flex flex-wrap gap-4">
                        ${company.details.links.website ? `
                            <a href="${company.details.links.website}" target="_blank" rel="noopener noreferrer"
                               class="flex items-center px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                                      text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                <i class="fas fa-globe mr-2"></i> Website
                            </a>
                        ` : ''}
                        ${company.details.links.linkedin ? `
                            <a href="${company.details.links.linkedin}" target="_blank" rel="noopener noreferrer"
                               class="flex items-center px-4 py-2 rounded-lg bg-blue-100 dark:bg-blue-900/30 
                                      text-blue-700 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                                <i class="fab fa-linkedin mr-2"></i> LinkedIn
                            </a>
                        ` : ''}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.style.display = 'flex';
}

async function updateModalContent(post) {
    const modalContent = document.getElementById('modalContent');
    
    const content = `
        <div class="space-y-8">
            <!-- Product Header -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                <div class="flex items-start space-x-6">
                    ${post.thumbnail?.url ? `
                        <img src="${post.thumbnail.url}" alt="${post.name}" 
                             class="w-24 h-24 rounded-lg object-cover border dark:border-gray-600">
                    ` : ''}
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900 dark:text-white">${post.name}</h2>
                                <p class="mt-1 text-gray-600 dark:text-gray-300">${post.tagline}</p>
                            </div>
                            <div class="flex items-center space-x-4">
                                <a href="${post.url}" target="_blank" 
                                   class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                        <div class="mt-4 flex items-center space-x-6">
                            <div class="flex items-center">
                                <i class="fas fa-arrow-up text-green-500 mr-2"></i>
                                <span class="text-gray-900 dark:text-white font-medium">${post.votesCount}</span>
                                <span class="text-gray-500 dark:text-gray-400 ml-1">votes</span>
                            </div>
                            <div class="flex items-center">
                                <i class="fas fa-comment text-blue-500 mr-2"></i>
                                <span class="text-gray-900 dark:text-white font-medium">${post.commentsCount}</span>
                                <span class="text-gray-500 dark:text-gray-400 ml-1">comments</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Description -->
            <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">About</h3>
                <p class="text-gray-600 dark:text-gray-300 whitespace-pre-wrap">${post.description}</p>
            </div>

            <!-- Topics -->
            ${post.topics?.edges?.length ? `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Topics</h3>
                    <div class="flex flex-wrap gap-2">
                        ${post.topics.edges.map(({node}) => `
                            <span class="inline-flex items-center px-3 py-1.5 rounded-lg text-sm font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200">
                                ${node.name}
                                <span class="ml-2 text-blue-500 dark:text-blue-400 text-xs">${node.followersCount.toLocaleString()} followers</span>
                            </span>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Makers -->
            ${post.makers?.length ? `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Makers</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        ${post.makers.map(maker => `
                            <div class="flex items-center space-x-4">
                                ${maker.profileImage ? `
                                    <img src="${maker.profileImage}" alt="${maker.name}"
                                         class="w-12 h-12 rounded-full object-cover border dark:border-gray-600">
                                ` : `
                                    <div class="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                        <span class="text-xl font-semibold text-gray-500 dark:text-gray-400">
                                            ${maker.name.charAt(0)}
                                        </span>
                                    </div>
                                `}
                                <div>
                                    <h4 class="text-sm font-medium text-gray-900 dark:text-white">${maker.name}</h4>
                                    ${maker.headline ? `
                                        <p class="text-sm text-gray-500 dark:text-gray-400">${maker.headline}</p>
                                    ` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Media Gallery -->
            ${post.media?.length ? `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Media</h3>
                    <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                        ${post.media.map(item => `
                            ${item.type === 'image' ? `
                                <img src="${item.url}" alt="Product media"
                                     class="rounded-lg w-full h-48 object-cover cursor-pointer hover:opacity-75 transition-opacity"
                                     onclick="showMediaPreview('${item.url}')">
                            ` : `
                                <div class="relative rounded-lg overflow-hidden">
                                    <img src="${item.url}" alt="Video thumbnail"
                                         class="w-full h-48 object-cover">
                                    <div class="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
                                        <i class="fas fa-play text-white text-3xl"></i>
                                    </div>
                                </div>
                            `}
                        `).join('')}
                    </div>
                </div>
            ` : ''}

            <!-- Comments -->
            ${post.comments?.edges?.length ? `
                <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 p-6">
                    <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-4">Top Comments</h3>
                    <div class="space-y-6">
                        ${post.comments.edges.slice(0, 5).map(({node}) => `
                            <div class="border-b dark:border-gray-700 pb-6 last:border-0 last:pb-0">
                                <div class="flex justify-between items-start mb-2">
                                    <span class="font-medium text-gray-900 dark:text-white">${node.user.name}</span>
                                    <span class="text-sm text-gray-500 dark:text-gray-400">
                                        ${new Date(node.createdAt).toLocaleDateString()} 
                                        ${new Date(node.createdAt).toLocaleTimeString()}
                                    </span>
                                </div>
                                <div class="text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                                    ${node.body}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modalContent.innerHTML = content;
}

// Media preview functionality
function showMediaPreview(url) {
    const previewModal = document.getElementById('mediaPreviewModal');
    const previewContent = previewModal.querySelector('.aspect-w-16');
    
    previewContent.innerHTML = `
        <img src="${url}" alt="Media preview" class="w-full h-full object-contain">
    `;
    
    previewModal.classList.remove('hidden');
    previewModal.classList.add('flex');
}

function closeMediaPreview() {
    const previewModal = document.getElementById('mediaPreviewModal');
    previewModal.classList.add('hidden');
    previewModal.classList.remove('flex');
}

function setupEventListeners() {

    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Show loading state
            document.getElementById('modalContentfund').innerHTML = `
                <div class="flex items-center justify-center p-12">
                    <div class="flex flex-col items-center space-y-4">
                        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                        <p class="text-gray-500">Loading ${tabName} data...</p>
                    </div>
                </div>
            `;
            
            // Update active tab styling
            document.querySelectorAll('.modal-tab').forEach(t => {
                t.classList.remove('active', 'bg-blue-100', 'text-blue-700');
                t.classList.add('text-gray-500', 'hover:text-gray-700');
            });
            tab.classList.add('active', 'bg-blue-100', 'text-blue-700');
            tab.classList.remove('text-gray-500', 'hover:text-gray-700');
            
            // Update content
            factiveModalTab = tabName;
            const event = fundingData.find(e => e.uuid === currentEventId);
            if (event) {
                await updateModalContentfunding(event);
            }
        });
    })

    document.querySelectorAll('#ycModal .close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('ycModal').style.display = 'none';
        });
    });

    window.addEventListener('click', (event) => {
        const ycModal = document.getElementById('ycModal');
        if (event.target === ycModal) {
            ycModal.style.display = 'none';
        }
    });

    // Update ESC key handler for both modals
    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            document.getElementById('fundingModal').style.display = 'none';
            document.getElementById('ycModal').style.display = 'none';
        }
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', loadAllData);
    // Modal close handlers
    // document.getElementById('productHuntTab').addEventListener('click', () => switchTab('producthunt'));
    // document.getElementById('ycTab').addEventListener('click', () => switchTab('yc'));

    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('fundingModal').style.display = 'none';
            currentPostId = null;
        });
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('fundingModal');
        if (event.target === modal) {
            modal.style.display = 'none';
            currentPostId = null;
        }
    });

    // Media preview close handlers
    window.addEventListener('click', (event) => {
        const modal = document.getElementById('mediaPreviewModal');
        if (event.target === modal) {
            closeMediaPreview();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeMediaPreview();
            const fundingModal = document.getElementById('fundingModal');
            if (fundingModal.style.display === 'block') {
                fundingModal.style.display = 'none';
                currentPostId = null;
            }
        }
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
}

// Utility function to show notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `
        fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white z-50
        ${type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : type === 'error' ? 'bg-red-500' : 'bg-blue-500'}
        shadow-lg transform transition-all duration-300 notification
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Filter functionality for posts
function filterPosts(searchTerm) {
    const filteredData = postsData.filter(post => {
        const searchContent = `${post.name} ${post.tagline}`.toLowerCase();
        return searchContent.includes(searchTerm.toLowerCase());
    });
    renderMainTable(filteredData);
}

// Add search input event listener
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('input[type="text"]');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            filterPosts(e.target.value);
        });
    }
});

// Share functionality
function sharePost(postId) {
    const post = postsData.find(p => p.id === postId);
    if (!post) return;

    if (navigator.share) {
        navigator.share({
            title: post.name,
            text: post.tagline,
            url: post.url
        }).catch(console.error);
    } else {
        // Fallback copy to clipboard
        navigator.clipboard.writeText(post.url).then(() => {
            showNotification('Link copied to clipboard!', 'success');
        }).catch(() => {
            showNotification('Failed to copy link', 'error');
        });
    }
}

// Function to format dates relative to now
function formatRelativeDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString();
}

// Function to handle infinite scroll for comments
let isLoadingComments = false;
let currentPage = 1;

async function loadMoreComments(postId) {
    if (isLoadingComments) return;
    isLoadingComments = true;

    try {
        const response = await fetch('https://api.producthunt.com/v2/api/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${API_TOKEN}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                query: `
                    query {
                        post(id: "${postId}") {
                            comments(first: 10, after: "${currentPage * 10}") {
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
                `
            })
        });

        const data = await response.json();
        const newComments = data.data.post.comments.edges;
        
        if (newComments.length > 0) {
            const commentsContainer = document.querySelector('.comments-container');
            newComments.forEach(({node}) => {
                const commentElement = document.createElement('div');
                commentElement.className = 'border-b dark:border-gray-700 pb-6 last:border-0 last:pb-0';
                commentElement.innerHTML = `
                    <div class="flex justify-between items-start mb-2">
                        <span class="font-medium text-gray-900 dark:text-white">${node.user.name}</span>
                        <span class="text-sm text-gray-500 dark:text-gray-400">
                            ${formatRelativeDate(node.createdAt)}
                        </span>
                    </div>
                    <div class="text-gray-600 dark:text-gray-300 prose dark:prose-invert">
                        ${node.body}
                    </div>
                `;
                commentsContainer.appendChild(commentElement);
            });
            currentPage++;
        }
    } catch (error) {
        console.error('Error loading more comments:', error);
        showNotification('Error loading more comments', 'error');
    } finally {
        isLoadingComments = false;
    }
}

// Initialize Intersection Observer for infinite scroll
function initializeInfiniteScroll(postId) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                loadMoreComments(postId);
            }
        });
    }, { threshold: 0.5 });

    const sentinel = document.querySelector('.comments-sentinel');
    if (sentinel) {
        observer.observe(sentinel);
    }
}