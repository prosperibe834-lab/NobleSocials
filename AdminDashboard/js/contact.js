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
document.addEventListener("DOMContentLoaded", () => {
    // 1. Accordion Logic
    const accordions = document.querySelectorAll('.accordion-trigger');
    accordions.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            if (content.style.display === 'none') {
                content.style.display = 'block';
                icon.className = 'bx bx-chevron-up';
            } else {
                content.style.display = 'none';
                icon.className = 'bx bx-chevron-down';
            }
        });
    });

    // 2. Tab Filtering Logic (Now 100% Functional)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button styling
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');

            const filterType = this.getAttribute('data-filter');

            // Show/Hide logic
            timelineItems.forEach(item => {
                // If 'all', show everything. Otherwise, match the data-type.
                // We always show admin replies (data-type='admin') so they don't disappear.
                if (filterType === 'all' || item.getAttribute('data-type') === filterType || item.getAttribute('data-type') === 'admin') {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});

// --- MODERN TOAST NOTIFICATION SYSTEM ---
function showToast(message, type = 'success') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const iconClass = type === 'success' ? 'bx-check-circle' : 'bx-error-circle';
    toast.innerHTML = `<i class='bx ${iconClass}'></i> <span>${message}</span>`;
    
    container.appendChild(toast);
    
    // Auto-remove after 3.5 seconds
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// --- QUICK REPLIES ---
function insertQuickReply(text) {
    const textarea = document.getElementById('adminReplyText');
    textarea.value = text;
    textarea.focus();
}

// --- SENDING A REPLY (Appending to Timeline) ---
function sendAdminReply() {
    const replyText = document.getElementById('adminReplyText').value.trim();
    const timeline = document.getElementById('mainTimeline');

    if(replyText === "") {
        showToast("Cannot send an empty message.", "error");
        return;
    }

    // 1. Create the new element
    const newEntry = document.createElement('div');
    newEntry.className = 'timeline-item admin-action';
    newEntry.setAttribute('data-type', 'admin'); // So it stays visible during filtering
    
    // Get current time
    const now = new Date();
    const timeString = now.getHours() + ':' + String(now.getMinutes()).padStart(2, '0');

    newEntry.innerHTML = `
        <div class="timeline-icon" style="background: var(--accent-success); color: white;"><i class='bx bx-check'></i></div>
        <div class="timeline-content" style="border-left: 4px solid var(--accent-success);">
            <div class="timeline-header">
                <h4>Official Staff Reply</h4>
                <span>Today at ${timeString}</span>
            </div>
            <div class="timeline-body">
                <p style="font-size: 13.5px; color: var(--text-primary);">${replyText}</p>
            </div>
        </div>
    `;

    // 2. Append to timeline
    timeline.appendChild(newEntry);

    // 3. Reset input
    document.getElementById('adminReplyText').value = "";
    
    // 4. Show Modern Success Toast
    showToast("Reply sent and logged successfully!");
    
    // 5. Scroll to bottom
    timeline.scrollTo({ top: timeline.scrollHeight, behavior: 'smooth' });
}

// --- TOP ACTION BUTTONS ---
function toggleStar() {
    const btn = document.getElementById('starBtn');
    btn.classList.toggle('active');
    if(btn.classList.contains('active')) {
        showToast("User added to priority watch list.");
    } else {
        showToast("User removed from priority list.");
    }
}

function toggleBan() {
    const btn = document.getElementById('banBtn');
    const text = document.getElementById('banText');
    
    if(text.innerText === "Ban User") {
        text.innerText = "Unban User";
        btn.style.background = "var(--accent-danger)";
        btn.style.color = "white";
        showToast("User account has been suspended.", "error");
    } else {
        text.innerText = "Ban User";
        btn.style.background = "";
        btn.style.color = "";
        showToast("User account restored.");
    }
}

function triggerAction(action) {
    if(action === 'add') showToast("Open 'Add to new Campaign' modal.");
}

// --- TICKET STATUS DROP DOWN ---
function changeTicketStatus() {
    const select = document.getElementById('statusSelect');
    const badge = document.getElementById('ticketStatusBadge');
    const stage = document.getElementById('issueStage');
    
    badge.className = `status-badge ${select.value}`;
    badge.innerText = `Ticket: ${select.options[select.selectedIndex].text.split(': ')[1]}`;
    
    if(select.value === 'resolved') {
        showToast("Ticket marked as resolved!");
        stage.classList.remove('active');
        stage.classList.add('complete');
        stage.querySelector('.stage-icon').innerText = '✅';
    }
}