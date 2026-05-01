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
document.addEventListener("DOMContentLoaded", () => {
    const loginArea = document.getElementById('adm-logins');
    const stockInput = document.getElementById('adm-stock');
    const inventoryBody = document.getElementById('inventory-body');
    const editModal = document.getElementById('editModal');

    // --- 1. INITIAL DATA SYNC ---
    function renderInventory() {
        const inventory = JSON.parse(localStorage.getItem('adminInventory')) || [];
        inventoryBody.innerHTML = "";
        let totalStock = 0;

        if (inventory.length === 0) {
            inventoryBody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:40px; color:#94a3b8;">No inventory loaded. Add accounts above.</td></tr>`;
        }

        inventory.forEach((item, index) => {
            totalStock += parseInt(item.stock);
            const row = `
                <tr>
                    <td><div class="platform-pill"><i class='bx bxl-${item.platform}'></i> ${item.platform}</div></td>
                    <td>${item.category}</td>
                    <td>₦${parseFloat(item.price).toLocaleString()}</td>
                    <td><strong>${item.stock}</strong></td>
                    <td><span class="status-pill ${item.stock > 0 ? 'instock' : 'low'}" style="color: ${item.stock > 0 ? '#10b981' : '#ef4444'}">
                        ${item.stock > 0 ? '● Active' : '● Out of Stock'}</span>
                    </td>
                    <td>
                        <div class="action-btns">
                            <button class="edit-btn" onclick="openEdit(${index})"><i class='bx bx-edit-alt'></i></button>
                            <button class="delete-btn" onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
                        </div>
                    </td>
                </tr>
            `;
            inventoryBody.innerHTML += row;
        });

        document.getElementById('total-stock-val').innerText = totalStock.toLocaleString();
        document.getElementById('active-listings-val').innerText = inventory.length;
    }

    // --- 2. AUTO-COUNT STOCK ---
    loginArea.addEventListener('input', () => {
        const lines = loginArea.value.split('\n').filter(l => l.trim() !== "");
        stockInput.value = lines.length;
    });

    // --- 3. CREATE PRODUCT ---
    document.getElementById('add-social-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const logins = loginArea.value.split('\n').filter(l => l.trim() !== "");
        
        const newItem = {
            platform: document.getElementById('adm-platform').value,
            category: document.getElementById('adm-category').value,
            price: document.getElementById('adm-price').value,
            stock: logins.length,
            accounts: logins
        };

        const inventory = JSON.parse(localStorage.getItem('adminInventory')) || [];
        inventory.push(newItem);
        localStorage.setItem('adminInventory', JSON.stringify(inventory));
        
        e.target.reset();
        stockInput.value = 0;
        renderInventory();
        alert("Success! Product deployed to the hub.");
    });

    // --- 4. DELETE PRODUCT ---
    window.deleteItem = (index) => {
        if (confirm("Delete this listing? Users will no longer be able to buy it.")) {
            let inventory = JSON.parse(localStorage.getItem('adminInventory'));
            inventory.splice(index, 1);
            localStorage.setItem('adminInventory', JSON.stringify(inventory));
            renderInventory();
        }
    };

    // --- 5. UPDATE (MODAL) LOGIC ---
    window.openEdit = (index) => {
        const inventory = JSON.parse(localStorage.getItem('adminInventory'));
        const item = inventory[index];
        
        document.getElementById('edit-index').value = index;
        document.getElementById('edit-price').value = item.price;
        document.getElementById('edit-logins').value = ""; // Clear for new additions
        
        editModal.classList.add('active');
    };

    document.getElementById('edit-form').addEventListener('submit', (e) => {
        e.preventDefault();
        const index = document.getElementById('edit-index').value;
        const addLogins = document.getElementById('edit-logins').value.split('\n').filter(l => l.trim() !== "");
        
        let inventory = JSON.parse(localStorage.getItem('adminInventory'));
        
        // Update price
        inventory[index].price = document.getElementById('edit-price').value;
        
        // Append new logins if any
        if (addLogins.length > 0) {
            inventory[index].accounts = [...inventory[index].accounts, ...addLogins];
            inventory[index].stock = inventory[index].accounts.length;
        }

        localStorage.setItem('adminInventory', JSON.stringify(inventory));
        editModal.classList.remove('active');
        renderInventory();
    });

    // Close Modal
    document.querySelector('.close-modal').addEventListener('click', () => editModal.classList.remove('active'));

    // Initialize the table
    renderInventory();
});


// Add this inside your DOMContentLoaded block
const searchInput = document.getElementById('inventory-search');

searchInput.addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const rows = document.querySelectorAll('#inventory-body tr');

    rows.forEach(row => {
        const platform = row.children[0].innerText.toLowerCase();
        const category = row.children[1].innerText.toLowerCase();
        
        if (platform.includes(term) || category.includes(term)) {
            row.style.display = "";
        } else {
            row.style.display = "none";
        }
    });
});