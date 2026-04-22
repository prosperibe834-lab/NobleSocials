/* ============================================================
   COMBINED SITE CORE & FINTECH VERIFICATION LOGIC
   ============================================================ */

// 1. PRELOADER LOGIC
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.style.opacity = '0';
            setTimeout(() => preloader.style.display = 'none', 500);
        }, 1000);
    }
});

// 2. CORE UI FUNCTIONALITY
document.addEventListener('DOMContentLoaded', () => {
    const themeCheckbox = document.getElementById('theme-checkbox');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const eyeBtn = document.getElementById('balance-eye-btn');
    const balances = document.querySelectorAll('.text-balance');

    // Theme Switcher
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

    // Mobile Menu Toggle
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('active');
        });
    }

    // Balance Visibility Toggle
    let isHidden = false;
    if (eyeBtn) {
        eyeBtn.addEventListener('click', () => {
            isHidden = !isHidden;
            balances.forEach(el => {
                el.textContent = isHidden ? '****' : '#0.00';
            });
            eyeBtn.classList.toggle('bx-show');
            eyeBtn.classList.toggle('bx-hide');
        });
    }

    // Close sidebar on mobile when clicking content
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        mainContent.addEventListener('click', () => {
            if (window.innerWidth <= 992 && sidebar) sidebar.classList.remove('active');
        });
    }

    // Active Sidebar Link Fix
    let currentPage = window.location.pathname.split("/").pop() || "index.html";
    const navItems = document.querySelectorAll('.side-links li');
    navItems.forEach(item => {
        const link = item.querySelector('a');
        if (link) {
            let linkPage = link.getAttribute('href').split("/").pop();
            item.classList.remove('active');
            if (linkPage === currentPage) item.classList.add('active');
        }
    });

    // Initialize the Verification Dropdowns
    initDropdowns();
});

// 3. NOTIFICATION SYSTEM
function togglePanel(e) {
    e.stopPropagation();
    document.getElementById('notifPanel').classList.toggle('show');
}

function markAsRead(el) {
    el.classList.remove('unread');
    updateBadge();
}

function markAllAsRead() {
    document.querySelectorAll('.notif-item.unread').forEach(el => el.classList.remove('unread'));
    updateBadge();
}

function updateBadge() {
    const count = document.querySelectorAll('.notif-item.unread').length;
    const badge = document.getElementById('mainBadge');
    if (badge) {
        badge.innerText = count;
        badge.style.display = count ? 'flex' : 'none';
    }
}

window.onclick = function (e) {
    if (!e.target.closest('.notif-wrapper')) {
        const panel = document.getElementById('notifPanel');
        if (panel) panel.classList.remove('show');
    }
}

// 4. FINTECH VERIFICATION DATA (50 TOP COUNTRIES)
const countries = [
    { name: "United States", code: "us", dial: "+1" },
    { name: "United Kingdom", code: "gb", dial: "+44" },
    { name: "Nigeria", code: "ng", dial: "+234" },
    { name: "Canada", code: "ca", dial: "+1" },
    { name: "Australia", code: "au", dial: "+61" },
    { name: "Germany", code: "de", dial: "+49" },
    { name: "France", code: "fr", dial: "+33" },
    { name: "India", code: "in", dial: "+91" },
    { name: "South Africa", code: "za", dial: "+27" },
    { name: "UAE", code: "ae", dial: "+971" },
    { name: "China", code: "cn", dial: "+86" },
    { name: "Brazil", code: "br", dial: "+55" },
    { name: "Mexico", code: "mx", dial: "+52" },
    { name: "Japan", code: "jp", dial: "+81" },
    { name: "Russia", code: "ru", dial: "+7" },
    { name: "Spain", code: "es", dial: "+34" },
    { name: "Italy", code: "it", dial: "+39" },
    { name: "Netherlands", code: "nl", dial: "+31" },
    { name: "Saudi Arabia", code: "sa", dial: "+966" },
    { name: "Turkey", code: "tr", dial: "+90" },
    { name: "South Korea", code: "kr", dial: "+82" },
    { name: "Singapore", code: "sg", dial: "+65" },
    { name: "Malaysia", code: "my", dial: "+60" },
    { name: "Indonesia", code: "id", dial: "+62" },
    { name: "Egypt", code: "eg", dial: "+20" },
    { name: "Kenya", code: "ke", dial: "+254" },
    { name: "Ghana", code: "gh", dial: "+233" },
    { name: "Sweden", code: "se", dial: "+46" },
    { name: "Switzerland", code: "ch", dial: "+41" },
    { name: "Norway", code: "no", dial: "+47" },
    { name: "Denmark", code: "dk", dial: "+45" },
    { name: "Portugal", code: "pt", dial: "+351" },
    { name: "Ireland", code: "ie", dial: "+353" },
    { name: "Belgium", code: "be", dial: "+32" },
    { name: "Poland", code: "pl", dial: "+48" },
    { name: "Ukraine", code: "ua", dial: "+380" },
    { name: "Israel", code: "il", dial: "+972" },
    { name: "Thailand", code: "th", dial: "+66" },
    { name: "Vietnam", code: "vn", dial: "+84" },
    { name: "Argentina", code: "ar", dial: "+54" },
    { name: "Colombia", code: "co", dial: "+57" },
    { name: "Chile", code: "cl", dial: "+56" },
    { name: "Pakistan", code: "pk", dial: "+92" },
    { name: "Bangladesh", code: "bd", dial: "+880" },
    { name: "Philippines", code: "ph", dial: "+63" },
    { name: "New Zealand", code: "nz", dial: "+64" },
    { name: "Finland", code: "fi", dial: "+358" },
    { name: "Greece", code: "gr", dial: "+30" },
    { name: "Austria", code: "at", dial: "+43" },
    { name: "Czech Republic", code: "cz", dial: "+420" }
].sort((a, b) => a.name.localeCompare(b.name));

const services = [
    { name: "Any Service", icon: "bx-shield-quarter" },
    { name: "WhatsApp", icon: "bxl-whatsapp" },
    { name: "Telegram", icon: "bxl-telegram" },
    { name: "Binance", icon: "bx-bitcoin" },
    { name: "Facebook", icon: "bxl-facebook-circle" },
    { name: "Google", icon: "bxl-google" },
    { name: "Instagram", icon: "bxl-instagram" },
    { name: "Netflix", icon: "bx-play-circle" },
    { name: "Amazon", icon: "bxl-amazon" },
    { name: "Tinder", icon: "bx-heart" }
];

let selectedCountryData = null;
let selectedServiceData = "Any Service";

// 5. DROPDOWN INITIALIZATION
function initDropdowns() {
    const cList = document.getElementById('country-list');
    const sList = document.getElementById('service-list');
    if (!cList || !sList) return; // Prevent errors on other pages

    renderCountries(countries);
    renderServices(services);
}

function renderCountries(list) {
    const listEl = document.getElementById('country-list');
    listEl.innerHTML = '';
    list.forEach(c => {
        let li = document.createElement('li');
        li.innerHTML = `<img src="https://flagcdn.com/w20/${c.code}.png" class="flag-icon"> ${c.name}`;
        li.onclick = () => selectCountry(c);
        listEl.appendChild(li);
    });
}

function renderServices(list) {
    const listEl = document.getElementById('service-list');
    listEl.innerHTML = '';
    list.forEach(s => {
        let li = document.createElement('li');
        li.innerHTML = `<i class='bx ${s.icon}'></i> ${s.name}`;
        li.onclick = () => selectService(s);
        listEl.appendChild(li);
    });
}

function toggleDropdown(id) {
    document.querySelectorAll('.premium-dropdown').forEach(el => {
        if (el.id !== id) el.classList.remove('open');
    });
    document.getElementById(id).classList.toggle('open');
}

function selectCountry(c) {
    selectedCountryData = c;
    document.getElementById('selected-country').innerHTML = `<img src="https://flagcdn.com/w20/${c.code}.png" class="flag-icon"> ${c.name}`;
    document.getElementById('country-dropdown').classList.remove('open');
}

function selectService(s) {
    selectedServiceData = s.name;
    document.getElementById('selected-service').innerHTML = `<i class='bx ${s.icon}'></i> ${s.name}`;
    document.getElementById('service-dropdown').classList.remove('open');
}

// 6. VERIFICATION CORE ENGINE (SMS & EMAIL)
let smsInterval;
function generateSmsNumber() {
    if (!selectedCountryData) return alert("Select a country first.");

    const resultCard = document.getElementById('sms-result');
    const numDisplay = document.getElementById('generated-number');
    const statusText = document.getElementById('sms-status');
    const activeFlag = document.getElementById('active-flag');
    const otpContainer = document.getElementById('otp-container');

    resultCard.style.display = 'block';
    numDisplay.textContent = "Assigning...";
    activeFlag.src = `https://flagcdn.com/w20/${selectedCountryData.code}.png`;
    activeFlag.style.display = "inline-block";
    document.getElementById('active-country').textContent = selectedCountryData.name;

    statusText.innerHTML = `<div class="spinner"></div> Provisioning...`;
    otpContainer.innerHTML = `<p class="waiting-text"><i class='bx bx-radar pulse-icon'></i> Listening for SMS...</p>`;

    setTimeout(() => {
        const prefix = selectedCountryData.dial;

        // Let's make it look like a real 11-digit local number transformed
        // For Nigeria (+234) we need 10 more digits: 803 456 7890
        // For US (+1) we keep it to the standard 10 digit: 202 555 0123

        let areaCode = Math.floor(700 + Math.random() * 200); // 700-900 range
        let part1 = Math.floor(100 + Math.random() * 899);
        let part2 = Math.floor(1000 + Math.random() * 8999);

        // This gives that professional 11-digit feel
        numDisplay.textContent = `${prefix} ${areaCode} ${part1} ${part2}`;

        statusText.innerHTML = `<i class='bx bx-check-circle'></i> Active`;
        statusText.style.color = "#4ade80";

        startTimer(900, document.getElementById('sms-timer'));

        setTimeout(() => {
            const mockCode = Math.floor(100000 + Math.random() * 900000);
            otpContainer.innerHTML = `
                <div class="sender-info">From: <b>${selectedServiceData}</b></div>
                <div class="received-code-box">
                    <div><small>Verification Code</small><h1 id="the-code">${mockCode}</h1></div>
                    <button class="icon-btn-small" onclick="copyToClipboard('the-code', this)"><i class='bx bx-copy'></i></button>
                </div>
            `;
        }, 7000);
    }, 2000);
}

function startTimer(duration, display) {
    clearInterval(smsInterval);
    let timer = duration;
    smsInterval = setInterval(() => {
        let mins = Math.floor(timer / 60);
        let secs = timer % 60;
        display.textContent = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
        if (--timer < 0) clearInterval(smsInterval);
    }, 1000);
}

// 7. TEMP EMAIL ENGINE
let generatedEmailAddress = "";
function generateEmail() {
    const resultBox = document.getElementById('email-result');
    const emailText = document.getElementById('generated-email');
    const inbox = document.getElementById('inbox-messages');

    resultBox.style.display = 'block';
    emailText.textContent = "generating...";
    inbox.innerHTML = `<div class="empty-state"><i class='bx bx-loader-alt bx-spin'></i><p>Creating Inbox...</p></div>`;

    setTimeout(() => {
        generatedEmailAddress = `user_${Math.random().toString(36).substring(2, 8)}@noblemail.site`;
        emailText.textContent = generatedEmailAddress;
        inbox.innerHTML = `<div class="empty-state"><i class='bx bx-inbox'></i><p>Your inbox is empty</p></div>`;
        setTimeout(mockIncomingEmail, 5000);
    }, 1500);
}

function mockIncomingEmail() {
    const inbox = document.getElementById('inbox-messages');
    const bodyHtml = `<h3>Account Verification</h3><p>Click the button below to verify.</p><a href="#" class="verify-link">Verify Now</a>`;
    inbox.innerHTML = `
        <div class="email-item unread" onclick="openEmail(this, 'Security', 'Verification Link', '${encodeURIComponent(bodyHtml)}')">
            <div class="e-sender">Security Team</div>
            <div class="e-subject">Your verification link is ready...</div>
        </div>
    `;
}

function openEmail(el, sender, subject, bodyStr) {
    document.querySelectorAll('.email-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('mail-reader').style.display = 'block';
    document.getElementById('read-subject').textContent = subject;
    document.getElementById('read-body').innerHTML = decodeURIComponent(bodyStr);
}

// 8. GLOBAL UTILITIES
function copyToClipboard(id, btn) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    btn.innerHTML = `<i class='bx bx-check'></i>`;
    setTimeout(() => { btn.innerHTML = `<i class='bx bx-copy'></i>`; }, 1500);
}

function switchTab(tabId) {
    document.querySelectorAll('.f-tab').forEach(b => b.classList.remove('active'));
    event.currentTarget.classList.add('active');
    document.querySelectorAll('.fintech-card').forEach(c => c.style.display = 'none');
    document.getElementById(tabId).style.display = 'block';
}

function filterCountries() {
    let q = document.getElementById('country-search').value.toLowerCase();
    renderCountries(countries.filter(c => c.name.toLowerCase().includes(q)));
}