// Example data for the potholes by severity or address
const potholeData = [
    { address: 'MG Road, Jaipur', total: 15, severity: 'High', fixed: '30.0%' },
    { address: 'Anna Salai, Chennai', total: 25, severity: 'Medium', fixed: '50.0%' },
    { address: 'Tiananmen Street, Beijing', total: 10, severity: 'Low', fixed: '70.0%' },
    { address: 'North Main Road, Madurai', total: 12, severity: 'High', fixed: '40.0%' },
    { address: 'Nanjing Road, Shanghai', total: 20, severity: 'Medium', fixed: '60.0%' },
    { address: 'Udaipur City Square', total: 8, severity: 'Low', fixed: '50.0%' },
    // Add more addresses with their pothole data as needed
];

// Populate the pothole table (based on address or severity)
function populatePotholeTable() {
    const tableBody = document.querySelector('#potholeTable tbody');
    potholeData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.address}</td>
            <td>${item.total}</td>
            <td>${item.severity}</td>
            <td>${item.fixed}</td>
        `;
        tableBody.appendChild(row);
    });
}

const bodyData = [
    { name: 'Jaipur Municipal Council', summary: '5 addresses', deleted: '' },
    { name: 'Udaipur City Council', summary: '3 addresses', deleted: '' },
    { name: 'Chennai Municipal Corporation', summary: '12 addresses', deleted: '2 deleted' },
    { name: 'Madurai City Council', summary: '8 addresses', deleted: '' },
    { name: 'Beijing Central Council', summary: '10 addresses', deleted: '3 deleted' },
    { name: 'Shanghai District Council', summary: '7 addresses', deleted: '' },
    // Add more entries as needed
];

// Populate the second table (Admin Report by State)
function populateBodyTable() {
    const tableBody = document.querySelector('#bodyTable tbody');
    bodyData.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.summary}</td>
            <td>${item.deleted}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Initialize the table
populatePotholeTable();
populateBodyTable();