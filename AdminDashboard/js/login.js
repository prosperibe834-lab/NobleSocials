function togglePassword() {
    const passwordInput = document.getElementById('password');
    const toggleIcon = document.querySelector('.toggle-password');
    
    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleIcon.classList.replace('bx-hide', 'bx-show');
    } else {
        passwordInput.type = 'password';
        toggleIcon.classList.replace('bx-show', 'bx-hide');
    }
}

function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.style.borderColor = type === 'success' ? '#10b981' : '#ef4444';
    
    toast.innerHTML = `
        <i class='bx ${type === 'success' ? 'bx-check-circle' : 'bx-error-circle'}' 
           style="color: ${type === 'success' ? '#10b981' : '#ef4444'}"></i>
        <span>${message}</span>
    `;
    
    container.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 500);
    }, 3000);
}

function handleLogin(event) {
    event.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const btn = document.getElementById('loginBtn');
    
    // UI Loading State
    btn.innerHTML = `<i class='bx bx-loader-alt bx-spin'></i> Authenticating...`;
    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';

    // Simulated Logic
    setTimeout(() => {
        if (email === "admin@noblesocials.com" && password === "admin123") {
            showToast("Login Successful! Redirecting...");
            
            // Wait for toast then redirect
            setTimeout(() => {
                window.location.href = "index.html"; // Your dashboard file
            }, 1500);
        } else {
            showToast("Invalid credentials. Please try again.", "error");
            btn.innerHTML = `<span>Sign In</span> <i class='bx bx-right-arrow-alt'></i>`;
            btn.style.opacity = '1';
            btn.style.pointerEvents = 'all';
        }
    }, 1500);
}