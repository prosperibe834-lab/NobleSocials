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
const countries = [
    // Europe
    { name: "United Kingdom", code: "gb", reg: "europe", price: 1500 },
    { name: "Germany", code: "de", reg: "europe", price: 1800 },
    { name: "France", code: "fr", reg: "europe", price: 1400 },
    { name: "Netherlands", code: "nl", reg: "europe", price: 1600 },
    // Americas
    { name: "USA", code: "us", reg: "america", price: 1200 },
    { name: "Canada", code: "ca", reg: "america", price: 1300 },
    { name: "Brazil", code: "br", reg: "america", price: 900 },
    // Asia
    { name: "China", code: "cn", reg: "asia", price: 1100 },
    { name: "India", code: "in", reg: "asia", price: 400 },
    { name: "Japan", code: "jp", reg: "asia", price: 2000 },
    // Australia/Oceania
    { name: "Australia", code: "au", reg: "oceania", price: 2200 },
    { name: "New Zealand", code: "nz", reg: "oceania", price: 2100 }
];

document.addEventListener('DOMContentLoaded', () => {
    let selectedCountryPrice = 0;
    let selectedServiceMod = 1;

    const grid = document.getElementById('country-grid');
    const search = document.getElementById('country-search');
    const regionBtns = document.querySelectorAll('.reg-btn');
    const picker = document.getElementById('service-picker');

    function render(filter = "", region = "all") {
        grid.innerHTML = "";
        countries.forEach(c => {
            const matchesSearch = c.name.toLowerCase().includes(filter.toLowerCase());
            const matchesRegion = region === "all" || c.reg === region;

            if (matchesSearch && matchesRegion) {
                const item = document.createElement('div');
                item.className = "country-card";
                item.innerHTML = `<img src="https://flagcdn.com/w40/${c.code}.png"> <span>${c.name}</span>`;
                item.onclick = () => {
                    document.querySelectorAll('.country-card').forEach(x => x.classList.remove('active'));
                    item.classList.add('active');
                    selectedCountryPrice = c.price;
                    document.getElementById('res-country').textContent = c.name;
                    document.getElementById('res-icon').innerHTML = `<img src="https://flagcdn.com/w80/${c.code}.png" style="width:100%; border-radius:8px">`;
                    calculate();
                };
                grid.appendChild(item);
            }
        });
    }

    function calculate() {
        const base = selectedCountryPrice;
        const total = base * selectedServiceMod;
        document.getElementById('base-price').textContent = `₦${base.toLocaleString()}`;
        document.getElementById('final-total').textContent = `₦${total.toLocaleString()}`;
        document.getElementById('buy-btn').disabled = (total === 0);
    }

    // Search & Filter Events
    search.addEventListener('input', (e) => render(e.target.value, document.querySelector('.reg-btn.active').dataset.region));

    regionBtns.forEach(btn => {
        btn.onclick = () => {
            regionBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            render(search.value, btn.dataset.region);
        }
    });

    // Service Picker Events
    picker.onclick = () => picker.classList.toggle('open');
    picker.querySelectorAll('.service-option').forEach(opt => {
        opt.onclick = (e) => {
            e.stopPropagation();
            document.getElementById('res-service').textContent = opt.dataset.service;
            picker.querySelector('.trigger-content span').textContent = opt.dataset.service;
            selectedServiceMod = parseFloat(opt.dataset.priceMod);
            picker.classList.remove('open');
            calculate();
        }
    });

    render();

                                        // This handles the "Purchase" button click

    // This handles the "Purchase" button click
    document.getElementById('buy-btn').addEventListener('click', function () {
        // 1. Get the names of what the user selected from the screen
        const countryName = document.getElementById('res-country').textContent;
        const serviceName = document.getElementById('res-service').textContent;

        // 2. Look for the flag image we displayed and get its code (like 'us' or 'gb')
        const flagImg = document.getElementById('res-icon').querySelector('img');
        let flagCode = "us"; // default to US if something goes wrong
        if (flagImg) {
            // This extracts 'us' from 'https://flagcdn.com/w80/us.png'
            flagCode = flagImg.src.split('/').pop().split('.')[0];
        }

        // 3. SAVE these to the browser's "Sticky Note" (LocalStorage)
        localStorage.setItem('selectedCountry', countryName);
        localStorage.setItem('selectedService', serviceName);
        localStorage.setItem('selectedFlag', flagCode);

        // 4. NOW move to the activation page
        window.location.href = "activation.html";
    });
    
});


