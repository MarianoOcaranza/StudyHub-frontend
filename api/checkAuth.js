const checkAuth = async ()=> {
    const response = await fetch('http://localhost:8080/api/user/courses', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
    if (response.status == 200) {
        document.getElementById('nav-actionsid').innerHTML = `
            <a class='perfil'>
                <img src="./assets/img/profile.svg" alt="profile">
                <p>Perfil</p>
            </a>
            <a class='logoutbutton' onclick="logout()">
                <img src="./assets/img/logout.svg" alt="logout">
                <p class='logoutbut'>Logout</p>
            </a>
        `
        document.getElementById('nav-actionsid-mobile').innerHTML = `
          <a class='perfil'>
                <img src="./assets/img/profile.svg" alt="profile">
                <p>Perfil</p>
            </a>
            <a class='logoutbutton' onclick="logout()">
                <img src="./assets/img/logout.svg" alt="logout">
                <p class='logoutbut'>Logout</p>
            </a>
        `
        if (window.location.pathname === '/') {
            document.getElementById('auth').style.display = 'none'
        }
    }
}

checkAuth()