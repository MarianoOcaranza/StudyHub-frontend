//para crear cursos
const newCourseForm = document.getElementById('create-form')
const editCourseForm = document.getElementById('edit-form')
const contador = document.getElementById('courses-counter')
const editModal = document.getElementById('edit-modal')

newCourseForm.addEventListener('submit', (event)=> {
    event.preventDefault()

    let newTitle = document.getElementById('new-title').value
    let newBiblio = document.getElementById('new-biblio').value

    if (!newTitle|| !newBiblio) {
        alert('Por favor, agrega un titulo y una bibliografia')
        return;
    }

    const data = {
        title: newTitle,
        contentBibliography: newBiblio
    }

    fetch('http://localhost:8080/api/user/courses', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
            credentials: 'include' 
        })
    .then(response => response.json())
    .then(data => {
        const container = document.querySelector('.courses-container')
        let card = document.createElement("div");
                card.classList.add('course')
                card.setAttribute('data-id', data.id)
                card.innerHTML = `
                <div class="course-header">
                    <div>
                        <h1 id='title'>${data.title}</h1>
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
                    <p id='biblio' class="bibliografia">${data.contentBibliography}</p>  
                </div>
                <div class="course-buttons">
                    <button>Generar examen</button>
                    <button>Ver temas</button>
                </div>
                `
                container.appendChild(card)
                document.getElementById('create-modal').classList.add('hidden')
                const nuevoContador = parseInt(contador.innerText) + 1
                contador.innerText = `${nuevoContador} cursos`;
                
    }).catch(error => {
        console.error('Error desconocido', error)
    })
})

let currentEditingId = null;
let currentEditingCard = null;

document.addEventListener("click", (event) => {
    if (event.target.classList.contains("delete-btn")) {
        const courseCard = event.target.closest(".course");
        const courseId = courseCard.getAttribute("data-id");
        if (confirm("¿Eliminar curso?")) {
            fetch(`http://localhost:8080/api/user/courses/${courseId}`, {
                method: "DELETE",
                credentials: 'include'
            })
            .then(response => {
                if (response.status !== 200) {
                    alert('No se pudo eliminar!');
                    return;
                }
                courseCard.remove();
                const nuevoContador = parseInt(contador.innerText) - 1;
                contador.innerText = `${nuevoContador} cursos`;
            })
            .catch(err => alert("Error al eliminar curso."));
        }
    }

    if (event.target.classList.contains("edit-btn")) {
        const courseCard = event.target.closest(".course");
        currentEditingId = courseCard.getAttribute("data-id"); 
        currentEditingCard = courseCard;
        editModal.classList.remove('hidden');
        document.getElementById('edit-title').value = courseCard.querySelector('h1').innerText;
        document.getElementById('edit-biblio').value = courseCard.querySelector('.bibliografia').innerText;
    }
});

editCourseForm.addEventListener('submit', (event) => {
    event.preventDefault();

    let editTitle = document.getElementById('edit-title').value;
    let editBiblio = document.getElementById('edit-biblio').value;
    if (!editTitle || !editBiblio) {
        alert('No pueden estar vacíos!');
        return;
    }

    const data = {
        title: editTitle,
        contentBibliography: editBiblio
    };

    fetch(`http://localhost:8080/api/user/courses/${currentEditingId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
        credentials: 'include'
    })
    .then(response => response.json())
    .then(data => {
        currentEditingCard.querySelector('h1').innerText = data.title;
        currentEditingCard.querySelector('.bibliografia').innerText = data.contentBibliography;
        editModal.classList.add('hidden');
    });
});

