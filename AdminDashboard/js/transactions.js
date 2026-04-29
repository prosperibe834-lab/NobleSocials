function masterFilter() {
    console.log("Search is being triggered!"); // Add this line
    // ... rest of the code
}

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


// ================================
// 🔥 CLEAN DARK MODE + SIDEBAR FIX
// ================================

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const modeToggle = document.querySelector('.mode');
    const modeText = document.querySelector('.mode-text');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');

    // ✅ LOAD SAVED THEME
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark');
        if (modeText) modeText.innerText = "Light Mode";
    }

    // ✅ DARK MODE TOGGLE (SAFE)
    if (modeToggle) {
        modeToggle.addEventListener('click', () => {
            body.classList.toggle('dark');

            const isDark = body.classList.contains('dark');

            localStorage.setItem('theme', isDark ? 'dark' : 'light');

            if (modeText) {
                modeText.innerText = isDark ? "Light Mode" : "Dark Mode";
            }
        });
    }

    // ✅ MOBILE SIDEBAR
    if (mobileToggleBtn) {
        mobileToggleBtn.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeSidebarBtn) {
        closeSidebarBtn.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }
});


                                // Main Contents Starts here
/**
 * Master Filter Functionality
 * Filters based on Search Query, Date, Type, and Status simultaneously.
 */
function masterFilter() {
    // Get filter values
    const searchQuery = document.getElementById('transSearch').value.toLowerCase();
    const selectedDate = document.getElementById('dateFilter').value;
    const selectedType = document.getElementById('typeFilter').value;
    const selectedStatus = document.getElementById('statusFilter').value;

    const rows = document.querySelectorAll('.t-row');

    rows.forEach(row => {
        const rowText = row.innerText.toLowerCase();
        const rowDate = row.getAttribute('data-date');
        const rowType = row.getAttribute('data-type');
        const rowStatus = row.getAttribute('data-status');

        // Logic checks
        const matchesSearch = rowText.includes(searchQuery);
        const matchesDate = selectedDate === "" || rowDate === selectedDate;
        const matchesType = selectedType === "all" || rowType === selectedType;
        const matchesStatus = selectedStatus === "all" || rowStatus === selectedStatus;

        // Apply display based on all conditions
        if (matchesSearch && matchesDate && matchesType && matchesStatus) {
            row.style.display = "table-row";
            row.style.animation = "fadeIn 0.4s ease forwards";
        } else {
            row.style.display = "none";
        }
    });
}

// Sidebar & Mobile logic (copied from your main script for consistency)
document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    const modeToggle = document.querySelector('.mode');
    const modeText = document.querySelector('.mode-text');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const sidebar = document.querySelector('.sidebar');
    const closeSidebar = document.getElementById('close-sidebar');

    // Theme logic
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        if(modeText) modeText.innerText = "Light Mode";
    }

    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        const isDark = body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        if(modeText) modeText.innerText = isDark ? "Light Mode" : "Dark Mode";
    });

    // Mobile Sidebar
    mobileToggleBtn.addEventListener('click', () => sidebar.classList.add('active'));
    closeSidebar.addEventListener('click', () => sidebar.classList.remove('active'));
});


function downloadCSV() {
    const rows = document.querySelectorAll("#transactionsTable tr");
    let csvData = [];
    
    // 1. Loop through each row in the table
    for (let i = 0; i < rows.length; i++) {
        // Skip hidden rows (rows hidden by your search/filter)
        if (rows[i].style.display === 'none') continue;

        let row = [], cols = rows[i].querySelectorAll("td, th");
        
        // 2. Loop through each column
        for (let j = 0; j < cols.length; j++) {
            // Clean the text: remove extra spaces, newlines, and commas
            let data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, " ").replace(/,/g, "");
            row.push(data);
        }
        csvData.push(row.join(","));
    }

    // 3. Create the CSV file
    const csvString = csvData.join("\n");
    const blob = new Blob([csvString], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    
    // 4. Create a temporary link to "click" and download
    const a = document.createElement('a');
    a.setAttribute('hidden', '');
    a.setAttribute('href', url);
    a.setAttribute('download', 'NobleSocials_Transactions.csv');
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}