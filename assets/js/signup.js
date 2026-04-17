function toggleC(e) { e.stopPropagation(); document.getElementById('cMenu').classList.toggle('show'); }
    
function setComp(f, c) {
    document.getElementById('f-view').innerText = f;
    document.getElementById('c-view').innerText = c;
}

function view(id) {
    const x = document.getElementById(id);
    x.type = x.type === "password" ? "text" : "password";
}

function move(curr, next) {
    curr.value = curr.value.replace(/[^0-9]/g, '');
    if (curr.value.length >= 1) { document.getElementById(next).focus(); }
}

window.onclick = () => document.getElementById('cMenu').classList.remove('show');