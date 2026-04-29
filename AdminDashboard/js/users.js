document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const modeToggle = document.querySelector('.mode');
    const modeText = document.querySelector('.mode-text');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // --- 1. Theme Initialization ---
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        modeText.innerText = "Light Mode";
    }

    // --- 2. Dark/Light Mode Toggle ---
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if(body.classList.contains('dark')){
            modeText.innerText = "Light Mode";
            localStorage.setItem('theme', 'dark');
        } else {
            modeText.innerText = "Dark Mode";
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 3. Mobile Sidebar Toggle ---
    mobileToggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // --- 4. Active Link State Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Auto-close sidebar on mobile after clicking a link
            if(window.innerWidth <= 800) {
                sidebar.classList.remove('active');
            }
        });
    });
});



                                // Main Contents Starts here
// --- DATA STORE ---
let users = [
    { id: 1, name: "Noble King", username: "noble_admin", email: "admin@noble.com", phone: "+234 801 234 5678", status: "Active" },
    { id: 2, name: "Jane Smith", username: "jsmith", email: "jane@social.com", phone: "+234 902 111 2222", status: "Pending" }
];

const modal = document.getElementById('userModal');
const userForm = document.getElementById('userForm');

document.addEventListener("DOMContentLoaded", () => {
    renderUsers(users);
});

// RENDER TABLE
function renderUsers(data) {
    const tableBody = document.getElementById('userTableBody');
    tableBody.innerHTML = '';
    
    data.forEach(user => {
        const row = `
            <tr>
                <td>
                    <div class="user-info">
                        <div class="avatar">${user.name.charAt(0)}</div>
                        <div class="user-meta">
                            <strong>${user.name}</strong>
                            <span class="email-sub">${user.email}</span>
                        </div>
                    </div>
                </td>
                <td>@${user.username}</td>
                <td>${user.phone}</td>
                <td><span class="badge status-${user.status.toLowerCase()}">${user.status}</span></td>
                <td>
                    <div class="action-btns">
                        <button class="edit-btn" onclick="editUser(${user.id})"><i class='bx bx-edit-alt'></i></button>
                        <button class="delete-btn" onclick="deleteUser(${user.id})"><i class='bx bx-trash'></i></button>
                    </div>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });

    document.getElementById('total-users-count').innerText = data.length;
}

// SEARCH FUNCTION
function filterUsers() {
    const query = document.getElementById('userSearch').value.toLowerCase();
    const filtered = users.filter(u => 
        u.name.toLowerCase().includes(query) || 
        u.username.toLowerCase().includes(query) || 
        u.email.toLowerCase().includes(query)
    );
    renderUsers(filtered);
}

// DELETE FUNCTION
function deleteUser(id) {
    if(confirm("Permanently delete this member?")) {
        users = users.filter(u => u.id !== id);
        renderUsers(users);
    }
}

// OPEN MODAL FOR ADD
function openAddModal() {
    document.getElementById('modalTitle').innerText = "Add New Member";
    userForm.reset();
    document.getElementById('editUserId').value = '';
    modal.style.display = 'flex';
}

// OPEN MODAL FOR EDIT
function editUser(id) {
    const user = users.find(u => u.id === id);
    document.getElementById('modalTitle').innerText = "Update Member Info";
    document.getElementById('editUserId').value = user.id;
    document.getElementById('formFullname').value = user.name;
    document.getElementById('formUsername').value = user.username;
    document.getElementById('formEmail').value = user.email;
    document.getElementById('formPhone').value = user.phone;
    document.getElementById('formStatus').value = user.status;
    modal.style.display = 'flex';
}

function closeModal() {
    modal.style.display = 'none';
}

// SAVE / UPDATE LOGIC
userForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const id = document.getElementById('editUserId').value;
    const userData = {
        id: id ? parseInt(id) : Date.now(),
        name: document.getElementById('formFullname').value,
        username: document.getElementById('formUsername').value,
        email: document.getElementById('formEmail').value,
        phone: document.getElementById('formPhone').value,
        status: document.getElementById('formStatus').value
    };

    if(id) {
        const index = users.findIndex(u => u.id === parseInt(id));
        users[index] = userData;
    } else {
        users.push(userData);
    }

    renderUsers(users);
    closeModal();
});

// Close modal when clicking outside
window.onclick = (e) => { if(e.target == modal) closeModal(); }