import { createList, customListsArr, today, upcoming } from './createList';
import { isToday } from 'date-fns';
import { refreshList, refreshSubList } from './displayList';

import { saveAllListsMemory, updateListMemory } from '../memory/storage';

//* List Handling

// Delete
function deleteList(list) {
	deleteSubLists(list);
	customListsArr.splice(customListsArr.indexOf(list), 1);
	saveAllListsMemory();
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
	saveAllListsMemory();
}

function updateCustomList(list) {
	customListsArr.splice(customListsArr.indexOf(list), 1, list);
	updateListMemory(list);
}

//* Search

// Find
function findList(todo) {
	const completeList = customListsArr.find(
		(list) => list.id === Number(todo.listId)
	);
	const subList = !todo.done
		? completeList.activeTodos
		: completeList.completedTodos;
	return { completeList, subList };
}

//* Manipulation
// Add
function addTodo(todo) {
	const list = findList(todo);
	list.subList.push(todo);
	updateListMemory(list.completeList);
	addDateList(todo);
	refreshSubList(todo);
}

// Remove
function removeTodo(todo) {
	const list = findList(todo);
	list.subList.splice(list.subList.indexOf(todo), 1);
	updateListMemory(list.completeList);
	removeDateList(todo);
	refreshSubList(todo);
}

// Replace Old
function replaceOldTodo(oldTodo, newTodo) {
	const list = findList(oldTodo);
	const dateList = findDateList(oldTodo);

	list.subList.splice(list.subList.indexOf(oldTodo), 1, newTodo);
	updateListMemory(list.completeList);

	if (dateList) {
		dateList.subList.splice(dateList.subList.indexOf(oldTodo), 1, newTodo);
		updateListMemory(dateList.completeList);
	}

	refreshSubList(newTodo);
}

//* Sort and Date
// Sort
function sortList(list) {
	return list.sort(compareTodos);
}

function compareTodos(a, b) {
	if (a.priority === b.priority) {
		if (a.dueDate && !b.dueDate) return -1;
		if (!a.dueDate && b.dueDate) return 1;
		return new Date(a.dueDate) - new Date(b.dueDate);
	} else {
		const priorityOrder = ['high', 'medium', 'low', ''];
		const priorityA = priorityOrder.indexOf(a.priority);
		const priorityB = priorityOrder.indexOf(b.priority);
		return priorityA - priorityB;
	}
}

//* Date
// Find
function findDateList(todo) {
	console.log(todo);
	if (!todo.dueDate) return null;

	const date = new Date(todo.dueDate);

	const completeList = isToday(date) ? today : upcoming;
	const subList = !todo.done
		? completeList.activeTodos
		: completeList.completedTodos;

	return { completeList, subList };
}

// Add
function addDateList(todo) {
	const dateList = findDateList(todo);
	if (dateList) {
		todo.dateList = dateList.completeList.id;
		dateList.subList.push(todo);
		updateListMemory(dateList.completeList);
	}
}

// Remove
function removeDateList(todo) {
	const dateList = findDateList(todo);
	if (dateList) {
		todo.dateList = null;
		dateList.subList.splice(dateList.subList.indexOf(todo), 1);
		updateListMemory(dateList.completeList);
	}
}

export {
	sortList,
	findDateList,
	findList,
	deleteList,
	addTodo,
	removeTodo,
	replaceOldTodo,
	addCustomList,
	updateCustomList,
};
