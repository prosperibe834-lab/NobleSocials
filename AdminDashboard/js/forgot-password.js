// Helper for OTP focus movement
function moveFocus(current, nextId) {
    if (current.value.length >= 1) {
        document.getElementById(nextId).focus();
    }
}

// Universal Toast Function
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.style.cssText = `
        background: #1e293b; border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
        padding: 15px 25px; border-radius: 10px; color: #f8fafc; margin-top: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3); display: flex; align-items: center; gap: 10px;
    `;
    toast.innerHTML = `<span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

// Action for Step 1 -> Step 2
function handleSendOTP(event) {
    event.preventDefault();
    const btn = document.getElementById('sendOtpBtn');
    btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Sending...`;

    setTimeout(() => {
        document.getElementById('step-email').style.display = 'none';
        document.getElementById('step-otp').style.display = 'block';
        showToast("OTP sent to your inbox!");
    }, 1200);
}

// Action for Step 2 -> Step 3
function handleVerifyOTP(event) {
    event.preventDefault();
    // Simulate verification
    showToast("OTP Verified! Set your new password.");
    
    setTimeout(() => {
        document.getElementById('step-otp').style.display = 'none';
        document.getElementById('step-new-password').style.display = 'block';
    }, 800);
}

// Final Action: Reset Password
function handleFinalReset(event) {
    event.preventDefault();
    const pass = document.getElementById('newPass').value;
    const confirm = document.getElementById('confirmPass').value;

    if (pass !== confirm) {
        showToast("Passwords do not match!", "error");
        return;
    }

    showToast("Password updated successfully!");
    
    setTimeout(() => {
        window.location.href = "login.html"; // Send them back to login
    }, 2000);
}