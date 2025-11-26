
const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});




const registerForm = document.querySelector('.register form');
const loginForm = document.querySelector('.login form');

registerForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = registerForm.querySelector('input[placeholder="Usuario"]').value;
    const email = registerForm.querySelector('input[placeholder="Email"]').value;
    const password = registerForm.querySelector('input[placeholder="Senha"]').value;

    const userData = {
        username,
        email,
        password
    };

    
    localStorage.setItem('usuario', JSON.stringify(userData));

    alert("Usuário registrado com sucesso!");
    container.classList.remove('active'); 
});




loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const username = loginForm.querySelector('input[placeholder="Usuario"]').value;
    const password = loginForm.querySelector('input[placeholder="Senha"]').value;

    const savedUser = JSON.parse(localStorage.getItem('usuario'));

    if (!savedUser) {
        alert("Nenhum usuário registrado!");
        return;
    }

    if (username === savedUser.username && password === savedUser.password) {
        alert("Login realizado com sucesso!");
        
    } else {
        alert("Usuário ou senha incorretos!");
    }
});


    const menuToggle = document.querySelector('.menu-toggle');
    const navUL = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navUL.classList.toggle('active');
    });
