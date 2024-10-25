const users = [
    { name: 'Ravi Kumar', email: 'ravi@example.com', role: 'Common User', status: 'Active', activity: 'Submitted 5 reports' },
    { name: 'Li Wei', email: 'liwei@gov.cn', role: 'Government Authority', status: 'Active', activity: 'Resolved 20 reports' },
    { name: 'Meena Reddy', email: 'meena@example.com', role: 'Common User', status: 'Suspended', activity: 'Submitted 8 reports' },
    { name: 'Zhang Wei', email: 'zhangwei@gov.cn', role: 'Government Authority', status: 'Active', activity: 'Resolved 15 reports' },
    { name: 'Karthik Sharma', email: 'karthik@example.com', role: 'Common User', status: 'Active', activity: 'Submitted 3 reports' },
];

function populateUserTable() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>${user.activity}</td>
            <td>
                <button onclick="editUser('${user.email}')">Edit</button>
                <button onclick="deleteUser('${user.email}')">Delete</button>
                <button onclick="toggleStatus('${user.email}')">${user.status === 'Active' ? 'Suspend' : 'Activate'}</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterByRole() {
    const selectedRole = document.getElementById('roleFilter').value;
    const filteredUsers = selectedRole === 'all' ? users : users.filter(user => user.role === selectedRole);
    updateUserTable(filteredUsers);
}

function filterByStatus() {
    const selectedStatus = document.getElementById('statusFilter').value;
    const filteredUsers = selectedStatus === 'all' ? users : users.filter(user => user.status === selectedStatus);
    updateUserTable(filteredUsers);
}

function updateUserTable(filteredUsers) {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = '';
    filteredUsers.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.role}</td>
            <td>${user.status}</td>
            <td>${user.activity}</td>
            <td>
                <button onclick="editUser('${user.email}')">Edit</button>
                <button onclick="deleteUser('${user.email}')">Delete</button>
                <button onclick="toggleStatus('${user.email}')">${user.status === 'Active' ? 'Suspend' : 'Activate'}</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function editUser(email) {
    alert(`Editing user with email: ${email}`);
}

function deleteUser(email) {
    alert(`Deleting user with email: ${email}`);
}

function toggleStatus(email) {
    const user = users.find(u => u.email === email);
    user.status = user.status === 'Active' ? 'Suspended' : 'Active';
    populateUserTable();
}

// Initialize the table
populateUserTable();
