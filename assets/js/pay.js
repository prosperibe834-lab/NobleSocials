let selectedMode = null;
let timerInterval = null;

// Amount Input Listener
document.getElementById('mainAmount').addEventListener('input', (e) => {
    e.target.value = e.target.value.replace(/[^0-9]/g, '');
    document.getElementById('continueBtn').disabled = (e.target.value.length === 0);
});

// Mode Selection
function setMode(el, mode) {
    document.querySelectorAll('.method-item').forEach(i => i.classList.remove('active'));
    el.classList.add('active');
    selectedMode = mode;
}

// Logic to Open Portal
function handleContinue() {
    const amt = document.getElementById('mainAmount').value;
    const formatted = Number(amt).toLocaleString();
    document.getElementById('portalAmtDisplay').innerText = "₦" + formatted;
    document.querySelectorAll('.final-amt').forEach(e => e.innerText = formatted);
    
    document.getElementById('portal').style.display = 'flex';

    // If user picked a specific mode on the first screen, jump straight to it
    if(selectedMode !== 'fw') {
        openChannel(selectedMode);
    }
}

// Channel Switching in Portal
function openChannel(type) {
    document.getElementById('portal-methods').style.display = 'none';
    document.getElementById('channel-' + type).style.display = 'block';
    if(type === 'bank') startCountdown();
}

function closePortal() {
    clearInterval(timerInterval);
    document.getElementById('portal').style.display = 'none';
    document.getElementById('portal-methods').style.display = 'block';
    document.getElementById('channel-card').style.display = 'none';
    document.getElementById('channel-bank').style.display = 'none';
}

// 10-Minute Timer
function startCountdown() {
    let time = 600; // 10 minutes
    const clock = document.getElementById('clock');
    timerInterval = setInterval(() => {
        let mins = Math.floor(time / 60);
        let secs = time % 60;
        clock.innerText = `${mins}:${secs < 10 ? '0' + secs : secs}`;
        if (--time < 0) {
            clearInterval(timerInterval);
            alert("Account expired. Please try again.");
            closePortal();
        }
    }, 1000);
}

function copyAccount(num) {
    navigator.clipboard.writeText(num);
    const t = document.getElementById('toast');
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 2000);
}

function complete() {
    alert("Verification initiated. Your wallet will be credited automatically!");
    location.reload();
}