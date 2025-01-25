// Mock data for email templates
// import { data } from './output.js'
let fundingData = [];

let lastRefreshTime = new Date();

function updateRefreshTimestamp() {
    const timestampEl = document.getElementById('refreshTimestamp');
    timestampEl.textContent = `Last updated: ${lastRefreshTime.toLocaleString()}`;
}


// Email template generation
function generateEmailTemplate(contact, event) {
    const template = mockEmailTemplates[0]; // Using first template as default
    return {
        subject: template.subject
            .replace('{company}', event.funded_organization_identifier.value)
            .replace('{name}', contact.name),
        body: template.body
            .replace('{company}', event.funded_organization_identifier.value)
            .replace('{name}', contact.name)
    };
}

// Store last refresh data
let lastRefreshData = [];

function refreshData() {
    lastRefreshData = [...fundingData];
    lastRefreshTime = new Date();
    initializeDashboard(fundingData);
    updateRefreshTimestamp();
}

function showLastRefreshData() {
    if (lastRefreshData.length > 0) {
        renderMainTable(lastRefreshData);
    }
}


const mockEmailTemplates = [
    {
        id: 1,
        name: "Initial Outreach",
        subject: "Congratulations on your recent investment in {company}",
        body: "Dear {name},\n\nI noticed your recent investment in {company} and wanted to connect..."
    },
    {
        id: 2,
        name: "Follow-up",
        subject: "Following up on {company} investment",
        body: "Hi {name},\n\nI hope you're having a great week. I wanted to follow up..."
    },
    {
        id: 3,
        name: "Partnership Proposal",
        subject: "Potential synergy with {company}",
        body: "Dear {name},\n\nGiven your recent investment in {company}, I thought..."
    }
];

// Mock contact data generator
function generateMockContacts(company) {
    const titles = ['CEO', 'Investment Director', 'Managing Partner'];
    const contacts = [];
    
    for (let i = 0; i < 3; i++) {
        contacts.push({
            name: `John Doe ${i + 1}`,
            title: titles[i],
            email: `john.doe${i + 1}@${company.toLowerCase().replace(/\s+/g, '')}.com`,
            linkedin: `https://linkedin.com/in/johndoe${i + 1}`
        });
    }
    return contacts;
}

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const data = await fetchFundingData();
        fundingData = data
        if (data && Array.isArray(data)) {
            initializeDashboard(data);
            initializeTemplates();
            setupEventListeners();
        }
    } catch (error) {
        console.error('Error initializing dashboard:', error);
    }
});

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

function initializeDashboard(data) {
    renderMainTable(data);
    renderRecentActivity(data);
}

function renderMainTable(data) {
    const tableHTML = `
        <div class="bg-white rounded-lg shadow overflow-hidden">
            <table class="min-w-full">
                <thead class="bg-gray-50">
                    <tr>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                        <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Round</th>
                        <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-200">
                    ${data.map(event => `
                        <tr class="hover:bg-gray-50 transition-colors duration-150">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm font-medium text-gray-900">
                                    ${event.funded_organization_identifier.value}
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
                                <div class="flex justify-center space-x-2">
                                    <button onclick="showFundingDetails('${event.uuid}')" 
                                            class="text-blue-600 hover:text-blue-900">
                                        <i class="fas fa-expand-alt"></i>
                                    </button>
                                    <button onclick="sendAllEmails('${event.uuid}')"
                                            class="text-green-600 hover:text-green-900">
                                        <i class="fas fa-envelope"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
    document.getElementById('allRoundsSection').innerHTML = tableHTML;
}

function showFundingDetails(eventId) {
    const event = fundingData.find(e => e.uuid === eventId);
    if (!event) return;

    const contacts = generateMockContacts(event.funded_organization_identifier.value);
    const modal = document.getElementById('fundingModal');

    const modalContent = `
        <div class="max-h-[80vh] overflow-y-auto">
            <div class="p-6 space-y-6">
                <!-- Company Overview -->
                <div class="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Company Overview</h3>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="col-span-2">
                            <p class="text-sm font-medium text-gray-600">Company</p>
                            <p class="text-base text-gray-900">${event.funded_organization_identifier.value}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Round Type</p>
                            <p class="text-base text-gray-900 capitalize">${event.investment_type}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Announcement Date</p>
                            <p class="text-base text-gray-900">${new Date(event.announced_on).toLocaleDateString()}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">Amount Raised</p>
                            <p class="text-base text-gray-900">${formatCurrency(event.money_raised.value, event.money_raised.currency)}</p>
                        </div>
                        <div>
                            <p class="text-sm font-medium text-gray-600">USD Equivalent</p>
                            <p class="text-base text-gray-900">${formatCurrency(event.money_raised.value_usd, 'USD')}</p>
                        </div>
                    </div>
                </div>

                <!-- Investors List -->
                <div class="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Investors</h3>
                    <div class="grid gap-4">
                        ${event.investor_identifiers.map(investor => `
                            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                                <div>
                                    <p class="font-medium text-gray-900">${investor.value}</p>
                                    <p class="text-sm text-gray-500">Role: ${investor.role}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Generated Contacts -->
                <div class="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                    <div class="space-y-4">
                        ${contacts.map((contact, index) => {
                            const emailTemplate = generateEmailTemplate(contact, event);
                            return `
                                <div class="p-4 bg-gray-50 rounded-lg">
                                    <div class="flex justify-between items-start mb-4">
                                        <div>
                                            <p class="font-medium text-gray-900">${contact.name}</p>
                                            <p class="text-sm text-gray-500">${contact.title}</p>
                                            <p class="text-sm text-gray-500">${contact.email}</p>
                                        </div>
                                        <button onclick="sendEmail('${contact.email}')"
                                                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors">
                                            <i class="fas fa-paper-plane mr-2"></i>Send Email
                                        </button>
                                    </div>
                                    <div class="space-y-3">
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Email Subject</label>
                                            <input type="text" 
                                                   value="${emailTemplate.subject}"
                                                   class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                                   onchange="updateEmailTemplate(${index}, 'subject', this.value)">
                                        </div>
                                        <div>
                                            <label class="block text-sm font-medium text-gray-700 mb-1">Email Body</label>
                                            <textarea class="w-full p-2 border rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500" 
                                                      rows="4"
                                                      onchange="updateEmailTemplate(${index}, 'body', this.value)">${emailTemplate.body}</textarea>
                                        </div>
                                    </div>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>

                <!-- Raw Data -->
                <div class="bg-white p-6 rounded-lg shadow-sm border">
                    <h3 class="text-lg font-semibold text-gray-900 mb-4">Raw Data</h3>
                    <pre class="bg-gray-50 p-4 rounded-lg overflow-x-auto text-sm">
                        ${JSON.stringify(event, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    `;

    modal.querySelector('.modal-body').innerHTML = modalContent;
    modal.style.display = 'block';
}

// function showFundingDetails(eventId) {
//     const event = fundingData.find(e => e.uuid === eventId);
//     if (!event) return;

//     const contacts = generateMockContacts(event.funded_organization_identifier.value);
//     const modal = document.getElementById('fundingModal');

//     const modalContent = `
//         <div class="space-y-6">
//             <div class="bg-gray-50 p-4 rounded-lg">
//                 <h3 class="text-lg font-medium text-gray-900 mb-4">Funding Details</h3>
//                 <div class="grid grid-cols-2 gap-4">
//                     ${Object.entries(event).map(([key, value]) => `
//                         <div>
//                             <p class="text-sm text-gray-500">${key}</p>
//                             <p class="text-sm font-medium text-gray-900">${
//                                 typeof value === 'object' ? JSON.stringify(value, null, 2) : value
//                             }</p>
//                         </div>
//                     `).join('')}
//                 </div>
//             </div>

//             <div class="space-y-4">
//                 <h3 class="text-lg font-medium text-gray-900">Investor Contacts</h3>
//                 ${contacts.map((contact, index) => {
//                     const emailTemplate = generateEmailTemplate(contact, event);
//                     return `
//                         <div class="bg-white p-4 rounded-lg border">
//                             <div class="space-y-3">
//                                 <div class="flex justify-between items-start">
//                                     <div>
//                                         <p class="font-medium text-gray-900">${contact.name}</p>
//                                         <p class="text-sm text-gray-500">${contact.title}</p>
//                                         <p class="text-sm text-gray-500">${contact.email}</p>
//                                     </div>
//                                     <button onclick="sendEmail('${contact.email}')"
//                                             class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm">
//                                         <i class="fas fa-paper-plane mr-1"></i>Send Email
//                                     </button>
//                                 </div>
//                                 <div class="space-y-2">
//                                     <input type="text" 
//                                            value="${emailTemplate.subject}"
//                                            class="w-full p-2 border rounded-md text-sm"
//                                            onchange="updateEmailTemplate(${index}, 'subject', this.value)">
//                                     <textarea class="w-full p-2 border rounded-md text-sm" 
//                                               rows="4"
//                                               onchange="updateEmailTemplate(${index}, 'body', this.value)">${emailTemplate.body}</textarea>
//                                 </div>
//                             </div>
//                         </div>
//                     `;
//                 }).join('')}
//             </div>
//         </div>
//     `;

//     modal.querySelector('.modal-body').innerHTML = modalContent;
//     modal.style.display = 'block';
// }

function sendAllEmails(eventId) {
    const event = fundingData.find(e => e.uuid === eventId);
    if (!event) return;

    const contacts = generateMockContacts(event.funded_organization_identifier.value);
    contacts.forEach(contact => {
        sendEmail(contact.email);
    });
    
    showNotification(`Sent emails to ${contacts.length} contacts for ${event.funded_organization_identifier.value}`);
}

          
function renderRecentActivity(data) {
    const tenDaysAgo = new Date();
    tenDaysAgo.setDate(tenDaysAgo.getDate() - 10);
    
    const recentData = data.filter(event => 
        new Date(event.announced_on) >= tenDaysAgo
    );

    // Similar to renderMainTable but with additional "Send All" functionality
    // Implementation here...
}

//  Update tab switching
function setupEventListeners() {
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.textContent.trim().toLowerCase().replace(/\s+/g, '');
            const targetId = tabName + 'Section';
            
            const targetSection = document.getElementById(targetId);
            if (!targetSection) return;
            
            // Hide all sections
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
            });
            
            // Show target section
            targetSection.classList.remove('hidden');
            
            // Handle specific section renders
            if (tabName === 'emailtemplates') {
                renderTemplatesSection();
            }
            
            // Update button styles
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'border-blue-500', 'text-blue-600');
                btn.classList.add('text-gray-500');
            });
            this.classList.add('active', 'border-blue-500', 'text-blue-600');
        });
    });

    // Add refresh button handler
    const refreshBtn = document.getElementById('refreshBtn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', refreshData);
    }
}

// // Update header in HTML
// document.querySelector('header .container').innerHTML = `
//     <div class="flex justify-between items-center">
//         <h1 class="text-2xl font-semibold text-gray-800">Funding Dashboard</h1>
//         <div class="flex items-center space-x-4">
//             <span id="refreshTimestamp" class="text-sm text-gray-500"></span>
//             <button id="refreshBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
//                 <i class="fas fa-sync-alt mr-2"></i>Refresh
//             </button>
//             <button id="viewDataBtn" class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
//                 <i class="fas fa-table mr-2"></i>View Data
//             </button>
//             <button id="sendEmailsBtn" class="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg">
//                 <i class="fas fa-envelope mr-2"></i>Send Emails
//             </button>
//         </div>
//     </div>
// `;


// function showFundingDetails(eventId) {
//     const modal = document.getElementById('fundingModal');
//     const event = fundingData.find(e => e.uuid === eventId);
//     const contacts = generateMockContacts(event.funded_organization_identifier.value);

//     const modalContent = `
        // <div class="space-y-6">
//             <div class="bg-gray-50 p-4 rounded-lg">
//                 <h3 class="text-lg font-medium text-gray-900 mb-2">Company Details</h3>
//                 <div class="grid grid-cols-2 gap-4">
//                     <div>
//                         <p class="text-sm text-gray-500">Company</p>
//                         <p class="text-sm font-medium text-gray-900">${event.funded_organization_identifier.value}</p>
//                     </div>
//                     <div>
//                         <p class="text-sm text-gray-500">Amount Raised</p>
//                         <p class="text-sm font-medium text-gray-900">
//                             ${formatCurrency(event.money_raised.value, event.money_raised.currency)}
//                         </p>
//                     </div>
//                 </div>
//             </div>

//             <div class="space-y-4">
//                 <h3 class="text-lg font-medium text-gray-900">Key Contacts</h3>
//                 ${contacts.map(contact => `
//                     <div class="bg-white p-4 rounded-lg border">
//                         <div class="flex justify-between items-start">
//                             <div>
//                                 <p class="font-medium text-gray-900">${contact.name}</p>
//                                 <p class="text-sm text-gray-500">${contact.title}</p>
//                                 <p class="text-sm text-gray-500">${contact.email}</p>
//                             </div>
//                             <button onclick="sendEmail('${contact.email}')"
//                                     class="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm transition-colors duration-200">
//                                 <i class="fas fa-paper-plane mr-1"></i>Send Email
//                             </button>
//                         </div>
//                     </div>
//                 `).join('')}
//             </div>
//         </div>
//     `;

//     modal.querySelector('.modal-body').innerHTML = modalContent;
//     modal.style.display = 'block';
// }

function initializeTemplates() {
    const templateSection = document.getElementById('emailTemplatesSection');
    const templatesHTML = mockEmailTemplates.map(template => `
        <div class="template-card bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-medium text-gray-900">${template.name}</h3>
                <div class="space-x-2">
                    <button onclick="editTemplate(${template.id})" class="text-blue-600 hover:text-blue-800">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button onclick="deleteTemplate(${template.id})" class="text-red-600 hover:text-red-800">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            <p class="text-sm text-gray-600 mb-2">Subject: ${template.subject}</p>
            <p class="text-sm text-gray-500">${template.body.substring(0, 100)}...</p>
        </div>
    `).join('');
    
    templateSection.querySelector('.grid').innerHTML = templatesHTML;
}

function setupEventListeners() {
    // Tab switching
    document.querySelectorAll('.tab-btn').forEach(button => {
        button.addEventListener('click', function() {
            const targetId = button.textContent.trim().toLowerCase().replace(/\s+/g, '') + 'Section';
            document.querySelectorAll('.section').forEach(section => {
                section.classList.add('hidden');
            });
            document.getElementById(targetId).classList.remove('hidden');
            
            document.querySelectorAll('.tab-btn').forEach(btn => {
                btn.classList.remove('active', 'border-blue-500', 'text-blue-600');
                btn.classList.add('text-gray-500');
            });
            button.classList.add('active', 'border-blue-500', 'text-blue-600');
        });
    });

    // Modal close button
    document.querySelectorAll('.close-modal').forEach(button => {
        button.addEventListener('click', function() {
            document.getElementById('fundingModal').style.display = 'none';
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('fundingModal');
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Add template button
    document.getElementById('addTemplateBtn').addEventListener('click', showAddTemplateModal);
}

// Update templates section rendering
function renderTemplatesSection() {
    const templatesHTML = `
        <div class="bg-white rounded-lg shadow-lg p-6">
            <div class="flex justify-between items-center mb-6">
                <h2 class="text-xl font-semibold">Email Templates</h2>
                <button onclick="addNewTemplate()" 
                        class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg">
                    <i class="fas fa-plus mr-2"></i>Add Template
                </button>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${mockEmailTemplates.map(template => `
                    <div class="bg-gray-50 rounded-lg p-4 shadow">
                        <div class="flex justify-between items-start mb-3">
                            <h3 class="font-medium">${template.name}</h3>
                            <div class="space-x-2">
                                <button onclick="editTemplate(${template.id})" 
                                        class="text-blue-600 hover:text-blue-800">
                                    <i class="fas fa-edit"></i>
                                </button>
                                <button onclick="deleteTemplate(${template.id})" 
                                        class="text-red-600 hover:text-red-800">
                                    <i class="fas fa-trash"></i>
                                </button>
                            </div>
                        </div>
                        <div class="space-y-2">
                            <p class="text-sm text-gray-600">Subject: ${template.subject}</p>
                            <p class="text-sm text-gray-500">${template.body.substring(0, 100)}...</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
    
    const templateSection = document.getElementById('emailTemplatesSection');
    if (templateSection) {
        templateSection.innerHTML = templatesHTML;
    }
}

function formatCurrency(amount, currency) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

function sendEmail(email) {
    // Mock email sending functionality
    const templateId = 1; // Default template
    const template = mockEmailTemplates.find(t => t.id === templateId);
    
    console.log(`Sending email to ${email} using template: ${template.name}`);
    // Show success notification
    showNotification('Email sent successfully!', 'success');
}

function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed bottom-4 right-4 px-6 py-3 rounded-lg text-white ${
        type === 'success' ? 'bg-green-500' : 'bg-red-500'
    } shadow-lg transform transition-transform duration-300 ease-in-out`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function showAddTemplateModal() {
    const modal = document.getElementById('fundingModal');
    const modalContent = `
        <div class="space-y-4">
            <div>
                <label class="block text-sm font-medium text-gray-700">Template Name</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Subject Line</label>
                <input type="text" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm">
            </div>
            <div>
                <label class="block text-sm font-medium text-gray-700">Email Body</label>
                <textarea class="mt-1 block w-full rounded-md border-gray-300 shadow-sm" rows="6"></textarea>
            </div>
            <div class="flex justify-end space-x-3">
                <button onclick="closeModal()" 
                        class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50">
                    Cancel
                </button>
                <button onclick="saveTemplate()" 
                        class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium">
                    Save Template
                </button>
            </div>
        </div>
    `;
    
    modal.querySelector('.modal-body').innerHTML = modalContent;
    modal.style.display = 'block';
}

function editTemplate(templateId) {
    const template = mockEmailTemplates.find(t => t.id === templateId);
    showAddTemplateModal();
    // Pre-fill the form with template data
    // Implementation here...
}

function deleteTemplate(templateId) {
    if (confirm('Are you sure you want to delete this template?')) {
        const index = mockEmailTemplates.findIndex(t => t.id === templateId);
        mockEmailTemplates.splice(index, 1);
        initializeTemplates();
        showNotification('Template deleted successfully!');
    }
}

function closeModal() {
    document.getElementById('fundingModal').style.display = 'none';
}

function saveTemplate() {
    // Save template logic here
    closeModal();
    initializeTemplates();
    showNotification('Template saved successfully!');
}

// Initialize the dashboard when the document loads
document.addEventListener('DOMContentLoaded', () => {
    fetchFundingData().then(data => {
        initializeDashboard(data);
        initializeTemplates();
        setupEventListeners();
    });
});