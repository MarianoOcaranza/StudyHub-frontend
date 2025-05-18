const loadCourses = async ()=> {
    const response = await fetch('http://localhost:8080/api/user/courses', {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: 'include'
    })
    if (response.status === 200) {
        const data = await response.json() //aca ya extraigo los datos para usarlos despues
        document.getElementById('nav-actionsid').innerHTML = `
            <a class='perfil'>
                <img src="/assets/img/profile.svg" alt="profile">
                <p>Perfil</p>
            </a>
            <a class='logoutbutton' onclick="logout()">
                <img src="/assets/img/logout.svg" alt="logout">
                <p class='logoutbut'>Logout</p>
            </a>
        `
        document.getElementById('nav-actionsid-mobile').innerHTML = `
          <a class='perfil'>
                <img src="/assets/img/profile.svg" alt="profile">
                <p>Perfil</p>
            </a>
            <a class='logoutbutton' onclick="logout()">
                <img src="/assets/img/logout.svg" alt="logout">
                <p class='logoutbut'>Logout</p>
            </a>
        `
        if (window.location.pathname === '/') {
            document.getElementById('auth').style.display = 'none'
            document.getElementById('comenzar').setAttribute('onclick', "window.location.href='/user/courses'")
        }
        if (window.location.pathname === '/how-it-works') {
            document.getElementById('comenzar').setAttribute('onclick', "window.location.href='/user/courses'")
        }
        if (window.location.pathname === '/user/courses/') {
            document.querySelectorAll('.caracteristicas-btn').forEach(element => {
                element.innerText = 'Inicio'
                element.setAttribute('href', '/')
            })
            const container = document.querySelector('.courses-container')
            data.forEach(course => {
                let card = document.createElement("div");
                card.classList.add('course')
                card.setAttribute('data-id', course.id)
                card.innerHTML = `
                <div class="course-header">
                    <div>
                        <h1 id='title'>${course.title}</h1>
                        <p>0 temas</p>
                    </div>
                    <div class="course-controllers">
                        <img src="/assets/img/delete.svg" class="delete-btn" id='delete' alt="">
                        <img src="/assets/img/edit.svg" class="edit-btn" id="edit" alt="">
                    </div>
                </div>
                <hr>
                <div class="course-content">
                    <p>Bibliografia:</p>
                    <p id='biblio' class="bibliografia">${course.contentBibliography}</p>  
                </div>
                <div class="course-buttons">
                    <button>Generar examen</button>
                    <button>Ver temas</button>
                </div>
                `
                container.appendChild(card)
            })
            document.getElementById('courses-counter').innerText = `${data.length} cursos`
            const deleteCourseBtn = document.querySelectorAll('.delete-btn')
        }
    }
}

loadCourses()