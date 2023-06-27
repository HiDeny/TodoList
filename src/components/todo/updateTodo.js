function updateDone(todo) {
    
    todo.done = !todo.done;

    return todo;
}

function updateTitle (todo, newTitle) {
    todo.title = newTitle;
}

function updateDesc (todo, newDesc) {
    todo.desc = newDesc;
}

function updateDate (todo, newDate) {
    todo.dueDate = newDate;
}

function updatePriority (todo, newPriority) {
    todo.priority = newPriority;
}






export { updateDone };