let postsData = [];
let lastRefreshTime = new Date();
let activeModalTab = 'details';
let currentPostId = null;
let API_TOKEN = "fqthilF8Q-5yXTMJGW1x1CdYnvdcJM_cdeSbEh-BBdk";


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


// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await refreshData();
});

async function refreshData() {
    try {
        const data = await fetchPostsData();
        postsData = data;
        lastRefreshTime = new Date();
        currentPostId = null;
        updateRefreshTimestamp();
        renderMainTable(data);
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

function updateRefreshTimestamp() {
    const timestamp = document.getElementById('refreshTimestamp');
    timestamp.textContent = `Last updated: ${lastRefreshTime.toLocaleString()}`;
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
                                    <a href="${postDetails.url}" target="_blank" 
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
    // Modal close handlers
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