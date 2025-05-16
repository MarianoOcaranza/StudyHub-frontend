const loginForm = document.getElementById('login-form')
const botones1 = document.querySelectorAll('.boton1')
const botones2 = document.querySelectorAll('.boton2')

loginForm.addEventListener('submit', (event)=> {
    event.preventDefault();

    let username = document.getElementById('username').value;
    let password = document.getElementById('password').value;

    const data = {
        username: username,
        password: password
    }

    fetch('http://localhost:8080/api/login', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include' 
    })
    .then(response => response.json())
    .then(data => {
        console.log(data)
        if (data.message == 'Login exitoso'){
            window.location.href = "/"
        }
        else {
            console.log('nopasana')
        }
    })
})


const logout = async ()=> {
     const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },   
        credentials: 'include'
    })
    if (response.status == 200) {
        console.log(response.data);
    }
}
