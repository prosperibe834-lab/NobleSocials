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
    const modal = document.getElementById('adminModal');
    const serviceForm = document.getElementById('serviceForm');
    const openAddBtn = document.getElementById('openAddModal');
    const closeBtn = document.querySelector('.close-modal-btn');

    // Open for Add
    openAddBtn.onclick = () => {
        document.getElementById('modalTitle').innerText = "New Service Configuration";
        serviceForm.reset();
        modal.style.display = 'flex';
    }

    // Open for Update
    document.addEventListener('click', (e) => {
        if (e.target.closest('.update-trigger')) {
            const btn = e.target.closest('.update-trigger');
            document.getElementById('modalTitle').innerText = "Adjust Service";
            
            document.getElementById('srv-platform').value = btn.dataset.plat;
            document.getElementById('srv-category').value = btn.dataset.cat;
            document.getElementById('srv-rate').value = btn.dataset.rate;
            document.querySelector(`input[name="srv-quality"][value="${btn.dataset.quality}"]`).checked = true;

            modal.style.display = 'flex';
        }
    });

    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => { if (e.target === modal) modal.style.display = 'none'; }

    serviceForm.onsubmit = (e) => {
        e.preventDefault();
        const subBtn = e.target.querySelector('.fin-submit-btn');
        subBtn.innerHTML = "Processing...";
        setTimeout(() => {
            alert("System Synced Successfully!");
            subBtn.innerHTML = "<span>Sync Ecosystem</span> <i class='bx bx-refresh'></i>";
            modal.style.display = 'none';
        }, 1500);
    }
});


document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const orderRows = document.querySelectorAll('.order-row');

    // 1. FILTERING LOGIC
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.dataset.filter;

            // Show/Hide Rows
            orderRows.forEach(row => {
                if (filterValue === 'all') {
                    row.style.display = 'table-row';
                } else if (row.dataset.status === filterValue) {
                    row.style.display = 'table-row';
                } else {
                    row.style.display = 'none';
                }
            });
        });
    });
});

// 2. FINALIZE LOGIC
function handleFinalize(btn) {
    const row = btn.closest('.order-row');
    const badge = row.querySelector('.badge');
    
    // Animate change
    btn.style.transform = "scale(0.8)";
    
    setTimeout(() => {
        row.dataset.status = "completed";
        badge.className = "badge b-success";
        badge.innerText = "Completed";
        btn.className = "finalize-btn done";
        btn.innerHTML = "<i class='bx bx-check-double'></i>";
        btn.style.transform = "scale(1)";
        
        // If current filter is "pending", hide the row immediately
        const activeFilter = document.querySelector('.filter-btn.active').dataset.filter;
        if(activeFilter === 'pending') {
            row.style.display = 'none';
        }
    }, 300);
}

function copyToClipboard(text, btn) {
    navigator.clipboard.writeText(text).then(() => {
        // Change icon to show success
        const originalIcon = btn.innerHTML;
        btn.innerHTML = "<i class='bx bx-check'></i>";
        btn.classList.add('copied');
        
        // Reset after 2 seconds
        setTimeout(() => {
            btn.innerHTML = originalIcon;
            btn.classList.remove('copied');
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}


const filterBtns = document.querySelectorAll('.filter-btn');
const rows = document.querySelectorAll('.order-row');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // 1. Remove active class from all buttons and add to this one
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filter = btn.getAttribute('data-filter');

        // 2. Show/Hide logic
        rows.forEach(row => {
            const status = row.getAttribute('data-status');
            if (filter === 'all' || filter === status) {
                row.style.display = 'table-row'; // Show it
            } else {
                row.style.display = 'none'; // Hide it
            }
        });
    });
});