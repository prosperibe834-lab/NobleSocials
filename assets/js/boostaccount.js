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

document.addEventListener('DOMContentLoaded', () => {
    const catSelect = document.getElementById('category-select');
    const commentLogic = document.getElementById('comment-logic-area');
    const platSelect = document.getElementById('platform-select');
    const platPreview = document.getElementById('platform-preview');
    const qtyInput = document.getElementById('quantity-input');
    const totalDisplay = document.getElementById('total-price');

    // 1. Switch Icons based on platform
    platSelect.addEventListener('change', () => {
        const selectedOption = platSelect.options[platSelect.selectedIndex];
        platPreview.className = `platform-icon ${selectedOption.dataset.icon}`;
    });

    // 2. Show/Hide Comment Logic
    catSelect.addEventListener('change', () => {
        if (catSelect.value === 'comments') {
            commentLogic.style.display = 'block';
        } else {
            commentLogic.style.display = 'none';
        }
        updatePrice();
    });

    // 3. Price Calculation Logic
    function updatePrice() {
        const qty = parseInt(qtyInput.value) || 0;
        let baseRate = 0.8; // default rate

        // Category Adjustment
        if (catSelect.value === 'comments') {
            const cType = document.getElementById('comment-type').value;
            baseRate = (cType === 'verified') ? 50.0 : 4.5;
        } else if (catSelect.value === 'views') {
            baseRate = 0.2;
        }

        // Quality Multiplier
        const quality = document.querySelector('input[name="quality"]:checked').value;
        const multiplier = (quality === 'high') ? 1.6 : 1.0;

        const total = qty * baseRate * multiplier;
        
        // Update Price with smooth transition
        totalDisplay.innerText = `#${total.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
    }

    // Attach Listeners
    qtyInput.addEventListener('input', updatePrice);
    document.getElementById('comment-type').addEventListener('change', updatePrice);
    document.querySelectorAll('input[name="quality"]').forEach(radio => {
        radio.addEventListener('change', updatePrice);
    });
});