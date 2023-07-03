function updateDone(todo) {
    
    todo.done = !todo.done;

    return todo;
}

function updateTitle (newTitle) {
    todo.title = newTitle;
}

function updateDesc (newDesc) {
    todo.desc = newDesc;
}

function updateDate (newDate) {
    todo.dueDate = newDate;
}

function updatePriority (newPriority) {
    todo.priority = newPriority;
}






export { updateDone };