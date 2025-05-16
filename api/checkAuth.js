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
            <a class='perfil'>Perfil</a>
            <a class='logoutbutton' onclick="logout()" href="/"><button type="button">Logout</button></a>
        `
        document.getElementById('nav-actionsid-mobile').innerHTML = `
            <a class='perfil' id='menu-option-mobile'>Perfil</a>
            <a class='logoutbutton' onclick="logout()" href="/"><button type="button">Logout</button></a>
        `
    }
}

checkAuth()