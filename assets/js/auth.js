const loginBox = document.getElementById('login-box');
const registerBox = document.getElementById('register-box');
const toggleLogin = document.getElementById('toggle-login');
const toggleRegister = document.getElementById('toggle-register');
const navactions = document.querySelectorAll('.nav-actions nav a')
const navactionsMobile = document.querySelectorAll('.nav-actions-mobile a')


function showLoginBox() {
    loginBox.classList.add('front');
    loginBox.classList.remove('back');
    registerBox.classList.add('back');
    registerBox.classList.remove('front');
    toggleLogin.classList.add('active');
    toggleRegister.classList.remove('active');
}

function showRegisterBox() {
    toggleRegister.classList.add('active');
    toggleLogin.classList.remove('active');
    registerBox.classList.add('front');
    registerBox.classList.remove('back');
    loginBox.classList.add('back');
    loginBox.classList.remove('front');
}

loginBox.addEventListener('click', showLoginBox);
registerBox.addEventListener('click', showRegisterBox);

navactions[0].addEventListener('click', showLoginBox);
navactions[1].addEventListener('click', showRegisterBox);
navactionsMobile[0].addEventListener('click', showLoginBox);
navactionsMobile[1].addEventListener('click', showRegisterBox);

toggleLogin.addEventListener('click', () => {
    toggleLogin.classList.add('active');
    toggleRegister.classList.remove('active');
    showLoginBox()
});

toggleRegister.addEventListener('click', () => {
    toggleRegister.classList.add('active');
    toggleLogin.classList.remove('active');
    showRegisterBox()
});

showLoginBox();
