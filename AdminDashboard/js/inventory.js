document.addEventListener("DOMContentLoaded", () => {
    const body = document.querySelector('body');
    const sidebar = document.querySelector('.sidebar');
    const modeToggle = document.querySelector('.mode');
    const modeText = document.querySelector('.mode-text');
    const mobileToggleBtn = document.getElementById('mobile-toggle');
    const closeSidebarBtn = document.getElementById('close-sidebar');
    const navLinks = document.querySelectorAll('.nav-links li a');

    // --- 1. Theme Initialization ---
    if(localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark');
        modeText.innerText = "Light Mode";
    }

    // --- 2. Dark/Light Mode Toggle ---
    modeToggle.addEventListener('click', () => {
        body.classList.toggle('dark');
        
        if(body.classList.contains('dark')){
            modeText.innerText = "Light Mode";
            localStorage.setItem('theme', 'dark');
        } else {
            modeText.innerText = "Dark Mode";
            localStorage.setItem('theme', 'light');
        }
    });

    // --- 3. Mobile Sidebar Toggle ---
    mobileToggleBtn.addEventListener('click', () => {
        sidebar.classList.add('active');
    });

    closeSidebarBtn.addEventListener('click', () => {
        sidebar.classList.remove('active');
    });

    // --- 4. Active Link State Logic ---
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(item => item.classList.remove('active'));
            // Add active class to clicked link
            this.classList.add('active');

            // Auto-close sidebar on mobile after clicking a link
            if(window.innerWidth <= 800) {
                sidebar.classList.remove('active');
            }
        });
    });
});



                                // Main Contents Starts here
