function addTodoList(todo, list) {
	todo.list = list;
	list.todosArr.unshift(todo);
}

function removeTodoList(todo, list) {
	list.todosArr.splice(list.todosArr.indexOf(todo), 1);
}

function moveTodoToDiffList(todo, orgList, newList) {
	addTodoList(todo, newList);
	removeTodoList(todo, orgList);
}

function moveFinishedTodo(list) {
	list.todosArr.forEach((todo) => {
		if (todo.done === true) {
			list.completedTodos.unshift(todo);
			list.todosArr.splice(list.todosArr.indexOf(todo), 1);
		}
	});
}

function undoFinishedTodo(list) {
	list.completedTodos.forEach((todo) => {
		if (todo.done === false) {
			list.todosArr.unshift(todo);
			list.completedTodos.splice(list.completedTodos.indexOf(todo), 1);
		}
	});
}

function replaceOldTodo(todo, newTodo) {
	const currentList = todo.list;

	if (!todo.done) {
		const todoIndex = currentList.todosArr.indexOf(todo);
		currentList.todosArr.splice(todoIndex, 1, newTodo);
	} else {
		const todoIndex = currentList.completedTodos.indexOf(todo);
		currentList.completedTodos.splice(todoIndex, 1, newTodo);
	}
}

export {
	addTodoList,
	removeTodoList,
	moveFinishedTodo,
	undoFinishedTodo,
	moveTodoToDiffList,
	replaceOldTodo,
};