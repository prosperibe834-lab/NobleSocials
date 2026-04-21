// This runs as soon as the Checkout page opens
document.addEventListener('DOMContentLoaded', () => {
    const savedData = localStorage.getItem('pendingOrder');

    if (savedData) {
        const order = JSON.parse(savedData);

        // Update Platform with Icon
        const platformElement = document.querySelector('.detail-item:nth-child(1) .val');
        platformElement.innerHTML = `<i class='bx bxl-${order.platform}'></i> ${order.platform}`;
        
        // Update other fields
        document.querySelector('.detail-item:nth-child(2) .val').innerText = order.category;
        document.querySelector('.detail-item:nth-child(3) .val').innerText = order.link;
        document.querySelector('.detail-item:nth-child(4) .val').innerText = order.quantity;
        
        // Update the final price
        document.querySelector('.final-price').innerText = order.totalPrice;
    } else {
        // Fallback if no data exists
        console.error("No pending order found in localStorage.");
    }
});

// This handles the "Confirm & Pay" button click
document.getElementById('confirm-pay-btn').addEventListener('click', function() {
    const modal = document.getElementById('processing-modal');
    const btn = this;

    modal.style.display = 'flex';
    btn.disabled = true;
    btn.innerHTML = "Processing...";

    setTimeout(() => {
        const modalContent = document.querySelector('.modal-content');
        modalContent.innerHTML = `
            <div style="font-size: 60px; color: #1ec8b4;">
                <i class='bx bxs-check-circle'></i>
            </div>
            <h3>Order Successful!</h3>
            <p>Your boost is now active. Redirecting to history...</p>
        `;

        setTimeout(() => {
            // Clear the order so they don't double pay if they go back
            localStorage.removeItem('pendingOrder');
            window.location.href = "orderhistory.html";
        }, 2500);
    }, 3000);
});