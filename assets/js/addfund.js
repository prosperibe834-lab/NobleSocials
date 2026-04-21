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

    // ✅ FIXED
    const eyeBtn = document.getElementById('balance-eye-btn');
    const balances = document.querySelectorAll('.balance-text');

    // 1. Theme Switcher
    if (themeCheckbox) {
        themeCheckbox.addEventListener('change', () => {
            document.body.classList.toggle('dark-mode');
            localStorage.setItem('theme', document.body.classList.contains('dark-mode') ? 'dark' : 'light');
        });

        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-mode');
            themeCheckbox.checked = true;
        }
    }

    // 2. Mobile Menu Toggle
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // 3. Balance Toggle ✅
    let isHidden = false;

    if (eyeBtn) {
        eyeBtn.addEventListener('click', () => {
            isHidden = !isHidden;

            balances.forEach(el => {
                const realValue = el.getAttribute('data-val');
                el.textContent = isHidden ? '****' : realValue;
            });

            eyeBtn.classList.toggle('bx-show');
            eyeBtn.classList.toggle('bx-hide');
        });
    }

    // 4. Close sidebar on mobile click ✅ FIXED
    const mainContent = document.querySelector('.content-wrapper');

    if (mainContent) {
        mainContent.addEventListener('click', () => {
            if (window.innerWidth <= 992) {
                sidebar.classList.remove('active');
            }
        });
    }

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

// 4. Modal Logic
document.addEventListener("DOMContentLoaded", () => {

    const modal = document.getElementById('fundModal');
    const openBtns = document.querySelectorAll('.fund-modal-trigger');
    const closeBtn = document.querySelector('.close-modal');
    const amountInput = document.getElementById('fundAmount');
    const chips = document.querySelectorAll('.chip');

    if (!modal) return;

    // OPEN
    openBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        });
    });

    // CLOSE BUTTON
    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        });
    }

    // CLICK OUTSIDE
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // CHIP CLICK
    chips.forEach(chip => {
        chip.addEventListener('click', () => {
            const val = chip.innerText.replace('₦', '').replace(',', '');
            amountInput.value = val;
            document.querySelector('.btn-submit').style.background = 'var(--primary)';
        });
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