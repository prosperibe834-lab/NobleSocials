document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const modeToggle = document.querySelector('.mode');
    const modeText = document.querySelector('.mode-text');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // --- 1. Theme Initialization ---
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        modeText.innerText = "Light Mode";
    }

    // --- 2. Dark/Light Mode Toggle ---
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');

        if (body.classList.contains('dark')) {
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
        link.addEventListener('click', function (e) {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Auto-close sidebar on mobile after clicking a link
            if (window.innerWidth <= 800) {
                sidebar.classList.remove('active');
            }
        });
    });
});



// Main Contents Starts here

// --- DATABASE ---
let transactions = [
    { id: "TX-90210", user: "Godwin", service: "WhatsApp", price: 1500, cost: 950, status: "success", date: "2:30 PM" },
    { id: "TX-44122", user: "Adeola", service: "Telegram", price: 1200, cost: 800, status: "failed", date: "1:15 PM" },
    { id: "TX-33019", user: "Chidi", service: "Instagram", price: 2500, cost: 1800, status: "success", date: "11:00 AM" }
];

// --- CORE FUNCTIONS ---
function initDashboard() {
    renderTable(transactions);
    calculateFinance();
}

function renderTable(data) {
    const body = document.getElementById('txBody');
    if (!body) return;

    body.innerHTML = data.map((tx, index) => `
        <tr>
            <td><strong>${tx.user}</strong><br><small style="color:var(--text-muted)">ID: ${tx.id}</small></td>
            <td>${tx.service}</td>
            <td>₦${tx.price.toLocaleString()}</td>
            <td>₦${tx.cost.toLocaleString()}</td>
            <td><span class="badge ${tx.status}">${tx.status}</span></td>
            <td>
                ${tx.status === 'failed' ?
            `<button class="btn btn-refund" onclick="processRefund(${index})">Refund</button>` :
            `<button class="btn btn-sync" style="padding: 5px 10px; font-size: 11px">Details</button>`}
            </td>
        </tr>
    `).join('');
}

function calculateFinance() {
    let rev = 0, cost = 0;
    transactions.forEach(t => {
        if (t.status === 'success') {
            rev += t.price;
            cost += t.cost;
        }
    });
    document.getElementById('total-revenue').innerText = `₦${rev.toLocaleString()}`;
    document.getElementById('total-cost').innerText = `₦${cost.toLocaleString()}`;
    document.getElementById('total-profit').innerText = `₦${(rev - cost).toLocaleString()}`;
}

// --- ACTIONS ---
function processRefund(index) {
    transactions[index].status = 'success'; // Simulate fixing it
    showToast("Refund Processed & User Notified!");
    initDashboard();
}

function refreshSystem() {
    showToast("System Synced with 5SIM API!");
    initDashboard();
}

function confirmService() {
    const name = document.getElementById('newSvcName').value;
    if (!name) return alert("Enter platform name!");
    toggleModal(false);
    showToast(`${name} Service Deployed!`);
}

// --- UI HELPERS ---
function toggleModal(show) {
    document.getElementById('serviceModal').style.display = show ? 'flex' : 'none';
}

function showToast(msg) {
    const t = document.getElementById('f-toast');
    t.innerText = msg;
    t.style.display = 'block';
    setTimeout(() => t.style.display = 'none', 3000);
}

// --- SEARCH ---
document.getElementById('masterSearch')?.addEventListener('input', (e) => {
    const val = e.target.value.toLowerCase();
    const filtered = transactions.filter(t =>
        t.user.toLowerCase().includes(val) ||
        t.service.toLowerCase().includes(val) ||
        t.id.toLowerCase().includes(val)
    );
    renderTable(filtered);
});

// --- RUN ON START ---
document.addEventListener('DOMContentLoaded', initDashboard);