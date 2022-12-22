document.addEventListener('click', event => {
    const id = event.target.dataset.id
    if (event.target.dataset.type === 'remove') {
        remove(id).then(() => {
            event.target.closest('li').remove()
        });
    }
    if (event.target.dataset.type === 'edit') {
        const editNote = prompt('Введите новое название');
        edit(id, editNote).then(() => {
            event.target.closest('li').firstElementChild.textContent = editNote;
        });
    }
})

async function remove(id) {
    await fetch(`/${id}`, {method: 'DELETE'})
}

async function edit(id, editNote) {
    await fetch(`/${id}/${editNote}`, {method: 'PUT'})
}