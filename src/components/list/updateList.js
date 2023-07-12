import { createList, customListsArr, today, upcoming } from './createList';
import { isFuture, isToday } from 'date-fns';
import { refreshList, refreshSubList } from './displayList';

//* List Handling

// Delete
function deleteList(list) {
	deleteSubLists(list);
	customListsArr.splice(customListsArr.indexOf(list), 1);
}

function deleteSubLists(list) {
	while (list.activeTodos.length > 0) {
		removeTodo(list.activeTodos[0]);
	}
	while (list.completedTodos.length > 0) {
		removeTodo(list.completedTodos[0]);
	}
}

// Add
function addCustomList(list) {
	const newList = list ? list : createList('');
	customListsArr.push(newList);
	refreshList(newList);
}

function updateCustomList(list) {
	customListsArr.splice(customListsArr.indexOf(list), 1, list);
}

// Set
function setList(todo) {
	if (todo.dueDate) {
		const dateList = findDateList(todo).activeTodos;
		dateList.push(todo);
	}

	const list = findList(todo).activeTodos;
	list.push(todo);

	refreshSubList(todo);
}

//* Search

// Find
function findList(todo) {
	return customListsArr.find((list) => list.id === todo.listId);
}

function findSubList(todo) {
	const list = findList(todo);
	if (!todo.done) return list.activeTodos;
	return list.completedTodos;
}

//* Manipulation
// Add
function addTodo(todo) {
	const list = findSubList(todo);
	list.push(todo);
	addDateList(todo);
	refreshSubList(todo);
}

// Remove
function removeTodo(todo) {
	const list = findSubList(todo);
	list.splice(list.indexOf(todo), 1);
	removeDateList(todo);
	refreshSubList(todo);
}

function changeList(todo, newListId) {
	// Copy todo
	const updatedTodo = Object.assign({}, todo);
	// Remove original todo
	removeTodo(todo);
	// Set new list
	updatedTodo.listId = Number(newListId);
	// Add to new list
	addTodo(updatedTodo);
}

function changeSubList(todo) {
	// Copy
	const updatedTodo = { ...todo };
	// Remove Old
	removeTodo(todo);
	// Set New
	updatedTodo.done = !todo.done;
	// Add New
	addTodo(updatedTodo);
}

//* Sort and Date
// Sort
function sortList(list) {
	return list.sort(compareTodos);
}

function compareTodos(a, b) {
	if (a.priority === b.priority) {
		return new Date(a.dueDate) - new Date(b.dueDate);
	} else {
		const priorityOrder = ['high', 'medium', 'low', ''];
		const priorityA = priorityOrder.indexOf(a.priority);
		const priorityB = priorityOrder.indexOf(b.priority);
		return priorityA - priorityB;
	}
}

// Date
function addDateList(todo) {
	if (todo.dueDate) {
		const dateSubList = findDateSubList(todo);
		dateSubList.push(todo);
		refreshSubList(todo);
	}
}

function removeDateList(todo) {
	const dateSubList = findDateSubList(todo);
	if (!dateSubList) return;
	dateSubList.splice(dateSubList.indexOf(todo), 1);
	refreshSubList(todo);
}

//* Date-Search
function findDateList(todo) {
	if (!todo.dueDate) return null;

	const date = new Date(todo.dueDate);

	if (isToday(date)) {
		todo.dateList = today.id;
		return today;
	}

	if (isFuture(date)) {
		todo.dateList = upcoming.id;
		return upcoming;
	}
}

function findDateSubList(todo) {
	const dateList = findDateList(todo);
	if (!dateList) return;
	if (!todo.done) return dateList.activeTodos;
	return dateList.completedTodos;
}

export {
	sortList,
	findDateList,
	findDateSubList,
	findList,
	findSubList,
	deleteList,
	setList,
	addTodo,
	removeTodo,
	changeList,
	changeSubList,
	addCustomList,
	updateCustomList,
};
