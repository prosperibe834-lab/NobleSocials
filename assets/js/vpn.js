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


                                // Main Starts here
// SMART FUZZY SEARCH LOGIC
// --- SMART SEARCH LOGIC --- //
function filterVpns() {
    const filter = document.getElementById('vpnSearch').value.toLowerCase().trim();
    const select = document.getElementById('vpnProvider');
    const options = select.getElementsByTagName('option');
    const groups = select.getElementsByTagName('optgroup');

    for (let opt of options) {
        const match = opt.text.toLowerCase().includes(filter);
        opt.style.display = match ? "" : "none";
        if(match && filter !== "") {
            select.value = opt.value;
            calculatePrice();
        }
    }
    for (let group of groups) {
        const visible = Array.from(group.children).some(o => o.style.display !== "none");
        group.style.display = visible ? "" : "none";
    }
}

// --- PRICE LOGIC --- //
function calculatePrice() {
    const provider = document.getElementById('vpnProvider');
    const duration = document.getElementById('vpnDuration').value;
    const base = parseInt(provider.options[provider.selectedIndex].getAttribute('data-price') || 0);
    
    let multi = 1;
    if(duration == "7") multi = 6;
    if(duration == "30") multi = 20;
    if(duration == "365") multi = 150;

    const total = base * multi;
    document.getElementById('totalPriceDisplay').innerText = `₦${total.toLocaleString()}.00`;
}

// --- REDIRECT ON SUCCESS --- //
document.getElementById('vpnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('buyBtn');
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
    btn.disabled = true;

    setTimeout(() => {
        document.getElementById('successModal').classList.add('show');
        setTimeout(() => {
            window.location.href = "vpnlogs.html";
        }, 2500);
    }, 1500);
});

function autoFill(country, prov, dur) {
    document.getElementById('vpnCountry').value = country;
    document.getElementById('vpnProvider').value = prov;
    document.getElementById('vpnDuration').value = dur;
    calculatePrice();
}

// --- Update your existing vpnForm listener in vpn.js ---
document.getElementById('vpnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // 1. Get the values the user chose
    const selectedVpn = document.getElementById('vpnProvider').options[document.getElementById('vpnProvider').selectedIndex].text;
    const selectedPrice = document.getElementById('totalPriceDisplay').innerText;
    
    // 2. SAVE them to the browser's memory
    localStorage.setItem('lastPurchasedVpn', selectedVpn);
    localStorage.setItem('lastPurchasedPrice', selectedPrice);

    const btn = document.getElementById('buyBtn');
    btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Processing...";
    
    setTimeout(() => {
        document.getElementById('successModal').classList.add('show');
        setTimeout(() => {
            window.location.href = "vpnlogs.html"; // Redirect to logs
        }, 2000);
    }, 1500);
});

// Add this to your existing vpn.js
function calculatePrice() {
    const provider = document.getElementById('vpnProvider');
    const duration = document.getElementById('vpnDuration');
    const basePrice = parseInt(provider.options[provider.selectedIndex].getAttribute('data-price'));
    const days = parseInt(duration.value);
    
    let total = basePrice * days;
    if(days === 365) total = total * 0.4; // 60% off for yearly
    
    document.getElementById('totalPriceDisplay').innerText = `₦${total.toLocaleString()}.00`;
}

document.getElementById('vpnForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // SAVE DATA TO MEMORY
    const vpnName = document.getElementById('vpnProvider').options[document.getElementById('vpnProvider').selectedIndex].text;
    const vpnVal = document.getElementById('vpnProvider').value; // e.g. "nord"
    const duration = document.getElementById('vpnDuration').value;

    localStorage.setItem('selectedVpnName', vpnName);
    localStorage.setItem('selectedVpnKey', vpnVal); 
    localStorage.setItem('selectedDuration', duration);
    localStorage.setItem('purchaseTimestamp', new Date().getTime());

    // Show Modal and Redirect
    document.getElementById('successModal').classList.add('show');
    setTimeout(() => {
        window.location.href = "vpnlogs.html";
    }, 2500);
});

