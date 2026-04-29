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


// ================================
// 🔥 FIXED SIDEBAR + ACTIVE LINK
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // ✅ MOBILE OPEN
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    // ✅ MOBILE CLOSE
    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // ✅ CLOSE WHEN CLICK OUTSIDE
    document.addEventListener('click', (e) => {
        if (
            window.innerWidth <= 800 &&
            !sidebar.contains(e.target) &&
            !mobileToggleBtn.contains(e.target)
        ) {
            sidebar.classList.remove('active');
        }
    });

    // ✅ ACTIVE PAGE DETECTION (REAL FIX)
    const currentPage = window.location.pathname.split("/").pop();

    navLinks.forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        } else {
            link.classList.remove("active");
        }
    });
});


                                        // Main Contents Starts here
// --- CHARTS INSTANCES ---
let growthChart, salesChart;

document.addEventListener("DOMContentLoaded", () => {
    initCharts();
});

function initCharts() {
    const isDark = document.body.classList.contains('dark');
    const color = isDark ? '#f8fafc' : '#1f2937';

    // 1. Revenue Growth Rate (Area Chart)
    const growthOptions = {
        series: [{ name: 'Revenue', data: [30, 40, 35, 50, 49, 60, 70] }],
        chart: { height: 300, type: 'area', toolbar: { show: false }, animations: { enabled: true } },
        stroke: { curve: 'smooth', width: 3 },
        colors: ['#6366f1'],
        fill: { type: 'gradient', gradient: { opacityFrom: 0.5, opacityTo: 0.1 } },
        xaxis: { categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'], labels: { style: { colors: color } } },
        yaxis: { labels: { style: { colors: color } } },
        dataLabels: { enabled: false }
    };
    growthChart = new ApexCharts(document.querySelector("#revenueGrowthChart"), growthOptions);
    growthChart.render();

    // 2. Best Selling Services (Bar Chart)
    const salesOptions = {
        series: [{ name: 'Sales', data: [400, 430, 448, 470, 540] }],
        chart: { type: 'bar', height: 250, toolbar: { show: false } },
        plotOptions: { bar: { borderRadius: 10, horizontal: true } },
        colors: ['#8b5cf6'],
        xaxis: { categories: ['FB Accts', 'Instagram', 'VPN', 'TikTok', 'SMS OTP'], labels: { style: { colors: color } } },
        yaxis: { labels: { style: { colors: color } } }
    };
    salesChart = new ApexCharts(document.querySelector("#bestSellingChart"), salesOptions);
    salesChart.render();
}

// --- FEATURE: FILTERING LOGIC ---
function updateTimeframe(period, btn) {
    // UI Update
    document.querySelectorAll('.f-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Simulate Data Change based on period
    const mockData = {
        days: [30, 40, 35, 50, 49, 60, 70],
        weeks: [200, 450, 300, 500, 400, 600, 550],
        months: [1200, 1500, 1100, 1800, 2000, 2400, 2100],
        years: [15000, 25000, 22000, 30000, 45000, 50000, 60000]
    };

    growthChart.updateSeries([{ data: mockData[period] }]);

    // Update KPI Text for effect
    const revs = { days: "₦4,250", weeks: "₦28,400", months: "₦142,000", years: "₦1,850,000" };
    document.getElementById('revValue').innerText = revs[period];
}

// --- FEATURE: SEARCH LOGIC ---
function handleSearch() {
    const query = document.getElementById('dashboardSearch').value.toLowerCase();
    const rows = document.querySelectorAll('.stock-item-row');

    rows.forEach(row => {
        const text = row.getAttribute('data-name');
        row.style.display = text.includes(query) ? "flex" : "none";
    });
}

// --- FEATURE: VIEW ALL TOGGLE ---
function toggleInventory() {
    const list = document.getElementById('stockList');
    const btn = document.getElementById('viewAllStock');
    list.classList.toggle('show-all');

    btn.innerText = list.classList.contains('show-all') ? "View Less" : "View All";
}