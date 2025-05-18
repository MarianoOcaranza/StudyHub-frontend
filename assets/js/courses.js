document.addEventListener('DOMContentLoaded', ()=> {
    const createBtn = document.getElementById('new-course-button');
    const createModal = document.getElementById('create-modal')
    const closeModal = document.querySelectorAll('.close-modal')
    const editModal = document.getElementById('edit-modal')

    createBtn.addEventListener('click', ()=> {
        createModal.classList.remove('hidden');
    })

    closeModal.forEach(btn => {
        btn.addEventListener('click', ()=> {
            createModal.classList.add('hidden')
            editModal.classList.add('hidden')
        })
    })
})
