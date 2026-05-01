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
// --- DATABASE SIMULATION ---
let vpnInventory = JSON.parse(localStorage.getItem('vpnInventory')) || [];

document.addEventListener('DOMContentLoaded', () => {
    updateUI();

    document.getElementById('adminVpnForm').addEventListener('submit', function(e) {
        e.preventDefault();
        const provider = document.getElementById('newVpnProvider').value;
        const rawData = document.getElementById('vpnData').value;
        const accounts = rawData.split('\n').filter(line => line.includes(':'));

        accounts.forEach(acc => {
            vpnInventory.push({
                id: Math.floor(Math.random() * 9999),
                provider: provider,
                details: acc.trim(),
                status: 'Available'
            });
        });

        localStorage.setItem('vpnInventory', JSON.stringify(vpnInventory));
        this.reset();
        updateUI();
        alert(`${accounts.length} Accounts Added!`);
    });
});

function updateUI() {
    const body = document.getElementById('inventoryBody');
    const totalStock = document.getElementById('stat-total-stock');
    body.innerHTML = "";

    vpnInventory.forEach((item, index) => {
        body.innerHTML += `
            <tr data-provider="${item.provider}">
                <td>#${item.id}</td>
                <td><strong>${item.provider}</strong></td>
                <td><code>${item.details}</code></td>
                <td><span class="status-badge available">${item.status}</span></td>
                <td><i class='bx bx-trash-alt btn-delete-row' onclick="deleteAccount(${index})"></i></td>
            </tr>
        `;
    });

    totalStock.innerText = vpnInventory.length;
    renderStockBars();
}

function deleteAccount(index) {
    if(confirm("Delete this account from inventory?")) {
        vpnInventory.splice(index, 1);
        localStorage.setItem('vpnInventory', JSON.stringify(vpnInventory));
        updateUI();
    }
}

function filterTable() {
    const search = document.getElementById('tableSearch').value.toLowerCase();
    const filter = document.getElementById('filterProvider').value;
    const rows = document.querySelectorAll('#inventoryBody tr');

    rows.forEach(row => {
        const text = row.innerText.toLowerCase();
        const provider = row.getAttribute('data-provider');
        const matchesSearch = text.includes(search);
        const matchesFilter = (filter === "all" || provider === filter);

        row.style.display = (matchesSearch && matchesFilter) ? "" : "none";
    });
}

function exportLogs() {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(vpnInventory));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "vpn_inventory_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

function clearSold() {
    alert("Clearing sold accounts database...");
    // Since this is a demo, we'll just reset the Sold stat visually
    document.getElementById('stat-total-sold').innerText = "0";
}

function renderStockBars() {
    const providers = ['NordVPN', 'ExpressVPN', 'Surfshark'];
    const container = document.getElementById('stockBars');
    container.innerHTML = "";

    providers.forEach(p => {
        const count = vpnInventory.filter(item => item.provider === p).length;
        const percentage = Math.min((count / 50) * 100, 100); // 50 is max capacity for visual
        container.innerHTML += `
            <div class="stock-item">
                <div class="stock-info"><span>${p}</span><span>${count} Active</span></div>
                <div class="progress-bar"><div class="progress-fill" style="width: ${percentage}%;"></div></div>
            </div>
        `;
    });
}


function filterTable() {
    // 1. Get user input
    const searchTerm = document.getElementById('tableSearch').value.toLowerCase();
    const filterValue = document.getElementById('filterProvider').value;
    const tableRows = document.querySelectorAll('#inventoryBody tr');

    tableRows.forEach(row => {
        // Get the text from the whole row
        const rowText = row.textContent.toLowerCase();
        
        // Get the specific provider from the data attribute we set during updateUI
        const rowProvider = row.getAttribute('data-provider');

        // Logic: 
        // Does the row contain the search text? AND 
        // Is the filter "all" OR does the provider match?
        const matchesSearch = rowText.includes(searchTerm);
        const matchesFilter = (filterValue === "all" || rowProvider === filterValue);

        if (matchesSearch && matchesFilter) {
            row.style.display = ""; // Show
            row.style.animation = "fadeIn 0.3s ease"; // Optional: Add a nice pop-in
        } else {
            row.style.display = "none"; // Hide
        }
    });
}

// Add this animation to your CSS for the "Pop-in" effect
// @keyframes fadeIn { from { opacity: 0; transform: translateY(5px); } to { opacity: 1; transform: translateY(0); } }