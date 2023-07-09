import { customListsArr, today, upcoming } from './createList';
import { isFuture, isToday } from 'date-fns';
import { refreshSubList } from './displayList';
import { refreshSideLists } from '../../sidebar/sidebar';

// Delete list function
function deleteList(list) {
	customListsArr.splice(customListsArr.indexOf(list), 1);
}

function addCustomList(list) {
	customListsArr.push(list);
}

function updateCustomList(list) {
	console.log(list);
	customListsArr.splice(customListsArr.indexOf(list), 1, list);
	refreshSideLists();
}

// Find todo in all lists

// Sort todos to Today, and upcoming lists
function processDueDate(todo) {
	if (!todo.dueDate) return;

	const date = new Date(todo.dueDate);
	if (isToday(date)) {
		if (!todo.done) return today.todosArr;
		if (todo.done) return today.completedTodos;
	}
	if (isFuture(date)) {
		if (!todo.done) return upcoming.todosArr;
		if (todo.done) return upcoming.completedTodos;
	}
}

// Process change for today and upcoming

function findList(todo) {
	return customListsArr.find((list) => list.id === todo.listId);
}

function findSubList(todo) {
	const list = findList(todo);
	if (!todo.done) return list.todosArr;
	if (todo.done) return list.completedTodos;
}

function setList(todo) {
	const list = findList(todo).todosArr;
	console.log(list);
	list.push(todo);
	refreshSubList(todo);
}

function addTodoList(todo) {
	const list = findSubList(todo);
	list.push(todo);
	refreshSubList(todo);
}

function removeTodoList(todo) {
	const list = findSubList(todo);
	list.splice(list.indexOf(todo), 1);
	refreshSubList(todo);
}

function changeList(todo, newListId) {
	// Copy todo
	const updatedTodo = Object.assign({}, todo);
	// Remove original todo
	removeTodoList(todo);
	console.log(todo);
	// Set new list
	updatedTodo.listId = Number(newListId);
	// Add to new list
	addTodoList(updatedTodo);
}

function changeSubList(todo) {
	// Copy
	const updatedTodo = { ...todo };
	// Remove Old
	removeTodoList(todo);
	// Set New
	updatedTodo.done = !todo.done;
	// Add New
	addTodoList(updatedTodo);
}

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
		console.log(priorityA - priorityB);
		return priorityA - priorityB;
	}
}

export {
	sortList,
	processDueDate,
	findList,
	findSubList,
	deleteList,
	setList,
	addTodoList,
	removeTodoList,
	changeList,
	changeSubList,
	addCustomList,
	updateCustomList,
};
