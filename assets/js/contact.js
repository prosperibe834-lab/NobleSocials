window.addEventListener('load', () => {
    // Hide Preloader
    const preloader = document.getElementById('preloader');
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => preloader.style.display = 'none', 500);
    }, 1000);
});
 
 // Toggle Chat Window
 function toggleChat() {
    const chat = document.getElementById('chatBox');
    chat.style.display = chat.style.display === 'flex' ? 'none' : 'flex';
    if(chat.style.display === 'flex') {
        document.getElementById('chatInput').focus();
    }
}

// Live Chat Logic
function sendChatMessage() {
    const input = document.getElementById('chatInput');
    const messages = document.getElementById('chatMessages');
    const typing = document.getElementById('botTyping');
    const userText = input.value.trim();

    if (userText === "") return;

    // 1. Append User Message
    const userDiv = document.createElement('div');
    userDiv.className = 'msg msg-user';
    userDiv.innerText = userText;
    messages.insertBefore(userDiv, typing);

    // Clear Input
    input.value = "";
    messages.scrollTop = messages.scrollHeight;

    // 2. Show Typing Indicator
    typing.style.display = "block";
    messages.scrollTop = messages.scrollHeight;

    // 3. Bot Reply Logic (PHP Mock)
    setTimeout(() => {
        typing.style.display = "none";
        const botDiv = document.createElement('div');
        botDiv.className = 'msg msg-bot';
        
        // Simple Responses
        if(userText.toLowerCase().includes("hello")) {
            botDiv.innerText = "Hi there! I'm ready to assist with your NobleSocials account.";
        } else if(userText.toLowerCase().includes("payment")) {
            botDiv.innerText = "For payment issues, please include your transaction ID if you have it.";
        } else {
            botDiv.innerText = "I've received your message: '" + userText + "'. A human agent will jump in if I can't solve it!";
        }

        messages.insertBefore(botDiv, typing);
        messages.scrollTop = messages.scrollHeight;
    }, 1500);
}

function handleChatEnter(e) {
    if (e.key === 'Enter') sendChatMessage();
}

// Utility: Set subject from cards
function setSubject(subject) {
    document.getElementById('subjectSelect').value = subject;
    window.scrollTo({ top: document.querySelector('.form-card').offsetTop - 100, behavior: 'smooth' });
}

// Main Form Submit
function handleSubmit(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const btnText = document.getElementById('btnText');
    const success = document.getElementById('success-msg');

    btn.style.opacity = '0.7';
    btn.style.pointerEvents = 'none';
    btnText.innerText = 'Sending...';

    setTimeout(() => {
        document.getElementById('contactForm').reset();
        btn.style.display = 'none';
        success.style.display = 'block';
    }, 2000);
}