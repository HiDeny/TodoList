function updateDone(todo) {
    
    todo.done = !todo.done;

    return todo;
}



export { updateDone };