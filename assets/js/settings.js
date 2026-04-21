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

    if (currentPage === "") {
        currentPage = "index.html";
    }

    const navLinks = document.querySelectorAll('.side-links a');

    navLinks.forEach(link => {
        let linkPage = link.getAttribute("href");

        // Ignore empty or #
        if (!linkPage || linkPage === "#") return;

        linkPage = linkPage.split("/").pop();

        if (linkPage === currentPage) {
            link.parentElement.classList.add("active");
        } else {
            link.parentElement.classList.remove("active");
        }
    });

});

// Settings
document.addEventListener('DOMContentLoaded', () => {
    const tabs = document.querySelectorAll('.g-tab');
    const panes = document.querySelectorAll('.tab-pane');
    const saveBtn = document.getElementById('saveBtn');

    // Tab Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.content;

            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            panes.forEach(p => {
                p.classList.remove('active');
                if(p.id === target) p.classList.add('active');
            });
        });
    });

    // Save Button Animation
    saveBtn.addEventListener('click', () => {
        const originalText = saveBtn.innerHTML;
        saveBtn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
        saveBtn.style.pointerEvents = "none";

        setTimeout(() => {
            saveBtn.innerHTML = "<i class='bx bx-check-circle'></i> Settings Updated!";
            saveBtn.style.background = "var(--teal)";

            setTimeout(() => {
                saveBtn.innerHTML = originalText;
                saveBtn.style.background = "var(--primary)";
                saveBtn.style.pointerEvents = "all";
            }, 2000);
        }, 1200);
    });
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