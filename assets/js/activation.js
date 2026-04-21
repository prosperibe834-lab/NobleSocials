document.addEventListener('DOMContentLoaded', () => {
    // 1. Get data from LocalStorage (Saved from BuyNumber page)
    const country = localStorage.getItem('selectedCountry') || "Not Selected";
    const service = localStorage.getItem('selectedService') || "Unknown";
    const flagCode = localStorage.getItem('selectedFlag') || "us";

    // 2. Update UI with the data
    document.getElementById('active-country').textContent = country;
    document.getElementById('active-service-name').textContent = service;
    document.getElementById('active-flag').src = `https://flagcdn.com/w80/${flagCode}.png`;

    // Set Service Icon based on name
    const serviceIcon = document.getElementById('active-service-icon');
    serviceIcon.className = 'bx'; // Reset
    if(service.includes("WhatsApp")) serviceIcon.classList.add('bxl-whatsapp');
    else if(service.includes("Telegram")) serviceIcon.classList.add('bxl-telegram');
    else serviceIcon.classList.add('bx-message-square-dots');

    // 3. Start Timer (20 Minutes)
    startTimer(1200);

    // 4. Simulate SMS arrival after 8 seconds
    setTimeout(() => {
        showCode("550-921");
    }, 8000);
});

function startTimer(duration) {
    let timer = duration, minutes, seconds;
    const display = document.querySelector('#time-display');
    const bar = document.querySelector('#timer-bar');
    
    const interval = setInterval(() => {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;
        
        // Update Progress Bar
        let offset = 283 - (timer / duration) * 283;
        bar.style.strokeDashoffset = offset;

        if (--timer < 0) clearInterval(interval);
    }, 1000);
}

function showCode(code) {
    document.getElementById('sms-waiting').style.display = 'none';
    const receivedArea = document.getElementById('sms-received');
    receivedArea.style.display = 'block';
    document.getElementById('otp-code').textContent = code;
    
    // Play a subtle notification effect
    document.title = "Code Received! - Noble Hub";
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text);
    alert("Copied: " + text);
}