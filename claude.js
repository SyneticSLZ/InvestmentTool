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
// let activeFilters = {
//     dateRange: { start: '', end: '' },
//     investmentType: '',
//     region: ''
// };

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
    const filteredData = filterAndSortData(originalData);
    
    const mainContent = document.getElementById('mainContent');
    const fullHTML = `
    <div class="space-y-6">
        <!-- Enhanced Filters Section -->
<!-- Elegant Filters Section -->
<div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 transition-colors">
    <!-- Active Filters Bar -->
    <div class="flex items-center justify-between px-6 py-3 border-b dark:border-gray-700">
        <div class="flex items-center space-x-2">
            <span class="text-sm font-medium text-gray-500 dark:text-gray-400">Active Filters:</span>
            <div class="flex flex-wrap gap-2" id="activeFilterTags">
                <!-- Active filter tags will be inserted here -->
            </div>
        </div>
        <div class="flex items-center space-x-3">
            <button onclick="clearAllFilters()" class="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200">
                Clear All
            </button>
            <button onclick="toggleFilterPanel()" class="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium">
                <i class="fas fa-sliders-h mr-1"></i>
                Filters
            </button>
        </div>
    </div>

    <!-- Filter Panel (Initially Hidden) -->
    <div id="filterPanel" class="hidden">
        <div class="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
            <!-- Date Range Section -->
            <div class="space-y-4">
                <h3 class="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center">
                    <i class="far fa-calendar-alt mr-2"></i>
                    Date Range
                </h3>
                <div class="flex flex-wrap gap-2">
                    <button onclick="setQuickDateRange(7)" 
                            class="px-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        Last 7 days
                    </button>
                    <button onclick="setQuickDateRange(30)" 
                            class="px-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        Last 30 days
                    </button>
                    <button onclick="setQuickDateRange(90)" 
                            class="px-4 py-2 text-sm rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                        Last quarter
                    </button>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm text-gray-500 dark:text-gray-400 mb-1">From</label>
                        <input type="date" id="startDate" 
                               value="${activeFilters.dateRange.start}"
                               class="block w-full h-11 px-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors">
                    </div>
                    <div>
                        <label class="block text-sm text-gray-500 dark:text-gray-400 mb-1">To</label>
                        <input type="date" id="endDate" 
                               value="${activeFilters.dateRange.end}"
                               class="block w-full h-11 px-4 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors">
                    </div>
                </div>
            </div>

            <!-- Investment Type & Region Section -->
            <div class="space-y-6">
                <!-- Investment Type -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <i class="fas fa-chart-line mr-2"></i>
                        Investment Type
                    </label>
                    <div class="relative">
                        <select id="investmentType" 
                                class="block w-full h-11 pl-4 pr-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors appearance-none cursor-pointer">
                            <option value="">All Investment Types</option>
                            <option value="Seed" ${activeFilters.investmentType === 'seed' ? 'selected' : ''}>Seed</option>
                            <option value="Series A" ${activeFilters.investmentType === 'Series A' ? 'selected' : ''}>Series A</option>
                            <option value="Series B" ${activeFilters.investmentType === 'Series B' ? 'selected' : ''}>Series B</option>
                            <option value="Series C" ${activeFilters.investmentType === 'Series C' ? 'selected' : ''}>Series C</option>
                            <option value="Series D" ${activeFilters.investmentType === 'Series D' ? 'selected' : ''}>Series D</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-gray-500">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>

                <!-- Region -->
                <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        <i class="fas fa-globe mr-2"></i>
                        Region
                    </label>
                    <div class="relative">
                        <select id="region" 
                                class="block w-full h-11 pl-4 pr-10 rounded-lg border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-blue-500 focus:ring-blue-500 dark:focus:border-blue-400 dark:focus:ring-blue-400 transition-colors appearance-none cursor-pointer">
                            <option value="">All Regions</option>
                            <option value="America" ${activeFilters.region === 'America' ? 'selected' : ''}>America (USD)</option>
                            <option value="China" ${activeFilters.region === 'China' ? 'selected' : ''}>China (CNY)</option>
                            <option value="Europe" ${activeFilters.region === 'Europe' ? 'selected' : ''}>Europe (EUR)</option>
                            <option value="United Kingdom" ${activeFilters.region === 'United Kingdom' ? 'selected' : ''}>United Kingdom (GBP)</option>
                            <option value="Japan" ${activeFilters.region === 'Japan' ? 'selected' : ''}>Japan (JPY)</option>
                        </select>
                        <div class="absolute inset-y-0 right-0 flex items-center pr-4 pointer-events-none text-gray-400 dark:text-gray-500">
                            <i class="fas fa-chevron-down"></i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

        <!-- Table -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border dark:border-gray-700 overflow-hidden transition-colors">
            ${filteredData.length === 0 ? `
                <div class="p-12 text-center">
                    <p class="text-gray-600 dark:text-gray-300 text-lg mb-4">No results found for the selected filters</p>
                    <button onclick="resetFilters()" 
                            class="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-200 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                        Reset Filters
                    </button>
                </div>
            ` : `
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                    <thead class="bg-gray-50 dark:bg-gray-900">
                        <tr>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Company</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Date</th>
                            <th class="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Round</th>
                            <th class="px-6 py-4 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Amount</th>
                            <th class="px-6 py-4 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
                        ${filteredData.map(event => `
                            <tr class="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="flex items-center">
                                        <div class="flex-shrink-0 h-12 w-12">
                                            <img class="h-12 w-12 rounded-full object-cover border dark:border-gray-600" 
                                                 src="https://images.crunchbase.com/image/upload/c_pad,h_170,w_170,f_auto,b_white,q_auto:eco,dpr_1/${event.identifier.image_id}"
                                                 alt="${event.company_name}">
                                        </div>
                                        <div class="ml-4">
                                            <div class="text-sm font-medium text-gray-900 dark:text-white">
                                                ${event.funded_organization_identifier.value}
                                            </div>
                                            <div class="text-sm text-gray-500 dark:text-gray-400">
                                                ${event.short_description || ''}
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <div class="text-sm text-gray-900 dark:text-white">
                                        ${new Date(event.announced_on).toLocaleDateString()}
                                    </div>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap">
                                    <span class="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
                                        ${event.investment_type}
                                    </span>
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-900 dark:text-white">
                                    ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
                                </td>
                                <td class="px-6 py-4 whitespace-nowrap text-center">
                                    <button onclick="showFundingDetails('${event.uuid}')"
                                            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-blue-700 dark:text-blue-200 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-800 transition-colors">
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
    updateActiveFilterTags();

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
    
    // Re-render the main table with original data (it will be filtered inside renderMainTable)
    renderMainTable(originalData);
    
    // Update the filter tags
    updateActiveFilterTags();
}
function resetFilters() {
    activeFilters = {
        dateRange: { start: '', end: '' },
        investmentType: '',
        region: ''
    };
    clearAllFilters();
}

let activeFilters = {
    dateRange: { start: '', end: '' },
    investmentType: '',
    region: ''
};

// Toggle filter panel
function toggleFilterPanel() {
    const panel = document.getElementById('filterPanel');
    panel.classList.toggle('hidden');
}

function clearAllFilters() {
    if (document.getElementById('startDate')) document.getElementById('startDate').value = '';
    if (document.getElementById('endDate')) document.getElementById('endDate').value = '';
    if (document.getElementById('investmentType')) document.getElementById('investmentType').value = '';
    if (document.getElementById('region')) document.getElementById('region').value = '';
    updateFilters();
}

// Quick date range selector
function setQuickDateRange(days) {
    const end = new Date();
    const start = new Date();
    start.setDate(start.getDate() - days);
    
    document.getElementById('startDate').value = start.toISOString().split('T')[0];
    document.getElementById('endDate').value = end.toISOString().split('T')[0];
    
    updateFilters();
}

// // Update active filters
// function updateFilters() {
//     activeFilters = {
//         dateRange: {
//             start: document.getElementById('startDate').value,
//             end: document.getElementById('endDate').value
//         },
//         investmentType: document.getElementById('investmentType').value,
//         region: document.getElementById('region').value
//     };
    
//     updateActiveFilterTags();
//     // Trigger your data refresh here
// }

// Update active filter tags
function updateActiveFilterTags() {
    const container = document.getElementById('activeFilterTags');
    let tags = [];
    
    if (activeFilters.dateRange.start && activeFilters.dateRange.end) {
        tags.push(`
            <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                ${new Date(activeFilters.dateRange.start).toLocaleDateString()} - ${new Date(activeFilters.dateRange.end).toLocaleDateString()}
                <button onclick="removeDateFilter()" class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `);
    }
    
    if (activeFilters.investmentType) {
        tags.push(`
            <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                ${activeFilters.investmentType}
                <button onclick="removeInvestmentTypeFilter()" class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `);
    }
    
    if (activeFilters.region) {
        tags.push(`
            <span class="inline-flex items-center px-3 py-1 rounded-lg text-sm bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300">
                ${activeFilters.region}
                <button onclick="removeRegionFilter()" class="ml-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200">
                    <i class="fas fa-times"></i>
                </button>
            </span>
        `);
    }
    
    container.innerHTML = tags.join('');
}

// Remove individual filters
function removeDateFilter() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    updateFilters();
}

function removeInvestmentTypeFilter() {
    document.getElementById('investmentType').value = '';
    updateFilters();
}

function removeRegionFilter() {
    document.getElementById('region').value = '';
    updateFilters();
}

// Clear all filters
function clearAllFilters() {
    document.getElementById('startDate').value = '';
    document.getElementById('endDate').value = '';
    document.getElementById('investmentType').value = '';
    document.getElementById('region').value = '';
    updateFilters();
}

// Initialize event listeners
document.addEventListener('DOMContentLoaded', () => {
    const inputs = ['startDate', 'endDate', 'investmentType', 'region'];
    inputs.forEach(id => {
        document.getElementById(id).addEventListener('change', updateFilters);
    });
    updateFilters();
});


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

 // <script>
    //     // Toggle investor details
    //     function toggleInvestorDetails(uuid) {
    //         const detailsSection = document.getElementById(`investor-${uuid}-details`);
    //         const button = event.currentTarget;
    //         const icon = button.querySelector('i');
            
    //         if (detailsSection.classList.contains('hidden')) {
    //             detailsSection.classList.remove('hidden');
    //             icon.style.transform = 'rotate(180deg)';
    //         } else {
    //             detailsSection.classList.add('hidden');
    //             icon.style.transform = 'rotate(0deg)';
    //         }
    //     }
    // </script>

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

// function sendEmail(email, subject, body) {
//     // Implement email sending functionality
//     console.log(`Sending email to ${email}`);
//     showNotification('Email sent successfully!', 'success');
// }

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
// function composeEmail(email) {
//     const templateId = `email-template-${email.replace('@', '-at-')}`;
//     const template = document.getElementById(templateId);
    
//     if (template) {
//         template.classList.toggle('hidden');
//     }
// }



const API_BASE_URL = 'https://investmenttool.onrender.com'; // Replace with your server URL

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
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        ${contacts.map(contact => `
            <div class="bg-white dark:bg-gray-800 rounded-lg border dark:border-gray-700 p-5 hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-black/20 transition-all">
                <div class="flex justify-between items-start">
                    <div class="flex-1 min-w-0">
                        <h5 class="text-sm font-medium text-gray-900 dark:text-white truncate">
                            ${contact.first_name} ${contact.last_name}
                        </h5>
                        ${contact.position ? `
                            <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">${contact.position}</p>
                        ` : ''}
                        <p class="text-sm text-gray-500 dark:text-gray-400 mt-0.5">${contact.value}</p>
                        ${contact.confidence ? `
                            <div class="mt-2">
                                <div class="flex items-center">
                                    <div class="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                        <div 
                                            class="h-2 bg-${getConfidenceColor(contact.confidence)} dark:bg-${getConfidenceColor(contact.confidence)}/80 rounded-full transition-all" 
                                            style="width: ${contact.confidence}%">
                                        </div>
                                    </div>
                                    <span class="ml-2 text-xs text-gray-500 dark:text-gray-400">
                                        ${contact.confidence}%
                                    </span>
                                </div>
                            </div>
                        ` : ''}
                    </div>
                    <div class="flex space-x-3 ml-4">
                        ${contact.linkedin ? `
                            <a href="${contact.linkedin}"
                               target="_blank"
                               class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 transition-colors">
                                <i class="fab fa-linkedin text-lg"></i>
                            </a>
                        ` : ''}
                        <button onclick="composeEmail('${contact.value}', '${investorId}', '${contact.first_name}', '${contact.last_name}', '${contact.position || ''}')"
                                class="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 p-1 transition-colors">
                            <i class="fas fa-envelope text-lg"></i>
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

function openEmailModal(email, firstName, lastName, position) {
    const modal = document.getElementById('emailModal');
    const toInput = document.getElementById('emailTo');
    const subjectInput = document.getElementById('emailSubject');
    const bodyInput = document.getElementById('emailBody');
    const fromAccountDropdown = document.getElementById('emailFromAccount');
    
    const company = document.getElementById('modalTitle').textContent;
    
    toInput.value = email;
    subjectInput.value = campaignSettings.templates.defaultSubject.replace('{{company}}', company);
    
    let emailBody = campaignSettings.templates.emailTemplate
        .replace('{{name}}', firstName)
        .replace('{{company}}', company)
        .replace('{{title}}', position);
        
    emailBody = emailBody.replace('[Your Signature]', campaignSettings.templates.emailSignature);
    
    bodyInput.value = emailBody;
    
    // Set the from account if a default is available
    if (selectedGmailAccount && gmailAccounts.includes(selectedGmailAccount)) {
        fromAccountDropdown.value = selectedGmailAccount;
    }
    
    // Disable the send button if no Gmail account is selected
    const sendButton = document.getElementById('sendEmailBtn');
    sendButton.disabled = !fromAccountDropdown.value;
    
    // Add event listener to the dropdown to enable/disable the send button
    fromAccountDropdown.addEventListener('change', function() {
        sendButton.disabled = !this.value;
    });
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
}

function closeEmailModal() {
    const modal = document.getElementById('emailModal');
    modal.classList.remove('flex');
    modal.classList.add('hidden');
    document.body.style.overflow = '';
}

function toggleMediaUpload(type) {
    const panel = document.getElementById('mediaUploadPanel');
    const sidebar = document.getElementById('emailSidebar');
    
    if (panel.classList.contains('hidden')) {
        // Hide other panels
        document.getElementById('templatesPanel').classList.add('hidden');
        document.getElementById('signaturesPanel').classList.add('hidden');
        
        // Show media panel
        panel.classList.remove('hidden');
        sidebar.classList.remove('hidden');
    } else {
        panel.classList.add('hidden');
        sidebar.classList.add('hidden');
    }
}

function closeMediaUpload() {
    document.getElementById('mediaUploadPanel').classList.add('hidden');
    document.getElementById('emailSidebar').classList.add('hidden');
}

function showMediaPreview() {
    document.getElementById('mediaPreviewModal').classList.remove('hidden');
    document.getElementById('mediaPreviewModal').classList.add('flex');
}

function closeMediaPreview() {
    document.getElementById('mediaPreviewModal').classList.add('hidden');
    document.getElementById('mediaPreviewModal').classList.remove('flex');
}

function insertMedia() {
    // Insert media into email body
    closeMediaPreview();
}

// Sidebar toggle functions
function toggleSidebar(panelId) {
    const sidebar = document.getElementById('emailSidebar');
    const panel = document.getElementById(panelId);
    const allPanels = ['templatesPanel', 'signaturesPanel'];
    
    // If clicking the active panel, close sidebar
    if (!sidebar.classList.contains('hidden') && !panel.classList.contains('hidden')) {
        sidebar.classList.add('hidden');
        panel.classList.add('hidden');
        return;
    }
    
    // Show sidebar
    sidebar.classList.remove('hidden');
    
    // Hide all panels
    allPanels.forEach(p => {
        document.getElementById(p).classList.add('hidden');
    });
    
    // Show selected panel
    panel.classList.remove('hidden');
}

function toggleTemplates() {
    toggleSidebar('templatesPanel');
}

function toggleSignatures() {
    toggleSidebar('signaturesPanel');
}

function toggleAttachments() {
    const attachmentsPreview = document.getElementById('attachmentsPreview');
    attachmentsPreview.classList.toggle('hidden');
}
function generateOpening(position) {
    const investmentRoles = ['investor', 'partner', 'principal', 'associate', 'investment'];
    const isInvestmentRole = position && investmentRoles.some(role => position.toLowerCase().includes(role));
    
    if (isInvestmentRole) {
        return "given your investment expertise";
    } else if (position && position.toLowerCase().includes('founder')) {
        return "as a founder";
    } else if (position && position.toLowerCase().includes('ceo')) {
        return "as CEO";
    } else if (position) {
        return `given your role as ${position}`;
    }
    return "";
}

// Helper function to generate context based on funding round
function generateFundingContext(event) {
    const roundSize = formatCurrency(event.money_raised.value, event.money_raised.currency);
    const companyName = event.funded_organization_identifier.value;
    
    let roundContext = "";
    if (event.investment_type.toLowerCase().includes('seed')) {
        roundContext = `seed round of ${roundSize}`;
    } else if (event.investment_type.toLowerCase().includes('series')) {
        roundContext = `Series ${event.investment_type.slice(-1)} round of ${roundSize}`;
    } else {
        roundContext = `${event.investment_type} round of ${roundSize}`;
    }
    
    return {
        companyName,
        roundContext
    };
}
// Update the contact card click handler
// Function to compose email with contact details
// Helper function to get key company metrics
function getCompanyMetrics(crunchbaseData) {
    const fields = crunchbaseData?.cards?.fields || {};
    return {
        totalFunding: fields.total_funding_amount_usd || 4000000,
        fundingRounds: fields.funding_rounds || 1,
        employeeCount: fields.employee_count || 100,
        founded: fields.founded_on || '23.01.24',
        categories: fields.categories?.map(c => c.value) || [],
        location: fields.location_identifiers?.[0]?.value || 'America'
    };
}
 
// Helper function to generate investment history context
function generateInvestmentContext(companyMetrics) {
    let context = '';
    if (companyMetrics.totalFunding) {
        context += `having invested in companies with a total funding of ${formatCurrency(companyMetrics.totalFunding, 'USD')}`;
    }
    if (companyMetrics.fundingRounds) {
        context += ` across ${companyMetrics.fundingRounds} funding rounds`;
    }
    return context || 'with your impressive investment track record';
}

async function composeEmail(email, investorId, firstName, lastName, position) {
    const modal = document.getElementById('emailModal');
    const toInput = document.getElementById('emailTo');
    const subjectInput = document.getElementById('emailSubject');
    const bodyInput = document.getElementById('emailBody');
    
    // Find the current funding event and company data
    const event = fundingData.find(e => {
        return e.investor_identifiers.some(investor => investor.uuid === investorId);
    });
    
    // Get investor's company data
    const investor = event.investor_identifiers.find(inv => inv.uuid === investorId);
    let investorCompanyData = null;
    try {
        investorCompanyData = await fetchCrunchbaseEntity(
            investor.uuid,
            investor.entity_def_id === 'person' ? 'people' : 'organizations'
        );
    } catch (error) {
        console.error('Error fetching investor data:', error);
    }

    // Get funded company data
    let fundedCompanyData = null;
    try {
        fundedCompanyData = await fetchCrunchbaseEntity(event.funded_organization_identifier.uuid);
    } catch (error) {
        console.error('Error fetching company data:', error);
    }

    // Get metrics for both companies
    const investorMetrics = getCompanyMetrics(investorCompanyData);
    const fundedMetrics = getCompanyMetrics(fundedCompanyData);

    // Set recipient and subject
    toInput.value = email;
    subjectInput.value = "Do you want your Money back";

    // Generate company context
    const fundedCompanyContext = fundedMetrics.categories.length > 0 ? 
        `${event.funded_organization_identifier.value}, a ${fundedMetrics.categories[0]} company` :
        event.funded_organization_identifier.value;

    const roundSize = formatCurrency(event.money_raised.value, event.money_raised.currency);
    const roundUSD = event.money_raised.currency !== 'USD' ? 
        ` (${formatCurrency(event.money_raised.value_usd, 'USD')})` : '';

    // Generate investment context
    const investmentHistory = generateInvestmentContext(investorMetrics);

    // Generate personalized message
    const message = `Dear ${firstName},

I noticed your recent participation in ${fundedCompanyContext}'s ${event.investment_type} round of ${roundSize}${roundUSD}. ${investmentHistory}, I believe you have a keen eye for promising opportunities.

What caught my attention about ${event.funded_organization_identifier.value}:
• Founded in ${new Date(fundedMetrics.founded).getFullYear()}
• ${fundedMetrics.employeeCount || 'Growing'} team based in ${fundedMetrics.location}
• Operating in ${fundedMetrics.categories?.slice(0, 3).join(', ') || 'innovative technology sectors'}

I have a similar opportunity that I believe could offer even better returns. Our metrics show:
• 3x faster growth rate than industry average
• 85% customer retention rate
• Clear path to profitability within 18 months

Would you be open to a 15-minute call next week? I can share detailed metrics and our growth strategy.

Best regards,
Rob

P.S. I'm happy to sign an NDA before sharing detailed financials.`;

    bodyInput.value = message;
    
    // Show modal
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
    
    // Focus and select signature
    setTimeout(() => {
        bodyInput.focus();
        const lastBracketPos = bodyInput.value.lastIndexOf('[');
        if (lastBracketPos !== -1) {
            bodyInput.setSelectionRange(lastBracketPos, lastBracketPos + 10);
        }
    }, 100);
}

// Example usage:
// composeEmail('john.doe@example.com', 'investor123', 'John', 'Doe', 'Investment Partner');

// Add these helper functions if you haven't already
function getConfidenceColor(confidence) {
    if (confidence >= 80) return 'green-500';
    if (confidence >= 60) return 'blue-500';
    if (confidence >= 40) return 'yellow-500';
    return 'red-500';
}

// Send email function
async function sendEmail() {
    const toInput = document.getElementById('emailTo');
    const subjectInput = document.getElementById('emailSubject');
    const bodyInput = document.getElementById('emailBody');
    const fromAccountDropdown = document.getElementById('emailFromAccount');
    
    const mailboxId = fromAccountDropdown.value;
    
    if (!mailboxId) {
        showNotification('Please select a Gmail account to send from.', 'warning');
        return;
    }

    try {
        // Show sending notification
        showNotification('Sending email...', 'info');
        
        // Disable the send button while sending
        const sendButton = document.getElementById('sendEmailBtn');
        sendButton.disabled = true;
        sendButton.innerHTML = '<i class="fas fa-circle-notch fa-spin mr-2"></i> Sending...';
        
        // Call the API to send the email
        const response = await fetch(`${API_BASE_URL}/send-email-gmail`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                uuid: userUuid,
                mailboxId: mailboxId,
                to: toInput.value,
                subject: subjectInput.value,
                body: bodyInput.value
            })
        });
        
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Failed to send email');
        }
        
        showNotification('Email sent successfully!', 'success');
        closeEmailModal();
        
    } catch (error) {
        console.error('Error sending email:', error);
        showNotification('Failed to send email: ' + error.message, 'error');
        
        // Re-enable the send button
        const sendButton = document.getElementById('sendEmailBtn');
        sendButton.disabled = false;
        sendButton.innerHTML = '<i class="fab fa-google mr-2"></i> Send with Gmail';
    }
}
// Handle ESC key to close modal
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeEmailModal();
    }
});

// Close modal when clicking outside
document.getElementById('emailModal').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
        closeEmailModal();
    }
});

// Email composition toggle
// function composeEmail(email, investorId) {
//     const emailId = `email-compose-${email.replace('@', '-at-')}`;
//     const emailDiv = document.getElementById(emailId);
    
//     if (emailDiv) {
//         emailDiv.classList.toggle('hidden');
//     }
// }

// Send email function
// async function sendEmail(recipientEmail) {
//     // Get the email composition elements
//     const emailContainer = document.getElementById(`email-compose-${recipientEmail.replace('@', '-at-')}`);
//     const subjectInput = emailContainer.querySelector('input[type="text"]');
//     const messageInput = emailContainer.querySelector('textarea');

//     // Show loading state on the send button
//     const sendButton = emailContainer.querySelector('button');
//     const originalButtonText = sendButton.innerHTML;
//     sendButton.innerHTML = `
//         <div class="flex items-center justify-center">
//             <div class="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
//             <span class="ml-2">Sending...</span>
//         </div>
//     `;
//     sendButton.disabled = true;

//     try {
//         const response = await fetch(`${API_BASE_URL}/send-email`, {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({
//                 to: recipientEmail,
//                 subject: subjectInput.value,
//                 text: messageInput.value,
//                 // You might want to add these to your environment variables
//                 smtp: {
//                     host: 'smtp.gmail.com',
//                     port: 587,
//                     secure: false, // true for 465, false for other ports
//                     auth: {
//                         user: 'process.env.GMAIL_USER',
//                         pass: 'process.env.GMAIL_APP_PASSWORD' // Use App Password, not regular password
//                     }
//                 }
//             })
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const data = await response.json();

//         // Show success message
//         showNotification('Email sent successfully!', 'success');
        
//         // Reset form and hide email composition area
//         subjectInput.value = '';
//         messageInput.value = '';
//         emailContainer.classList.add('hidden');

//     } catch (error) {
//         console.error('Error sending email:', error);
//         showNotification('Failed to send email. Please try again.', 'error');
//     } finally {
//         // Reset button state
//         sendButton.innerHTML = originalButtonText;
//         sendButton.disabled = false;
//     }
// }
// Initialize the dashboard
document.addEventListener('DOMContentLoaded', async () => {
    setupEventListeners();
    await refreshData();
});