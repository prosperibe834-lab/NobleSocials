window.addEventListener('load', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1000);
});

document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const eyeBtn = document.getElementById('balance-eye-btn');
    const balances = document.querySelectorAll('.text-balance');

    // 1. Theme Switcher
    themeCheckbox.addEventListener('change', () => {
        document.body.classList.toggle('dark-mode');
        localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
    });

    // Load saved theme
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeCheckbox.checked = true;
    }

    // 2. Mobile Menu Toggle
    mobileToggle.addEventListener('click', () => {
        sidebar.classList.toggle('active');
    });

    // 3. Balance Visibility Toggle
    let isHidden = false;
    eyeBtn.addEventListener('click', () => {
        isHidden = !isHidden;
        balances.forEach(el => {
            el.textContent = isHidden ? '****' : '#0.00';
        });
        eyeBtn.classList.toggle('bx-show');
        eyeBtn.classList.toggle('bx-hide');
    });

    // Close sidebar when clicking main content on mobile
    document.querySelector('.main-content').addEventListener('click', () => {
        if (window.innerWidth <= 992) sidebar.classList.remove('active');
    });
});

// ===== ACTIVE NAV BASED ON PAGE =====
// ===== ACTIVE SIDEBAR BASED ON CURRENT PAGE =====
// ===== ACTIVE SIDEBAR (FINAL FIX) =====
document.addEventListener("DOMContentLoaded", () => {

    let currentPage = window.location.pathname.split("/").pop();

    // Debug (check console)
    console.log("Current Page:", currentPage);

    // Fix for empty path (like GitHub or localhost root)
    if (currentPage === "") {
        currentPage = "index.html";
    }

    const navItems = document.querySelectorAll('.side-links li');

    navItems.forEach(item => {
        const link = item.querySelector('a');

        if (!link) return;

        let linkPage = link.getAttribute('href').split("/").pop();

        console.log("Checking:", linkPage);

        // Remove active first (important)
        item.classList.remove('active');

        if (linkPage === currentPage) {
            item.classList.add('active');
        }
    });

});


// Main
document.addEventListener("DOMContentLoaded", () => {
    const orderTabs = document.querySelectorAll('#order-tabs .tab-btn');
    const totalCountDisplay = document.getElementById('total-count-display');

    // Function to update the number of rows dynamically
    const updateTotalCount = (activeView) => {
        const rowCount = activeView.querySelectorAll('tbody tr').length;
        totalCountDisplay.textContent = rowCount;
    };

    // Initialize count on page load based on the first active view
    const initialView = document.querySelector('.active-view');
    if (initialView) updateTotalCount(initialView);

    // Tab Switching Logic
    if (orderTabs.length > 0) {
        orderTabs.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active classes
                orderTabs.forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.table-container').forEach(view => {
                    view.classList.remove('active-view');
                    view.classList.add('hidden-view');
                });

                // Add active class to clicked button & target view
                btn.classList.add('active');
                const targetId = btn.getAttribute('data-target');
                const activeView = document.getElementById(targetId);

                activeView.classList.remove('hidden-view');
                activeView.classList.add('active-view');

                // Update total count
                updateTotalCount(activeView);
            });
        });
    }
});



// Notification starts here

// Notification starts here
function togglePanel(e) {
    e.stopPropagation();
    document.getElementById('notifPanel').classList.toggle('show');
}

function markAsRead(el) {
    el.classList.remove('unread');
    updateBadge();
}

function markAllAsRead() {
    document.querySelectorAll('.notif-item.unread')
        .forEach(el => el.classList.remove('unread'));
    updateBadge();
}

function updateBadge() {
    const count = document.querySelectorAll('.notif-item.unread').length;
    const badge = document.getElementById('mainBadge');
    badge.innerText = count;
    badge.style.display = count ? 'flex' : 'none';
}

function loadMore() {
    const list = document.getElementById('notifList');

    const newNotif = document.createElement('div');
    newNotif.className = 'notif-item unread';
    newNotif.onclick = function () { markAsRead(this); };

    newNotif.innerHTML = `
                                            <div class="n-icon" style="color:#3b82f6; background:#dbeafe;">
                                                <i class='bx bx-refresh'></i>
                                            </div>
                                            <div class="n-info">
                                                <p class="n-title">Refund Processed</p>
                                                <p class="n-desc">Your refund has been sent.</p>
                                                <span class="n-time">Now</span>
                                            </div>
                                        `;

    list.appendChild(newNotif);
    updateBadge();
}

/* CLOSE OUTSIDE */
window.onclick = function (e) {
    if (!e.target.closest('.notif-wrapper')) {
        document.getElementById('notifPanel').classList.remove('show');
    }
}