function addTodoList(todo, list) {
	list.todosArr.unshift(todo);

	return list;
}

function removeTodoList(todo, list) {

    list.todosArr.splice(todo, 1);
   
    return todo;
}

export { addTodoList, removeTodoList };
