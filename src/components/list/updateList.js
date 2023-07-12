import {
	createList,
	customListsArr,
	defaultListsArr,
	today,
	upcoming,
} from './createList';
import { isFuture, isToday } from 'date-fns';
import { refreshList, refreshSubList } from './displayList';
import { refreshSideLists } from '../../sidebar/sidebar';

// Delete list function
function deleteList(list) {
	customListsArr.splice(customListsArr.indexOf(list), 1);
}

function addCustomList(list) {
	const newList = list ? list : createList('');
	customListsArr.push(newList);
	refreshList(newList);
}

function updateCustomList(list) {
	customListsArr.splice(customListsArr.indexOf(list), 1, list);
	refreshSideLists();
}

// Find todo in all lists
function findAllLists(todo) {
	const customList = findList(todo);
	const dateList = findDateList(todo);

	return { customList, dateList };
}

function findList(todo) {
	return customListsArr.find((list) => list.id === todo.listId);
}

function findSubList(todo) {
	const list = findList(todo);
	if (!todo.done) return list.activeTodos;
	return list.completedTodos;
}

function setList(todo) {
	if (todo.dueDate) {
		const dateList = findDateList(todo).activeTodos;
		dateList.push(todo);
	}

	const list = findList(todo).activeTodos;
	list.push(todo);

	refreshSubList(todo);
}

function addTodoList(todo) {
	const list = findSubList(todo);
	list.push(todo);
	console.log(todo);
	addDateList(todo);
	refreshSubList(todo);
}

function removeTodoList(todo) {
	const list = findSubList(todo);
	list.splice(list.indexOf(todo), 1);
	removeDateList(todo);
	refreshSubList(todo);
}

function changeList(todo, newListId) {
	// Copy todo
	const updatedTodo = Object.assign({}, todo);
	// Remove original todo
	removeTodoList(todo);
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

// Process change for today and upcoming
// Sort todos to Today, and upcoming lists
function addDateList(todo) {
	console.log(todo);
	if (todo.dueDate) {
		const dateSubList = findDateSubList(todo);
		dateSubList.push(todo);
		console.log(dateSubList);
		refreshSubList(todo);
	}
}

function removeDateList(todo) {
	const dateSubList = findDateSubList(todo);
	console.log(dateSubList);
	if (!dateSubList) return;
	dateSubList.splice(dateSubList.indexOf(todo), 1);
	refreshSubList(todo);
}

function findDateList(todo) {
	// console.log(todo);
	if (!todo.dueDate) return null;

	const date = new Date(todo.dueDate);

	if (isToday(date)) todo.dateList = today.id;
	if (isToday(date)) return today;

	if (isFuture(date)) todo.dateList = upcoming.id;
	if (isFuture(date)) return upcoming;
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
	addTodoList,
	removeTodoList,
	changeList,
	changeSubList,
	addCustomList,
	updateCustomList,
};
