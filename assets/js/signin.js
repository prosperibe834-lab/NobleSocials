    // Tab Controller
    function showMode(btn, sectionId) {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.auth-section').forEach(s => s.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(sectionId).classList.add('active');
    }

    // Password Eye Toggle
    function toggleView() {
        const p = document.getElementById('pInput');
        const i = document.getElementById('eIcon');
        if (p.type === "password") {
            p.type = "text";
            i.classList.replace('bx-hide', 'bx-show');
        } else {
            p.type = "password";
            i.classList.replace('bx-show', 'bx-hide');
        }
    }

    // PIN Auto-Tab (Numbers only)
    function moveTab(curr, nextID) {
        curr.value = curr.value.replace(/[^0-9]/g, '');
        if (curr.value.length >= 1) {
            document.getElementById(nextID).focus();
        }
    }

    function triggerBio() {
        alert("Simulating Biometric Verification...");
    }