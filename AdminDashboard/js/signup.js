function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    passwordInput.type = passwordInput.type === 'password' ? 'text' : 'password';
    toggleIcon.classList.toggle('bx-show');
    toggleIcon.classList.toggle('bx-hide');
}

function checkPasswordStrength(password) {
    const bar = document.getElementById('strength-bar');
    bar.className = ""; // Reset classes
    
    if (password.length === 0) {
        bar.style.width = "0%";
    } else if (password.length < 6) {
        bar.classList.add('strength-weak');
    } else if (password.length < 10) {
        bar.classList.add('strength-medium');
    } else {
        bar.classList.add('strength-strong');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type === 'error' ? 'error' : 'success'}`;
    toast.style.cssText = `
        background: var(--panel-bg);
        border-left: 4px solid ${type === 'success' ? '#10b981' : '#ef4444'};
        padding: 15px 25px;
        border-radius: 10px;
        color: var(--text-main);
        margin-top: 10px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    toast.innerHTML = `<i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}'></i> <span>${message}</span>`;
    container.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function handleSignup(event) {
    event.preventDefault();
    const btn = document.getElementById('signupBtn');
    
    // Loading State
    btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Creating Profile...`;
    btn.style.pointerEvents = 'none';

    setTimeout(() => {
        showToast("Account Created! Redirecting to login...");
        
        setTimeout(() => {
            window.location.href = "login.html";
        }, 2000);
    }, 1500);
}