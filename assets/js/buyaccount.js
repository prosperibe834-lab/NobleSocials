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
    // 1. Defined Data Structures (This would normally come from your DB)
    const socialData = {
        facebook: {
            categories: ["Country Accounts (PVA)", "Facebook Dating Profiles", "Pages with High Followers", "Groups Admins", "Aged Accounts (<50 followers)", "High Follower Profiles"],
            countries: ["USA", "UK", "Canada", "Germany", "Nigeria", "Global"],
            description: "Instant activation, Phone Verified Accounts (PVA), 2FA Security enabled.",
            stock: 45,
            price: 5000 // In Naira
        },
        instagram: {
            categories: ["Niche Specific Profiles", "High Engagement Profiles", "Aged Accounts (2015-2018)", "Influencer Level (5k+ followers)"],
            countries: ["USA", "UK", "Global"],
            description: "High quality engagement profiles, verified, Includes recovery information.",
            stock: 22,
            price: 7500
        },
        tiktok: {
            categories: ["US Creators accounts", "Creator Fund Active Accounts", "High Viral Profiles", "Aged (0-50 Followers)"],
            countries: ["USA", "UK", "Malaysia", "Global"],
            description: "Accounts optimized for US audience visibility, high virality potential.",
            stock: 13,
            price: 3500
        },
        twitter: {
            categories: ["Twitter Blue Verified", "Aged Accounts (2012+)", "Crypto Niche Accounts"],
            countries: ["USA", "Global"],
            description: "Accounts with aged activity, ready for marketing automation.",
            stock: 8,
            price: 12000
        },
        linkedin: {
            categories: ["Professional Connections (500+)", "Aged Recruiter Profiles", "Sales Navigator Profiles"],
            countries: ["USA", "UK", "India"],
            description: "Optimized for professional networking and sales prospecting.",
            stock: 5,
            price: 25000
        }
    };

    // 2. DOM Elements
    const socialSelect = document.getElementById('social-account');
    const categorySelect = document.getElementById('select-category');
    const countrySelect = document.getElementById('select-country');
    const stockValueDisplay = document.getElementById('stock-value');
    const qtyInput = document.getElementById('quantity');
    const descriptionBox = document.getElementById('product-description');

    // Preview Preview DOM
    const previewCard = document.getElementById('account-preview-card');
    const previewType = document.getElementById('preview-type');
    const previewCategoryText = document.getElementById('preview-category');
    const dynamicIcon = document.getElementById('dynamic-social-icon');

    // Prices and Total DOM
    const unitPriceDisplay = document.getElementById('unit-price-display');
    const quantityDisplay = document.getElementById('quantity-display');
    const totalPriceDisplay = document.getElementById('total-price-display');

    // Variables for calculation
    let currentUnitPrice = 0;

    // 3. Helper Function to Populate Dropdowns
    const populateDropdown = (dropdownElement, itemsList) => {
        // Clear old options
        dropdownElement.innerHTML = '';

        // Add default placeholder
        const defaultOption = document.createElement('option');
        defaultOption.value = "";
        defaultOption.disabled = true;
        defaultOption.selected = true;
        defaultOption.textContent = "Choose Specific Option...";
        dropdownElement.appendChild(defaultOption);

        // Add new items
        itemsList.forEach(item => {
            const option = document.createElement('option');
            option.value = item.toLowerCase().replace(/ /g, "_"); // Optional: Create a value key
            option.textContent = item;
            dropdownElement.appendChild(option);
        });
    };

    const updateCalculations = () => {
        const quantity = parseInt(qtyInput.value) || 1;

        // Update simple displays
        quantityDisplay.textContent = quantity;
        unitPriceDisplay.textContent = currentUnitPrice.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });

        // Update grand total
        const grandTotal = currentUnitPrice * quantity;
        totalPriceDisplay.textContent = grandTotal.toLocaleString('en-US', { style: 'currency', currency: 'NGN' });
    };

    const updateSocialIcon = (platform) => {
        dynamicIcon.innerHTML = ''; // Clear previous
        const iconElement = document.createElement('i');

        switch (platform) {
            case 'facebook': iconElement.className = 'bx bxl-facebook facebook-icon'; break;
            case 'instagram': iconElement.className = 'bx bxl-instagram instagram-icon'; break;
            case 'tiktok': iconElement.className = 'bx bxl-tiktok tiktok-icon'; break;
            case 'twitter': iconElement.className = 'bx bxl-twitter twitter-icon'; break;
            case 'linkedin': iconElement.className = 'bx bxl-linkedin linkedin-icon'; break;
            default: iconElement.className = 'bx bx-question-mark'; break;
        }
        dynamicIcon.appendChild(iconElement);
    }

    // 4. Main Event Listener: When the Social Account selection changes
    socialSelect.addEventListener('change', () => {
        const selectedSocial = socialSelect.value;
        const data = socialData[selectedSocial];

        if (data) {
            // Populate and unlock the Category and Country dropdowns
            populateDropdown(categorySelect, data.categories);
            populateDropdown(countrySelect, data.countries);
            categorySelect.disabled = false;
            countrySelect.disabled = false;
            qtyInput.disabled = false;

            // Update display fields (Stock, Description, Prices)
            stockValueDisplay.textContent = data.stock;
            stockValueDisplay.className = 'stock-box text-success'; // Reset color just in case
            descriptionBox.textContent = data.description;
            currentUnitPrice = data.price;

            // Update Order Preview Preview Card text/icon
            previewType.textContent = selectedSocial.charAt(0).toUpperCase() + selectedSocial.slice(1);
            previewCategoryText.textContent = `(${data.categories[0]})`;
            updateSocialIcon(selectedSocial);

            // Run final price update
            updateCalculations();
        }
    });

    // 5. Quantity Listener: Update totals when quantity changes
    qtyInput.addEventListener('input', () => {
        updateCalculations();
    });

    // Helper: Coupon Toggler
    const couponTrigger = document.getElementById('coupon-trigger');
    const couponInputGroup = document.getElementById('coupon-input-group');

    couponTrigger.addEventListener('click', () => {
        couponInputGroup.classList.toggle('hidden');
    });


    if (eyeBtn) {
        eyeBtn.addEventListener('click', () => {
            isHidden = !isHidden;
            balances.forEach(el => {
                el.textContent = isHidden ? '****' : '#0.00';
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