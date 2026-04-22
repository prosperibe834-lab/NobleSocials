document.addEventListener('DOMContentLoaded', () => {
    // 1. Get Selected Data from Store
    const vpnName = localStorage.getItem('selectedVpnName') || "NordVPN Ultra";
    const vpnKey = localStorage.getItem('selectedVpnKey') || "nord";

    document.getElementById('vpnNameDisplay').innerText = vpnName;
    document.getElementById('nodeName').innerText = vpnKey.toUpperCase();

    // 2. 20-Minute Countdown Logic
    let timeInSeconds = 20 * 60; // 20 minutes
    const totalSeconds = 20 * 60;
    const stroke = document.getElementById('timerStroke');
    const display = document.getElementById('countdown');

    function updateTimer() {
        const mins = Math.floor(timeInSeconds / 60);
        const secs = timeInSeconds % 60;

        display.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

        // Update Circle
        const offset = 283 - (timeInSeconds / totalSeconds) * 283;
        stroke.style.strokeDashoffset = offset;

        if (timeInSeconds > 0) {
            timeInSeconds--;
        } else {
            display.innerText = "EXPIRED";
            display.style.color = "#ef4444";
        }
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // 3. Fake "Live" Speed Metrics
    setInterval(() => {
        const down = (Math.random() * (95 - 80) + 80).toFixed(1);
        const up = (Math.random() * (40 - 30) + 30).toFixed(1);
        document.getElementById('downSpeed').innerText = `${down} Mb/s`;
        document.getElementById('upSpeed').innerText = `${up} Mb/s`;
    }, 3000);
});

// Helper Functions
function copy(id) {
    const field = document.getElementById(id);
    field.select();
    navigator.clipboard.writeText(field.value);

    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

function togglePass(id, btn) {
    const field = document.getElementById(id);
    const icon = btn.querySelector('i');
    if (field.type === "password") {
        field.type = "text";
        icon.className = 'bx bx-show';
    } else {
        field.type = "password";
        icon.className = 'bx bx-low-vision';
    }
}