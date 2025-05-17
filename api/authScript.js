const loginForm = document.getElementById('login-form')
const registerForm = document.getElementById('register-form')

if(window.location.pathname === '/'){
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
            if (data.message == 'Login exitoso'){
                document.getElementById('login-msgs').innerHTML = `
                <ul style="color: green; padding-left: 20px;">
                    Login exitoso! cargando...
                </ul>
                `      
                window.location.href = "/"
            } else if (data.message == 'Credenciales inválidas') {
                document.getElementById('login-msgs').innerHTML = `
                <ul style="color: red; padding-left: 20px;">
                    Credenciales incorrectas. Revisa la contraseña y/o usuario
                </ul>
                `  
            } else {
                document.getElementById('login-msgs').innerHTML = `
                <ul style="color: red; padding-left: 20px;">
                    error desconocido. por favor intente mas tarde
                </ul>
                `  
            }
        })
    })

    registerForm.addEventListener('submit', (event)=> {
        event.preventDefault();

        let username = document.getElementById('reg-username').value
        let email = document.getElementById('email').value
        let name = document.getElementById('name').value
        let lastname = document.getElementById('lastname').value
        let password = document.getElementById('reg-password').value

        const errors = [];

        if (!username) errors.push("El nombre de usuario es obligatorio. ");
        if (!name) errors.push("El nombre es obligatorio. ");
        if (!lastname) errors.push("El apellido es obligatorio. ");
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push("El email no es válido. ");
        if (!password || password.length < 8) errors.push("La contraseña debe tener al menos 8 caracteres. ");

         if (errors.length > 0) {
            const errorList = errors.map(e => `<li>${e}</li>`).join('');
            document.getElementById('reg-msgs').innerHTML = `
                <ul style="color: red; padding-left: 20px;">
                    ${errorList}
                </ul>
                `
            return
        }

        const data = {
            username: username,
            email: email,
            name: name,
            lastname: lastname,
            password: password
        }

        fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        .then(response => {
            if (response.status == 200) {
                document.getElementById('reg-msgs').innerHTML = `
                <ul style="color: green; padding-left: 20px;">
                    Usuario registrado con exito! ya podes iniciar sesion.
                </ul>
                `            }
            if (response.status == 403) {
                document.getElementById('reg-msgs').innerHTML = `
                <ul style="color: red; padding-left: 20px;">
                    Ya existe el usuario!
                </ul>
                `
            }
        })
        .catch(error => {
            console.log('error ', error)
        })
    }
)}
window.logout = async () => {
    const response = await fetch('http://localhost:8080/api/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    });
    if (response.status === 200) {
        if (window.location.pathname === '/how-it-works') {
            window.location.href = '/how-it-works'
        }
        else {
            window.location.href = '/';
        }
    } 
};