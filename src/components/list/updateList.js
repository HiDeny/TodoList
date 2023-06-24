function addTodoToList(todo, list) {
	list.todos.push(todo);

	return list;
}

function markedDoneTodo(list) {
    const activeList = list.listUl;
    const finishedTodo = activeList.map(todo => {
        todo.classList;
    });

    return finishedTodo;
}

export { addTodoToList, markedDoneTodo };
