import { isFuture, isToday } from 'date-fns';

import { createList, ListsArr, today, upcoming } from './createList';
import { refreshList, refreshSubList } from './displayList';

import { addNewSideList, removeSideList } from '../../sidebar/sidebar';

import {
	setListStorage,
	getListStorage,
	removeListStorage,
	setArrStorage,
	getArrStorage,
} from '../memory/storage';

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
	removeListStorage(list);
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
		console.log(findDateList(todo));
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
