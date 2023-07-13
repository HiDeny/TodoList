import { isFuture, isToday } from 'date-fns';

import { createList, ListsArr, today, upcoming } from './createList';
import { refreshList, refreshSubList } from './displayList';

import { addNewSideList, removeSideList } from '../../sidebar/sidebar';

import { setListStorage, removeListStorage, setArrStorage } from '../memory/storage';

//* List Handling

// Add
function addCustomList() {
	const newList = createList('');
	ListsArr.push(newList);
	setListStorage(newList);
	addNewSideList(newList);
	refreshList(newList);
}

function updateCustomList(list) {
	ListsArr.splice(ListsArr.indexOf(list), 1, list);
	setListStorage(list);
}

// Delete
function deleteList(list) {
	deleteSubLists(list);
	removeSideList(list);
	ListsArr.splice(ListsArr.indexOf(list), 1);
	// removeListStorage(list);
	setArrStorage(ListsArr);
	console.log(localStorage);
}

function deleteSubLists(list) {
	while (list.activeTodos.length > 0) {
		removeTodo(list.activeTodos[0]);
	}
	while (list.completedTodos.length > 0) {
		removeTodo(list.completedTodos[0]);
	}
}

//* Search

// Find
function findList(todo) {
	return ListsArr.find((list) => list.id === todo.listId);
}

function findSubList(todo) {
	const list = findList(todo);
	if (!todo.done) return list.activeTodos;
	return list.completedTodos;
}

//* Manipulation
// Add
function addTodo(todo) {
	const subList = findSubList(todo);
	subList.push(todo);
	addDateList(todo);
	refreshSubList(todo);
	setListStorage(findList(todo));
}

// Remove
function removeTodo(todo) {
	const subList = findSubList(todo);
	subList.splice(subList.indexOf(todo), 1);
	removeDateList(todo);
	refreshSubList(todo);
	setListStorage(findList(todo));
}

function changeList(todo, updatedTodo, newListId) {
	// Copy todo
	const newTodo = updatedTodo ? updatedTodo : { ...todo };
	// Remove original todo
	removeTodo(todo);
	// Set new list
	newTodo.listId = Number(newListId);
	// Add to new list
	addTodo(newTodo);
}

function changeSubList(todo, updatedTodo) {
	// Copy
	const newTodo = updatedTodo ? updatedTodo : { ...todo };
	// Remove Old
	removeTodo(todo);
	// Set New
	newTodo.done = !todo.done;
	// Add New
	addTodo(newTodo);
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
		setListStorage(findDateList(todo));
	}
}

function removeDateList(todo) {
	const dateSubList = findDateSubList(todo);
	if (!dateSubList) return;
	dateSubList.splice(dateSubList.indexOf(todo), 1);
	refreshSubList(todo);
	setListStorage(findDateList(todo));
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
	addTodo,
	removeTodo,
	changeList,
	changeSubList,
	addCustomList,
	updateCustomList,
};
