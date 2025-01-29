let fundingData = []
let lastRefreshTime = new Date();
let activeModalTab = 'details';
currentEventId = null
// Crunchbase data handling
const CRUNCHBASE_BASE_URL = 'https://api.crunchbase.com/api/v4';
let companyCache = {};

// Load cached data on startup
async function loadCachedData() {
    try {
        const cachedData = await window.fs.readFile('crunchbase_cache.json', { encoding: 'utf8' });
        companyCache = JSON.parse(cachedData);
    } catch (error) {
        console.log('No cache file found, starting fresh');
        companyCache = {};
    }
}

// Save cache to file
async function saveCacheToFile() {
    try {
        await window.fs.writeFile('crunchbase_cache.json', JSON.stringify(companyCache, null, 2));
    } catch (error) {
        console.error('Error saving cache:', error);
    }
}

// Fetch company data with caching
async function fetchCrunchbaseEntity(uuid, type = 'organizations') {
    try {
        const response = await fetch(`http://localhost:3000/entity/${type}/${uuid}`);
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
// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await refreshData();
});

async function refreshData() {
    try {
        const data = await fetchFundingData();
        fundingData = data
        lastRefreshTime = new Date();
        currentEventId = null
        updateRefreshTimestamp();
        renderMainTable(data);
    } catch (error) {
        console.log(error)
        showNotification('Error fetching data', 'error');
    }
}

async function fetchFundingData() {
    try {
        // Ensure we're returning an array
        if (Array.isArray(outputdata.results)) {
            return outputdata.results;
        } else {
            console.error('Data is not in expected format');
            return [];
        }
    } catch (error) {
        console.error('Error loading data:', error);
        return [];
    }
}

function updateRefreshTimestamp() {
    const timestamp = document.getElementById('refreshTimestamp');
    timestamp.textContent = `Last updated: ${lastRefreshTime.toLocaleString()}`;
}

// function renderMainTable(data) {
//     const mainContent = document.getElementById('mainContent');
    
//     const tableHTML = `
//         <div class="bg-white rounded-xl shadow-sm overflow-hidden">
//             <div class="overflow-x-auto">
//                 <table class="min-w-full divide-y divide-gray-200">
//                     <thead class="bg-gray-50">
//                         <tr>
//                             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
//                             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
//                             <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
//                             <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
//                             <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody class="bg-white divide-y divide-gray-200">
//                         ${data.map(event => `
//                             <tr class="hover:bg-gray-50 transition-colors">
//                                 <td class="px-6 py-4 whitespace-nowrap">
//                                     <div class="flex items-center">
//                                         <div class="flex-shrink-0 h-10 w-10">
//                                     <img class="h-12 w-12 rounded-full object-cover" 
//                                      src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${event.identifier.image_id}"
//                                      alt="${event.company_name}">
//                                         </div>
//                                         <div class="ml-4">
//                                             <div class="text-sm font-medium text-gray-900">
//                                                 ${event.funded_organization_identifier.value}
//                                             </div>
//                                             <div class="text-sm text-gray-500">
//                                                 ${event.short_description || ''}
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </td>
//                                 <td class="px-6 py-4 whitespace-nowrap">
//                                     <div class="text-sm text-gray-900">
//                                         ${new Date(event.announced_on).toLocaleDateString()}
//                                     </div>
//                                 </td>
//                                 <td class="px-6 py-4 whitespace-nowrap">
//                                     <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//                                         ${event.investment_type}
//                                     </span>
//                                 </td>
//                                 <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
//                                     ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
//                                 </td>
//                                 <td class="px-6 py-4 whitespace-nowrap text-center">
//                                     <button onclick="showFundingDetails('${event.uuid}')"
//                                             class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
//                                         View Details
//                                     </button>
//                                 </td>
//                             </tr>
//                         `).join('')}
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     `;
    
//     mainContent.innerHTML = tableHTML;
// }

// function showFundingDetails(eventId) {
//     const event = fundingData.find(e => e.uuid === eventId);
//     if (!event) return;

//      // Set the current event ID when showing details
//      currentEventId = eventId;

//     const modal = document.getElementById('fundingModal');
//     document.getElementById('modalTitle').textContent = event.company_name;
    
// // Reset to details tab when opening modal
// activeModalTab = 'details';
    
// // Reset tab styling
// document.querySelectorAll('.modal-tab').forEach(t => {
//     if (t.getAttribute('data-tab') === 'details') {
//         t.classList.add('active', 'bg-blue-100', 'text-blue-700');
//         t.classList.remove('text-gray-500', 'hover:text-gray-700');
//     } else {
//         t.classList.remove('active', 'bg-blue-100', 'text-blue-700');
//         t.classList.add('text-gray-500', 'hover:text-gray-700');
//     }
// });

// updateModalContent(event);
// modal.style.display = 'block';
// }

// Global state for filters


// Global state for filters
let activeFilters = {
    dateRange: { start: '', end: '' },
    investmentType: '',
    region: ''
};

// Store original data
let originalData = [];

// Currency to region mapping
const CURRENCY_REGIONS = {
    'USD': 'America',
    'CNY': 'China',
    'EUR': 'Europe',
    'GBP': 'United Kingdom',
    'JPY': 'Japan'
};

function filterAndSortData(data) {
    return data
        .filter(event => {
            // Date filter
            if (activeFilters.dateRange.start || activeFilters.dateRange.end) {
                const eventDate = new Date(event.announced_on);
                const startDate = activeFilters.dateRange.start ? new Date(activeFilters.dateRange.start) : null;
                const endDate = activeFilters.dateRange.end ? new Date(activeFilters.dateRange.end) : null;
                
                if (startDate && eventDate < startDate) return false;
                if (endDate && eventDate > endDate) return false;
            }
            
            // Investment type filter
            if (activeFilters.investmentType && event.investment_type.toLowerCase() !== activeFilters.investmentType.toLowerCase()) {
                return false;
            }
            
            // Region/Currency filter
            if (activeFilters.region) {
                const eventRegion = CURRENCY_REGIONS[event.money_raised.currency];
                if (eventRegion !== activeFilters.region) {
                    return false;
                }
            }
            
            return true;
        })
        // Sort by date (newest first)
        .sort((a, b) => new Date(b.announced_on) - new Date(a.announced_on));
}

function updateFilters() {
    activeFilters = {
        dateRange: {
            start: document.getElementById('startDate')?.value || '',
            end: document.getElementById('endDate')?.value || ''
        },
        investmentType: document.getElementById('investmentType')?.value || '',
        region: document.getElementById('region')?.value || ''
    };
    
    // Re-render table with filtered data
    renderMainTable(originalData);
}

function renderMainTable(data) {
    // Store original data if this is first render
    if (!originalData.length) {
        originalData = data;
    }

    // Filter and sort the data
    const filteredData = filterAndSortData(data);
    
    const mainContent = document.getElementById('mainContent');
    const fullHTML = `
        <div class="space-y-4">
            <!-- Filters -->
            <div class="bg-white rounded-xl shadow-sm p-4">
                <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <!-- Date Range Filters -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                        <input type="date" id="startDate" 
                               value="${activeFilters.dateRange.start}"
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                        <input type="date" id="endDate" 
                               value="${activeFilters.dateRange.end}"
                               class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    </div>
                    
                    <!-- Investment Type Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Investment Type</label>
                        <select id="investmentType" 
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                            <option value="">All Types</option>
                            <option value="Seed" ${activeFilters.investmentType === 'seed' ? 'selected' : ''}>Seed</option>
                            <option value="Series A" ${activeFilters.investmentType === 'Series A' ? 'selected' : ''}>Series A</option>
                            <option value="Series B" ${activeFilters.investmentType === 'Series B' ? 'selected' : ''}>Series B</option>
                            <option value="Series C" ${activeFilters.investmentType === 'Series C' ? 'selected' : ''}>Series C</option>
                            <option value="Series D" ${activeFilters.investmentType === 'Series D' ? 'selected' : ''}>Series D</option>
                        </select>
                    </div>
                    
                    <!-- Region/Currency Filter -->
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Region</label>
                        <select id="region" 
                                class="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                            <option value="">All Regions</option>
                            <option value="America" ${activeFilters.region === 'America' ? 'selected' : ''}>America (USD)</option>
                            <option value="China" ${activeFilters.region === 'China' ? 'selected' : ''}>China (CNY)</option>
                            <option value="Europe" ${activeFilters.region === 'Europe' ? 'selected' : ''}>Europe (EUR)</option>
                            <option value="United Kingdom" ${activeFilters.region === 'United Kingdom' ? 'selected' : ''}>United Kingdom (GBP)</option>
                            <option value="Japan" ${activeFilters.region === 'Japan' ? 'selected' : ''}>Japan (JPY)</option>
                        </select>
                    </div>
                </div>
            </div>

            <!-- Table -->
            <div class="bg-white rounded-xl shadow-sm overflow-hidden">
                            ${filteredData.length === 0 ? `
                    <div class="p-8 text-center">
                        <p class="text-gray-500 text-lg">No results found for the selected filters</p>
                        <button onclick="resetFilters()" class="mt-4 px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200 transition-colors">
                            Reset Filters
                        </button>
                    </div>
                ` : `
                <div class="overflow-x-auto">
                    <table class="min-w-full divide-y divide-gray-200">
                        <thead class="bg-gray-50">
                            <tr>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody class="bg-white divide-y divide-gray-200">
                            ${filteredData.map(event => `
                                <tr class="hover:bg-gray-50 transition-colors">
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="flex items-center">
                                            <div class="flex-shrink-0 h-10 w-10">
                                                <img class="h-12 w-12 rounded-full object-cover" 
                                                     src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${event.identifier.image_id}"
                                                     alt="${event.company_name}">
                                            </div>
                                            <div class="ml-4">
                                                <div class="text-sm font-medium text-gray-900">
                                                    ${event.funded_organization_identifier.value}
                                                </div>
                                                <div class="text-sm text-gray-500">
                                                    ${event.short_description || ''}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <div class="text-sm text-gray-900">
                                            ${new Date(event.announced_on).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                            ${event.investment_type}
                                        </span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900">
                                        ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-center">
                                        <button onclick="showFundingDetails('${event.uuid}')"
                                                class="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                                            View Details
                                        </button>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
                `}
            </div>
        </div>
    `;
    
    mainContent.innerHTML = fullHTML;

    // Add event listeners after DOM is updated
    requestAnimationFrame(() => {
        document.getElementById('startDate')?.addEventListener('change', updateFilters);
        document.getElementById('endDate')?.addEventListener('change', updateFilters);
        document.getElementById('investmentType')?.addEventListener('change', updateFilters);
        document.getElementById('region')?.addEventListener('change', updateFilters);
    });
}
function resetFilters() {
    activeFilters = {
        dateRange: { start: '', end: '' },
        investmentType: '',
        region: ''
    };
    renderMainTable(originalData);
}

async function showFundingDetails(eventId) {
    const event = fundingData.find(e => e.uuid === eventId);
    if (!event) return;

    // Set the current event ID
    currentEventId = eventId;
    
    const modal = document.getElementById('fundingModal');
    const modalContent = document.getElementById('modalContent');
    document.getElementById('modalTitle').textContent = event.funded_organization_identifier.value;
    
    // Show loading state
    modalContent.innerHTML = `
        <div class="flex items-center justify-center p-12">
            <div class="flex flex-col items-center space-y-4">
                <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                <p class="text-gray-500">Loading company data...</p>
            </div>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Update content based on active tab
    await updateModalContent(event);
}

// function updateModalContent(event) {
//     const modalContent = document.getElementById('modalContent');
    
//     if (activeModalTab === 'details') {
//         // 
//         modalContent.innerHTML = generateDetailsTab(event);
//     } else {
        
//         modalContent.innerHTML = generateInvestorsTab(event);
        
//     }
// }

async function updateModalContent(event) {
    const modalContent = document.getElementById('modalContent');
    
    try {
        if (activeModalTab === 'details') {
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

// function generateDetailsTab(event) {
//     // Get company info from the funded_organization_identifier
//     const company = event.funded_organization_identifier;
    
//     return `
//         <div class="space-y-6">
//             <div class="bg-gray-50 rounded-xl p-6">
//                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div class="space-y-4">
//                         <div class="flex items-start space-x-4">
//                             ${company.image_id ? `
//                                 <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${company.image_id}" 
//                                      alt="${company.value}"
//                                      class="w-16 h-16 rounded-lg object-cover">
//                             ` : ''}
//                             <div>
//                                 <h3 class="text-xl font-bold text-gray-900">${company.value}</h3>
//                                 ${company.permalink ? `
//                                     <a href="https://crunchbase.com/organization/${company.permalink}" 
//                                        target="_blank"
//                                        class="text-sm text-blue-600 hover:text-blue-800">
//                                         View on Crunchbase
//                                     </a>
//                                 ` : ''}
//                             </div>
//                         </div>
//                     </div>
//                     <div class="space-y-4">
//                         <div>
//                             <h3 class="text-sm font-medium text-gray-500">Round Details</h3>
//                             <div class="mt-2 grid grid-cols-2 gap-4">
//                                 <div>
//                                     <p class="text-sm font-medium text-gray-500">Amount Raised</p>
//                                     <p class="text-lg font-semibold text-gray-900">
//                                         ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
//                                     </p>
//                                     <p class="text-sm text-gray-500">
//                                         USD ${formatCurrency(event.money_raised.value_usd, 'USD')}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p class="text-sm font-medium text-gray-500">Round Type</p>
//                                     <p class="text-lg font-semibold text-gray-900 capitalize">
//                                         ${event.investment_type}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p class="text-sm font-medium text-gray-500">Announcement Date</p>
//                                     <p class="text-lg font-semibold text-gray-900">
//                                         ${new Date(event.announced_on).toLocaleDateString()}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     `;
// }

// Generate the details tab content with Crunchbase data
// async function generateDetailsTab(event) {
//     const company = event.funded_organization_identifier;
//     let crunchbaseData = null;
    
//     try {
//         crunchbaseData = await fetchCrunchbaseEntity(company.uuid);
//     } catch (error) {
//         console.error('Error fetching company details:', error);
//     }

//     const fields = crunchbaseData?.cards?.fields || {};

//     return `
//         <div class="space-y-6">
//             <div class="bg-gray-50 rounded-xl p-6">
//                 <!-- Company Header -->
//                 <div class="flex items-start space-x-6">
//                     ${company.image_id ? `
//                         <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${company.image_id}" 
//                              alt="${company.value}"
//                              class="w-24 h-24 rounded-xl object-cover flex-shrink-0">
//                     ` : ``}
//                     <div class="flex-1">
//                         <div class="flex items-start justify-between">
//                             <div>
//                                 <h2 class="text-2xl font-bold text-gray-900">${company.value}</h2>
//                                 ${fields.short_description ? `
//                                     <p class="mt-2 text-gray-600">${fields.short_description}</p>
//                                 ` : ''}
//                             </div>
//                             <div class="flex space-x-3">
//                                 ${fields.linkedin?.value ? `
//                                     <a href="${fields.linkedin.value}" 
//                                        target="_blank"
//                                        class="text-blue-600 hover:text-blue-800">
//                                         <i class="fab fa-linkedin text-xl"></i>
//                                     </a>
//                                 ` : ''}
//                                 ${fields.website_url ? `
//                                     <a href="${fields.website_url}" 
//                                        target="_blank"
//                                        class="text-blue-600 hover:text-blue-800">
//                                         <i class="fas fa-globe text-xl"></i>
//                                     </a>
//                                 ` : ''}
//                             </div>
//                         </div>
                        
//                         <!-- Company Quick Stats -->
//                         <div class="mt-4 flex flex-wrap gap-4">
//                             ${fields.founded_on ? `
//                                 <div class="flex items-center text-sm text-gray-500">
//                                     <i class="far fa-calendar mr-2"></i>
//                                     Founded ${new Date(fields.founded_on).getFullYear()}
//                                 </div>
//                             ` : ''}
//                             ${fields.employee_count ? `
//                                 <div class="flex items-center text-sm text-gray-500">
//                                     <i class="far fa-users mr-2"></i>
//                                     ${fields.employee_count} employees
//                                 </div>
//                             ` : ''}
//                         </div>
//                     </div>
//                 </div>

//                 <!-- Funding Information -->
//                 <div class="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
//                     <div>
//                         <h3 class="text-lg font-semibold text-gray-900 mb-4">Current Round Details</h3>
//                         <div class="bg-white rounded-lg p-4 space-y-4">
//                             <div>
//                                 <p class="text-sm text-gray-500">Amount Raised</p>
//                                 <div class="flex items-baseline space-x-2">
//                                     <p class="text-2xl font-bold text-gray-900">
//                                         ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
//                                     </p>
//                                     <p class="text-sm text-gray-500">
//                                         (${formatCurrency(event.money_raised.value_usd, 'USD')})
//                                     </p>
//                                 </div>
//                             </div>
//                             <div class="grid grid-cols-2 gap-4">
//                                 <div>
//                                     <p class="text-sm text-gray-500">Round Type</p>
//                                     <p class="text-lg font-semibold text-gray-900 capitalize">
//                                         ${event.investment_type}
//                                     </p>
//                                 </div>
//                                 <div>
//                                     <p class="text-sm text-gray-500">Announced Date</p>
//                                     <p class="text-lg font-semibold text-gray-900">
//                                         ${formatDate(event.announced_on)}
//                                     </p>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>

//                     <!-- Company Metrics -->
//                     <div>
//                         <h3 class="text-lg font-semibold text-gray-900 mb-4">Company Metrics</h3>
//                         <div class="bg-white rounded-lg p-4">
//                             <div class="grid grid-cols-2 gap-4">
//                                 ${fields.total_funding_amount_usd ? `
//                                     <div>
//                                         <p class="text-sm text-gray-500">Total Funding</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${formatCurrency(fields.total_funding_amount_usd, 'USD')}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                                 ${fields.funding_rounds ? `
//                                     <div>
//                                         <p class="text-sm text-gray-500">Funding Rounds</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${fields.funding_rounds}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                                 ${fields.exit_valuation_usd ? `
//                                     <div class="col-span-2">
//                                         <p class="text-sm text-gray-500">Exit Valuation</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${formatCurrency(fields.exit_valuation_usd, 'USD')}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <!-- Location Information -->
//                 ${fields.location_identifiers ? `
//                     <div class="mt-6">
//                         <h3 class="text-lg font-semibold text-gray-900 mb-3">Location</h3>
//                         <div class="flex flex-wrap gap-2">
//                             ${fields.location_identifiers.map(location => `
//                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
//                                     ${location.value}
//                                     ${location.location_type ? `
//                                         <span class="ml-1 text-blue-500 text-xs">(${location.location_type})</span>
//                                     ` : ''}
//                                 </span>
//                             `).join('')}
//                         </div>
//                     </div>
//                 ` : ''}

//                 <!-- Categories/Industries -->
//                 ${fields.categories ? `
//                     <div class="mt-6">
//                         <h3 class="text-lg font-semibold text-gray-900 mb-3">Categories</h3>
//                         <div class="flex flex-wrap gap-2">
//                             ${fields.categories.map(category => `
//                                 <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-50 text-green-700">
//                                     ${category.value}
//                                 </span>
//                             `).join('')}
//                         </div>
//                     </div>
//                 ` : ''}
//             </div>
//         </div>
//     `;
// }

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
        <div class="space-y-6">
            <div class="bg-gray-50 rounded-xl p-6">
                <!-- Company Header -->
                <div class="flex items-start space-x-6">
                    ${company.image_id ? `
                        <img src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${company.image_id}" 
                             alt="${company.value}"
                             class="w-24 h-24 rounded-xl object-cover flex-shrink-0">
                    ` : `
                        <div class="w-24 h-24 rounded-xl bg-gray-200 flex items-center justify-center flex-shrink-0">
                            <span class="text-3xl font-semibold text-gray-400">
                                ${company.value.charAt(0)}
                            </span>
                        </div>
                    `}
                    <div class="flex-1">
                        <div class="flex items-start justify-between">
                            <div>
                                <h2 class="text-2xl font-bold text-gray-900">${company.value}</h2>
                                ${fields.short_description ? `
                                    <p class="mt-2 text-gray-600">${fields.short_description}</p>
                                ` : ''}
                            </div>
                            <div class="flex space-x-3">
                                ${fields.linkedin?.value ? `
                                    <a href="${fields.linkedin.value}" 
                                       target="_blank"
                                       class="text-blue-600 hover:text-blue-800">
                                        <i class="fab fa-linkedin text-xl"></i>
                                    </a>
                                ` : ''}
                                ${fields.twitter?.value ? `
                                    <a href="https://twitter.com/${fields.twitter.value}" 
                                       target="_blank"
                                       class="text-blue-400 hover:text-blue-600">
                                        <i class="fab fa-twitter text-xl"></i>
                                    </a>
                                ` : ''}
                                ${fields.website_url ? `
                                    <a href="${fields.website_url}" 
                                       target="_blank"
                                       class="text-blue-600 hover:text-blue-800">
                                        <i class="fas fa-globe text-xl"></i>
                                    </a>
                                ` : ''}
                            </div>
                        </div>

                        <!-- Company Quick Stats -->
                        <div class="mt-4 flex flex-wrap gap-4">
                            ${fields.created_at ? `
                                <div class="flex items-center text-sm text-gray-500">
                                    <i class="far fa-calendar mr-2"></i>
                                    Founded ${new Date(fields.created_at).toLocaleDateString()}
                                </div>
                            ` : ''}
                            ${fields.last_funding_date ? `
                                <div class="flex items-center text-sm text-gray-500">
                                    <i class="fas fa-money-bill mr-2"></i>
                                    Last Funding ${new Date(fields.last_funding_date).toLocaleDateString()}
                                </div>
                            ` : ''}
                        </div>
                    </div>
                </div>

                <!-- Current Funding Round -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Current Funding Round</h3>
                    <div class="bg-white rounded-lg p-6 shadow-sm">
                        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div>
                                <p class="text-sm text-gray-500">Amount Raised</p>
                                <div class="flex items-baseline space-x-2">
                                    <p class="text-2xl font-bold text-gray-900">
                                        ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
                                    </p>
                                    ${event.money_raised.currency !== 'USD' ? `
                                        <p class="text-sm text-gray-500">
                                            (${formatCurrency(event.money_raised.value_usd, 'USD')})
                                        </p>
                                    ` : ''}
                                </div>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Round Type</p>
                                <p class="text-xl font-semibold text-gray-900 capitalize">
                                    ${event.investment_type}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Announcement Date</p>
                                <p class="text-xl font-semibold text-gray-900">
                                    ${new Date(event.announced_on).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Organization Metrics -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Organization Metrics</h3>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <!-- Rankings -->
                        <div class="bg-white rounded-lg p-6 shadow-sm">
                            <h4 class="text-sm font-medium text-gray-500 mb-4">Rankings</h4>
                            <div class="grid grid-cols-2 gap-4">
                                <div>
                                    <p class="text-sm text-gray-500">Organization Rank</p>
                                    <p class="text-lg font-semibold text-gray-900">
                                        ${fields.rank_org || 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">Company Rank</p>
                                    <p class="text-lg font-semibold text-gray-900">
                                        ${fields.rank_org_company || 'N/A'}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <!-- Performance Changes -->
                        <div class="bg-white rounded-lg p-6 shadow-sm">
                            <h4 class="text-sm font-medium text-gray-500 mb-4">Recent Performance</h4>
                            <div class="grid grid-cols-3 gap-4">
                                <div>
                                    <p class="text-sm text-gray-500">7 Days</p>
                                    <p class="text-lg font-semibold ${fields.rank_delta_d7 > 0 ? 'text-green-600' : 'text-red-600'}">
                                        ${fields.rank_delta_d7 ? `${fields.rank_delta_d7.toFixed(1)}%` : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">30 Days</p>
                                    <p class="text-lg font-semibold ${fields.rank_delta_d30 > 0 ? 'text-green-600' : 'text-red-600'}">
                                        ${fields.rank_delta_d30 ? `${fields.rank_delta_d30.toFixed(1)}%` : 'N/A'}
                                    </p>
                                </div>
                                <div>
                                    <p class="text-sm text-gray-500">90 Days</p>
                                    <p class="text-lg font-semibold ${fields.rank_delta_d90 > 0 ? 'text-green-600' : 'text-red-600'}">
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
                        <h3 class="text-lg font-semibold text-gray-900 mb-4">Location</h3>
                        <div class="bg-white rounded-lg p-6 shadow-sm">
                            <div class="flex flex-wrap gap-2">
                                ${fields.location_identifiers.map(location => `
                                    <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                        ${location.value}
                                        ${location.location_type ? `
                                            <span class="ml-1 text-blue-500 text-xs">(${location.location_type})</span>
                                        ` : ''}
                                    </span>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}

                <!-- Additional Information -->
                <div class="mt-8">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
                    <div class="bg-white rounded-lg p-6 shadow-sm">
                        <div class="grid grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">Created</p>
                                <p class="text-sm font-medium text-gray-900">
                                    ${new Date(fields.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Last Updated</p>
                                <p class="text-sm font-medium text-gray-900">
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
                    <div class="investor-card bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
                        <div class="flex items-start justify-between">
                            <div class="flex items-start space-x-4">
                                ${investor.image_id ? `
                                    <img class="h-16 w-16 rounded-xl object-cover" 
                                         src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${investor.image_id}"
                                         alt="${properties.value}">
                                ` : `
                                    <div class="h-16 w-16 rounded-xl bg-gray-100 flex items-center justify-center">
                                        <span class="text-xl font-semibold text-gray-400">
                                            ${investor.value.charAt(0)}
                                        </span>
                                    </div>
                                `}
                                <div class="flex-1">
                                    <div class="flex items-start justify-between">
                                        <div>
                                            <h3 class="text-xl font-semibold text-gray-900">${investor.value}</h3>
                                            <p class="text-sm text-gray-500 capitalize">
                                                ${investor.role || 'Investor'} · ${investor.entity_def_id}
                                            </p>
                                        </div>
                                    </div>
                                    ${fields.short_description ? `
                                        <p class="mt-2 text-sm text-gray-600">
                                            ${fields.short_description}
                                        </p>
                                    ` : ''}
                                </div>
                            </div>
                            <div class="flex items-start space-x-3">
                                ${fields.linkedin?.value ? `
                                    <a href="${fields.linkedin.value}" 
                                       target="_blank"
                                       class="text-blue-600 hover:text-blue-800">
                                        <i class="fab fa-linkedin text-xl"></i>
                                    </a>
                                ` : ''}
                                ${fields.twitter?.value ? `
                                    <a href="https://twitter.com/${fields.twitter.value}" 
                                       target="_blank"
                                       class="text-blue-400 hover:text-blue-600">
                                        <i class="fab fa-twitter text-xl"></i>
                                    </a>
                                ` : ''}
                                ${fields.website_url ? `
                                    <a href="${fields.website_url}" 
                                       target="_blank"
                                       class="text-blue-600 hover:text-blue-800">
                                        <i class="fas fa-globe text-xl"></i>
                                    </a>
                                ` : ''}
                                <button onclick="toggleInvestorDetails('${investor.uuid}')"
                                        class="text-gray-400 hover:text-gray-600">
                                    <i class="fas fa-chevron-down"></i>
                                </button>
                            </div>
                        </div>
                        
                        <!-- Expandable Details Section -->
                        <div id="investor-${investor.uuid}-details" class="hidden mt-6">
                            <div class="border-t pt-4">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <!-- Company Stats -->
                                    <div class="space-y-4">
                                        <h4 class="text-sm font-medium text-gray-500">Organization Stats</h4>
                                        <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
                                            <div>
                                                <p class="text-sm text-gray-500">Org Rank</p>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    ${fields.rank_org || 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">Principal Rank</p>
                                                <p class="text-lg font-semibold text-gray-900">
                                                    ${fields.rank_principal || 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <!-- Recent Performance -->
                                    <div class="space-y-4">
                                        <h4 class="text-sm font-medium text-gray-500">Recent Performance</h4>
                                        <div class="grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-lg">
                                            <div>
                                                <p class="text-sm text-gray-500">7 Days</p>
                                                <p class="text-lg font-semibold ${fields.rank_delta_d7 > 0 ? 'text-green-600' : 'text-red-600'}">
                                                    ${fields.rank_delta_d7 ? `${fields.rank_delta_d7.toFixed(1)}%` : 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">30 Days</p>
                                                <p class="text-lg font-semibold ${fields.rank_delta_d30 > 0 ? 'text-green-600' : 'text-red-600'}">
                                                    ${fields.rank_delta_d30 ? `${fields.rank_delta_d30.toFixed(1)}%` : 'N/A'}
                                                </p>
                                            </div>
                                            <div>
                                                <p class="text-sm text-gray-500">90 Days</p>
                                                <p class="text-lg font-semibold ${fields.rank_delta_d90 > 0 ? 'text-green-600' : 'text-red-600'}">
                                                    ${fields.rank_delta_d90 ? `${fields.rank_delta_d90.toFixed(1)}%` : 'N/A'}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <!-- Location Information -->
                                ${fields.location_identifiers ? `
                                    <div class="mt-4">
                                        <h4 class="text-sm font-medium text-gray-500 mb-2">Location</h4>
                                        <div class="flex flex-wrap gap-2">
                                            ${fields.location_identifiers.map(location => `
                                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
                                                    ${location.value}
                                                </span>
                                            `).join('')}
                                        </div>
                                    </div>
                                ` : ''}

                                <!-- Additional Info -->
                                <div class="mt-4 space-y-2">
                                    <p class="text-sm text-gray-500">
                                        <span class="font-medium">Created:</span> 
                                        ${new Date(fields.created_at).toLocaleDateString()}
                                    </p>
                                    <p class="text-sm text-gray-500">
                                        <span class="font-medium">Last Updated:</span> 
                                        ${new Date(fields.updated_at).toLocaleDateString()}
                                    </p>
                                </div>

                                <!-- Contact Search Section -->
                                <div class="mt-6">
                                    <div class="flex justify-between items-center mb-4">
                                        <h4 class="text-sm font-medium text-gray-500">Contact Information</h4>
                                        <button onclick="searchContacts('${investor.uuid}', '${fields.website_url || ''}')"
                                                class="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
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

// function generateInvestorsTab(event) {
//     return `
//         <div class="space-y-6">
//             ${event.investor_identifiers.map(investor => `
//                 <div class="investor-card bg-white rounded-xl border p-6">
//                     <div class="flex items-start justify-between">
//                         <div class="flex items-start space-x-4">
//                             ${investor.image_id ? `
//                                 <img class="h-12 w-12 rounded-full object-cover" 
//                                      src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${investor.image_id}"
//                                      alt="${investor.value}">
//                             ` : `
//                                 <div class="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
//                                     <span class="text-lg font-semibold text-gray-500">
//                                         ${investor.value.charAt(0)}
//                                     </span>
//                                 </div>
//                             `}
//                             <div>
//                                 <h3 class="text-lg font-medium text-gray-900">${investor.value}</h3>
//                                 <p class="text-sm text-gray-500 capitalize">${investor.role || 'Investor'}</p>
//                                 ${investor.permalink ? `
//                                     <a href="https://crunchbase.com/${investor.entity_def_id}/${investor.permalink}" 
//                                        target="_blank"
//                                        class="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
//                                         View on Crunchbase
//                                     </a>
//                                 ` : ''}
//                             </div>
//                         </div>
//                         <button onclick="toggleInvestorDetails('${investor.uuid}')"
//                                 class="text-gray-400 hover:text-gray-600">
//                             <i class="fas fa-chevron-down"></i>
//                         </button>
//                     </div>
                    
//                     <div id="investor-${investor.uuid}-details" class="hidden mt-4">
//                         <div class="border-t pt-4 mt-4">
//                             <div class="space-y-4">
//                                 <!-- Investor Type Info -->
//                                 <div>
//                                     <h4 class="text-sm font-medium text-gray-500">Investor Type</h4>
//                                     <p class="text-sm text-gray-900 capitalize">${investor.entity_def_id}</p>
//                                 </div>
                                
//                                 <!-- Associated People Section -->
//                                 <div class="mt-6" id="contacts-${investor.uuid}">
//                                     <div class="flex justify-between items-center mb-4">
//                                         <h4 class="text-sm font-medium text-gray-500">Contact Information</h4>
//                                         <button onclick="fetchContacts('${investor.uuid}', '${investor.permalink}')"
//                                                 class="text-sm text-blue-600 hover:text-blue-800">
//                                             <i class="fas fa-sync-alt mr-1"></i>
//                                             Fetch Contacts
//                                         </button>
//                                     </div>
//                                     <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
//                                         <!-- Contact cards will be populated here -->
//                                         <div class="bg-gray-50 rounded-lg p-4">
//                                             <p class="text-sm text-gray-500">Click "Fetch Contacts" to load contact information</p>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             `).join('')}
//         </div>
//     `;
// }





// async function generateInvestorsTab(event) {
//     // Fetch Crunchbase data for all investors
//     const investorsWithData = await Promise.all(event.investor_identifiers.map(async investor => {
//         let crunchbaseData = null;
//         try {
//             crunchbaseData = await fetchCrunchbaseEntity(
//                 investor.uuid,
//                 investor.entity_def_id === 'person' ? 'people' : 'organizations'
//             );
//         } catch (error) {
//             console.error(`Error fetching data for investor ${investor.uuid}:`, error);
//         }
//         return { ...investor, crunchbaseData };
//     }));

//     return `
//         <div class="space-y-6">
//             <div class="bg-white rounded-lg p-4 mb-6">
//                 <div class="flex items-center justify-between">
//                     <h3 class="text-lg font-semibold text-gray-900">
//                         ${event.investor_identifiers.length} Investors
//                     </h3>
//                     <div class="flex space-x-2">
//                         <button onclick="exportInvestorData()"
//                                 class="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
//                             <i class="fas fa-download mr-2"></i>
//                             Export
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             ${investorsWithData.map(investor => {
//                 const fields = investor.crunchbaseData?.cards?.fields || {};
//                 return `
//                     <div class="investor-card bg-white rounded-xl border p-6 hover:shadow-md transition-shadow">
//                         <div class="flex items-start justify-between">
//                             <div class="flex items-start space-x-4">
//                                 ${investor.image_id ? `
//                                     <img class="h-16 w-16 rounded-xl object-cover" 
//                                          src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${investor.image_id}"
//                                          alt="${investor.value}">
//                                 ` : `
//                                     <div class="h-16 w-16 rounded-xl bg-gray-100 flex items-center justify-center">
//                                         <span class="text-xl font-semibold text-gray-400">
//                                             ${investor.value.charAt(0)}
//                                         </span>
//                                     </div>
//                                 `}
//                                 <div class="flex-1">
//                                     <div class="flex items-start justify-between">
//                                         <div>
//                                             <h3 class="text-xl font-semibold text-gray-900">${investor.value}</h3>
//                                             <p class="text-sm text-gray-500 capitalize">
//                                                 ${investor.role || 'Investor'} · ${investor.entity_def_id}
//                                             </p>
//                                         </div>
//                                     </div>
//                                     ${fields.short_description ? `
//                                         <p class="mt-2 text-sm text-gray-600">
//                                             ${fields.short_description}
//                                         </p>
//                                     ` : ''}
//                                 </div>
//                             </div>
//                             <div class="flex items-start space-x-3">
//                                 ${fields.linkedin?.value ? `
//                                     <a href="${fields.linkedin.value}" 
//                                        target="_blank"
//                                        class="text-blue-600 hover:text-blue-800">
//                                         <i class="fab fa-linkedin text-xl"></i>
//                                     </a>
//                                 ` : ''}
//                                 ${fields.website_url ? `
//                                     <a href="${fields.website_url}" 
//                                        target="_blank"
//                                        class="text-blue-600 hover:text-blue-800">
//                                         <i class="fas fa-globe text-xl"></i>
//                                     </a>
//                                 ` : ''}
//                                 <button onclick="toggleInvestorDetails('${investor.uuid}')"
//                                         class="text-gray-400 hover:text-gray-600">
//                                     <i class="fas fa-chevron-down"></i>
//                                 </button>
//                             </div>
//                         </div>
                        
//                         <!-- Expandable Details Section -->
//                         <div id="investor-${investor.uuid}-details" class="hidden mt-6">
//                             <div class="border-t pt-4">
//                                 <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <!-- Investment Activity -->
//                                     ${investor.entity_def_id === 'organization' ? `
//                                         <div class="space-y-4">
//                                             <h4 class="text-sm font-medium text-gray-500">Investment Activity</h4>
//                                             // Continuing the investor card template...
//                             <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                                 ${fields.num_investments ? `
//                                     <div>
//                                         <p class="text-sm text-gray-500">Investments</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${fields.num_investments}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                                 ${fields.num_portfolio_organizations ? `
//                                     <div>
//                                         <p class="text-sm text-gray-500">Portfolio Size</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${fields.num_portfolio_organizations}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                                 ${fields.num_exits ? `
//                                     <div>
//                                         <p class="text-sm text-gray-500">Exits</p>
//                                         <p class="text-lg font-semibold text-gray-900">
//                                             ${fields.num_exits}
//                                         </p>
//                                     </div>
//                                 ` : ''}
//                             </div>
//                         </div>
//                     ` : ''}

//                     <!-- Additional Information -->
//                     <div class="space-y-4">
//                         <h4 class="text-sm font-medium text-gray-500">Additional Information</h4>
//                         <div class="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
//                             ${fields.founded_on ? `
//                                 <div>
//                                     <p class="text-sm text-gray-500">Founded</p>
//                                     <p class="text-sm text-gray-900">
//                                         ${formatDate(fields.founded_on)}
//                                     </p>
//                                 </div>
//                             ` : ''}
//                             ${fields.operating_status ? `
//                                 <div>
//                                     <p class="text-sm text-gray-500">Status</p>
//                                     <p class="text-sm text-gray-900">
//                                         ${fields.operating_status}
//                                     </p>
//                                 </div>
//                             ` : ''}
//                         </div>
//                     </div>

//                     <!-- Location Information -->
//                     ${fields.location_identifiers ? `
//                         <div class="mt-4">
//                             <h4 class="text-sm font-medium text-gray-500 mb-2">Location</h4>
//                             <div class="flex flex-wrap gap-2">
//                                 ${fields.location_identifiers.map(location => `
//                                     <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-medium bg-blue-50 text-blue-700">
//                                         ${location.value}
//                                     </span>
//                                 `).join('')}
//                             </div>
//                         </div>
//                     ` : ''}

//                     <!-- Contact Search Section -->
//                     <div class="mt-6" id="contacts-${investor.uuid}">
//                         <div class="flex justify-between items-center mb-4">
//                             <h4 class="text-sm font-medium text-gray-500">Contact Information</h4>
//                             <button onclick="searchContacts('${investor.uuid}', '${fields.website_url || ''}')"
//                                     class="inline-flex items-center px-3 py-1 text-sm text-blue-600 hover:text-blue-800">
//                                 <i class="fas fa-search mr-2"></i>
//                                 Find Contacts
//                             </button>
//                         </div>
//                         <div id="contacts-list-${investor.uuid}" class="space-y-4">
//                             <!-- Contacts will be loaded here -->
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         `;
//     }).join('')}
//         </div>
//     `;
// }

// Email template generation
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

// function setupEventListeners() {
//     // Modal tab switching
//     document.querySelectorAll('.modal-tab').forEach(tab => {
//         tab.addEventListener('click', () => {
//             const tabName = tab.getAttribute('data-tab');
            
//             // Update active tab styling
//             document.querySelectorAll('.modal-tab').forEach(t => {
//                 t.classList.remove('active', 'bg-blue-100', 'text-blue-700');
//                 t.classList.add('text-gray-500', 'hover:text-gray-700');
//             });
//             tab.classList.add('active', 'bg-blue-100', 'text-blue-700');
//             tab.classList.remove('text-gray-500', 'hover:text-gray-700');
            
//             // Update content
//             activeModalTab = tabName;
//             const event = fundingData.find(e => e.uuid === currentEventId);
//             if (event) {
//                 updateModalContent(event);
//             }
//         });
//     });

//     // Modal close handlers
//     document.querySelectorAll('.close-modal').forEach(button => {
//         button.addEventListener('click', () => {
//             document.getElementById('fundingModal').style.display = 'none';
//         });
//     });

//     window.addEventListener('click', (event) => {
//         const modal = document.getElementById('fundingModal');
//         if (event.target === modal) {
//             modal.style.display = 'none';
//         }
//     });

//     // Refresh button
//     document.getElementById('refreshBtn').addEventListener('click', refreshData);
// }


// Load and cache handling
document.addEventListener('DOMContentLoaded', async () => {
    await loadCachedData();
    setupEventListeners();
    await refreshData();
});

// Update tab switching to handle async content
function setupEventListeners() {
    // Modal tab switching
    document.querySelectorAll('.modal-tab').forEach(tab => {
        tab.addEventListener('click', async () => {
            const tabName = tab.getAttribute('data-tab');
            
            // Show loading state
            document.getElementById('modalContent').innerHTML = `
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
            activeModalTab = tabName;
            const event = fundingData.find(e => e.uuid === currentEventId);
            if (event) {
                await updateModalContent(event);
            }
        });
    });

    // Other event listeners...
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', () => {
            document.getElementById('fundingModal').style.display = 'none';
            currentEventId = null;
        });
    });

    window.addEventListener('click', (event) => {
        const modal = document.getElementById('fundingModal');
        if (event.target === modal) {
            modal.style.display = 'none';
            currentEventId = null;
        }
    });

    // Refresh button
    document.getElementById('refreshBtn').addEventListener('click', refreshData);
}
// Utility functions
function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function sendEmail(email, subject, body) {
    // Implement email sending functionality
    console.log(`Sending email to ${email}`);
    showNotification('Email sent successfully!', 'success');
}

function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `
        fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white
        ${type === 'success' ? 'bg-green-500' : type === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}
        shadow-lg transform transition-all duration-300
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Optional: Add functionality to fetch company data from Crunchbase and contacts from Hunter.io
async function fetchCompanyData(companyName) {
    try {
        const response = await fetch(`/api/company/${encodeURIComponent(companyName)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching company data:', error);
        return null;
    }
}

async function fetchCompanyContacts(domain) {
    try {
        const response = await fetch(`/api/contacts/${encodeURIComponent(domain)}`);
        return await response.json();
    } catch (error) {
        console.error('Error fetching contacts:', error);
        return [];
    }
}

// Utility function to format dates
function formatDate(dateString) {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}

// Updated contact fetching with Hunter.io integration
async function fetchContacts(investorId, domain) {
    const contactsContainer = document.getElementById(`contacts-${investorId}`);
    
    try {
        contactsContainer.innerHTML = `
            <div class="flex items-center justify-center p-4">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        `;

        // Here you would integrate with Hunter.io API
        // For now, showing mock data
        const mockContacts = [
            {
                name: 'John Smith',
                title: 'Investment Director',
                email: 'john.smith@example.com',
                confidence: 90
            },
            {
                name: 'Sarah Johnson',
                title: 'Partner',
                email: 'sarah.j@example.com',
                confidence: 85
            }
        ];

        // Render contacts
        const contactsHTML = `
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                ${mockContacts.map(contact => `
                    <div class="bg-gray-50 rounded-lg p-4">
                        <div class="flex justify-between items-start">
                            <div>
                                <h5 class="text-sm font-medium text-gray-900">${contact.name}</h5>
                                <p class="text-sm text-gray-500">${contact.title}</p>
                                <p class="text-sm text-gray-500">${contact.email}</p>
                                <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 mt-1">
                                    ${contact.confidence}% confidence
                                </span>
                            </div>
                            <button onclick="composeEmail('${contact.email}')"
                                    class="text-blue-600 hover:text-blue-800 p-1">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </div>
                        
                        <!-- Email Template -->
                        <div class="mt-4 space-y-3 hidden" id="email-template-${contact.email.replace('@', '-at-')}">
                            <div>
                                <label class="block text-xs font-medium text-gray-500">Subject</label>
                                <input type="text" 
                                       class="mt-1 w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                                       value="Regarding your investment">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-500">Message</label>
                                <textarea class="mt-1 w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500" 
                                          rows="4">Dear ${contact.name},

I noticed your recent investment and wanted to connect regarding potential opportunities for collaboration.

Best regards,</textarea>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;

        contactsContainer.innerHTML = contactsHTML;
    } catch (error) {
        console.error('Error fetching contacts:', error);
        contactsContainer.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600">Error loading contacts. Please try again.</p>
            </div>
        `;
    }
}

// Email composition handling
function composeEmail(email) {
    const templateId = `email-template-${email.replace('@', '-at-')}`;
    const template = document.getElementById(templateId);
    
    if (template) {
        template.classList.toggle('hidden');
    }
}



const API_BASE_URL = 'http://localhost:3000'; // Replace with your server URL

async function searchContacts(investorId, websiteUrl) {
    if (!websiteUrl) {
        showNotification('No website available for contact search', 'warning');
        return;
    }

    const contactsContainer = document.getElementById(`contacts-list-${investorId}`);
    
    try {
        // Show loading state
        contactsContainer.innerHTML = `
            <div class="flex justify-center items-center py-8">
                <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            </div>
        `;

        // Extract domain from website URL
        const domain = new URL(websiteUrl).hostname.replace('www.', '');
        console.log(domain)

        // Make request to your server endpoint that handles Hunter.io API
        const response = await fetch(`${API_BASE_URL}/search-contacts`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ domain })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log(data.data.emails)
        const contacts = data.data.emails || [];

        if (contacts.length === 0) {
            contactsContainer.innerHTML = `
                <div class="bg-gray-50 rounded-lg p-4">
                    <p class="text-gray-500 text-center">No contacts found for this domain</p>
                </div>
            `;
            return;
        }

        // Generate HTML for contacts
        const contactsHTML = `
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            ${contacts.map(contact => `
                <div class="bg-white rounded-lg border p-4 hover:shadow-md transition-shadow">
                    <div class="flex justify-between items-start">
                        <div>
                            <h5 class="text-sm font-medium text-gray-900">
                                ${contact.first_name} ${contact.last_name}
                            </h5>
                            ${contact.position ? `
                                <p class="text-sm text-gray-500">${contact.position}</p>
                            ` : ''}
                            <p class="text-sm text-gray-500">${contact.value}</p>
                            ${contact.confidence ? `
                                <div class="mt-1">
                                    <div class="flex items-center">
                                        <div class="flex-1 h-2 bg-gray-200 rounded-full">
                                            <div 
                                                class="h-2 bg-${getConfidenceColor(contact.confidence)} rounded-full" 
                                                style="width: ${contact.confidence}%">
                                            </div>
                                        </div>
                                        <span class="ml-2 text-xs text-gray-500">
                                            ${contact.confidence}%
                                        </span>
                                    </div>
                                </div>
                            ` : ''}
                        </div>
                        <div class="flex space-x-2">
                            ${contact.linkedin ? `
                                <a href="${contact.linkedin}"
                                   target="_blank"
                                   class="text-blue-600 hover:text-blue-800 p-1">
                                    <i class="fab fa-linkedin"></i>
                                </a>
                            ` : ''}
                            <button onclick="composeEmail('${contact.value}', '${investorId}')"
                                    class="text-blue-600 hover:text-blue-800 p-1">
                                <i class="fas fa-envelope"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Email Composition Area (Hidden by default) -->
                    <div id="email-compose-${contact.value.replace('@', '-at-')}" class="hidden mt-4">
                        <div class="space-y-3">
                            <div>
                                <label class="block text-xs font-medium text-gray-500">Subject</label>
                                <input type="text" 
                                       class="mt-1 w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500"
                                       value="Regarding your investment opportunity">
                            </div>
                            <div>
                                <label class="block text-xs font-medium text-gray-500">Message</label>
                                <textarea 
                                    class="mt-1 w-full px-3 py-2 text-sm border rounded-md focus:ring-2 focus:ring-blue-500" 
                                    rows="4">Dear ${contact.first_name},

I noticed your recent investment and would love to connect regarding potential opportunities for collaboration.

Best regards,</textarea>
                            </div>
                            <button onclick="sendEmail('${contact.value}')"
                                    class="w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm transition-colors">
                                Send Email
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    contactsContainer.innerHTML = contactsHTML;

    } catch (error) {
        console.error('Error searching contacts:', error);
        contactsContainer.innerHTML = `
            <div class="bg-red-50 border border-red-200 rounded-lg p-4">
                <p class="text-red-600">Error finding contacts. Please try again.</p>
            </div>
        `;
    }
}

// Helper function to determine confidence level color
function getConfidenceColor(confidence) {
    if (confidence >= 80) return 'green-500';
    if (confidence >= 60) return 'yellow-500';
    return 'red-500';
}

// Email composition toggle
function composeEmail(email, investorId) {
    const emailId = `email-compose-${email.replace('@', '-at-')}`;
    const emailDiv = document.getElementById(emailId);
    
    if (emailDiv) {
        emailDiv.classList.toggle('hidden');
    }
}

// Send email function
async function sendEmail(email) {
    // Implement your email sending logic here
    showNotification(`Email would be sent to ${email}`, 'success');
}

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await refreshData();
});