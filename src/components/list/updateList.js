import { listsArr } from "./createList";

// Delete list function
function deleteList (list) {
	listsArr.splice(listsArr.indexOf(list), 1);
}


function findCorrectList(todo) {
	console.log(todo);
	const list = listsArr.find((list) => list.id === todo.listId);
	console.log(list);
	return list;
}

function sortList(list) {
	return list.sort(compareTodos);
}

function compareTodos(a , b) {
	console.log(a);
	console.log(b);
	if (a.priority === b.priority) {
		return new Date(a.dueDate) - new Date(b.dueDate);
	} else {
		const priorityOrder = ['high', 'medium', 'low', ''];
		const priorityA = priorityOrder.indexOf(a.priority);
		console.log(priorityA);
		const priorityB = priorityOrder.indexOf(b.priority);
		console.log(priorityB);
		return priorityA - priorityB
	}
}


function addTodoList(todo, list) {
	list.unshift(todo);
}

function removeTodoList(todo, list) {
	list.splice(list.indexOf(todo), 1);
}

function moveTodoToDiffList(todo, orgList, newList) {
	addTodoList(todo, newList);
	removeTodoList(todo, orgList);
}

function moveFinishedTodo(list) {
	console.log(list);
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
	const currentList = findCorrectList(todo);

	if (!todo.done) {
		const todoIndex = currentList.todosArr.indexOf(todo);
		currentList.todosArr.splice(todoIndex, 1, newTodo);
	} else {
		const todoIndex = currentList.completedTodos.indexOf(todo);
		currentList.completedTodos.splice(todoIndex, 1, newTodo);
	}
}

export {
	findCorrectList,
	sortList,
	addTodoList,
	removeTodoList,
	moveFinishedTodo,
	undoFinishedTodo,
	moveTodoToDiffList,
	replaceOldTodo,
};
