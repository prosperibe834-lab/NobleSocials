document.addEventListener('DOMContentLoaded', () => {
    // 1. Loading Animation
    setTimeout(() => {
        document.getElementById('loader').style.display = 'none';
        initPage();
    }, 1500);

    function initPage() {
        const logs = JSON.parse(localStorage.getItem('accountLogs')) || [];
        if (logs.length === 0) return;

        const latest = logs[logs.length - 1]; // Get most recent

        // Populate Main Card
        document.getElementById('main-amount').innerText = latest.amount;
        document.getElementById('main-txn-id').innerText = latest.id;
        document.getElementById('main-platform').innerText = latest.platform;
        document.getElementById('main-category').innerText = latest.category;
        document.getElementById('main-date').innerText = latest.date.split(',')[0];
        document.getElementById('user-field').value = latest.username;
        document.getElementById('pass-field').value = latest.password;
        document.getElementById('twofa-field').value = latest.twoFactor;

        startTimer(latest.timestamp || Date.now());
        renderTable(logs);
    }

    // Fixed 2FA Generator - Using a reliable CORS proxy
    window.open2FAModal = async function () {
        const secret = document.getElementById('twofa-field').value;
        const display = document.getElementById('live-code');
        const progress = document.getElementById('code-progress');

        document.getElementById('modal2FA').classList.remove('hidden');
        display.innerText = "WAIT";

        try {
            // Using 2fa.live API which is generally more stable
            const response = await fetch(`https://2fa.live/tok/${secret.replace(/\s/g, '')}`);
            const data = await response.json();

            if (data && data.token) {
                display.innerText = data.token;
                // Animate progress bar
                progress.style.transition = 'none';
                progress.style.width = '100%';
                setTimeout(() => {
                    progress.style.transition = 'width 30s linear';
                    progress.style.width = '0%';
                }, 100);
            } else {
                display.innerText = "ERR!";
            }
        } catch (e) {
            display.innerText = "ERR!";
            console.error("2FA Error:", e);
        }
    };

    window.close2FAModal = () => document.getElementById('modal2FA').classList.add('hidden');

    // Download Receipt Fix
    window.downloadReceipt = function () {
        const element = document.getElementById('printable-receipt');
        const btn = document.querySelector('.btn-download');
        btn.innerHTML = "<i class='bx bx-loader-alt bx-spin'></i> Generating...";

        const opt = {
            margin: [10, 10],
            filename: `Receipt_${Date.now()}.pdf`,
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: {
                scale: 2,
                useCORS: true,
                backgroundColor: '#11141B',
                scrollY: 0
            },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(opt).from(element).save().then(() => {
            btn.innerHTML = "<i class='bx bxs-cloud-download'></i> Download PDF";
            showToast("Receipt Downloaded!");
        });
    };

    // Helper functions
    window.copyText = (id, isSpan = false) => {
        const text = isSpan ? document.getElementById(id).innerText : document.getElementById(id).value;
        navigator.clipboard.writeText(text);
        showToast("Copied to Clipboard!");
    };

    window.togglePass = () => {
        const p = document.getElementById('pass-field');
        p.type = p.type === 'password' ? 'text' : 'password';
    };

    function startTimer(start) {
        const display = document.getElementById('main-timer');
        const end = start + (24 * 60 * 60 * 1000);
        setInterval(() => {
            const now = Date.now();
            const diff = end - now;
            if (diff <= 0) { display.innerText = "EXPIRED"; return; }
            const h = Math.floor(diff / 3600000).toString().padStart(2, '0');
            const m = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
            const s = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
            display.innerText = `${h}:${m}:${s}`;
        }, 1000);
    }

    function renderTable(logs) {
        const body = document.getElementById('historyBody');
        body.innerHTML = logs.reverse().map(l => `
            <tr>
                <td>#${l.id.slice(-6)}</td>
                <td>${l.platform}</td>
                <td>${l.amount}</td>
                <td>${l.date.split(',')[0]}</td>
            </tr>
        `).join('');
    }

    function showToast(msg) {
        const container = document.getElementById('toast-container');
        const t = document.createElement('div');
        t.className = 'toast';
        t.innerText = msg;
        container.appendChild(t);
        setTimeout(() => t.remove(), 3000);
    }
});