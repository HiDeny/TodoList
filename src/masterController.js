import firstSetup from './firstRun.js';

import allListsController from './components/list/controller/controlAllLists.js';

import createForm from './components/todo/interface/displayForm.js';
import createTodo from './components/todo/todo.js';
import displayCard from './components/todo/interface/displayCard.js';
import controlCard from './components/todo/controller/controlCard.js';

import createList from './components/list/createList.js';
import displayList from './components/list/interface/displayList.js';

import displaySidebar from './components/sidebar/interface/displaySidebar.js';

//* Master List
export const masterListsArr = allListsController();
firstSetup(masterListsArr);

const inbox = masterListsArr.findList(2);

export const masterController = createMasterController(masterListsArr);

export default function createMasterController(masterListsArr) {
	// Find List
	function getList(id) {
		return masterListsArr.findList(id);
	}
	// Find dateList
	// Refresh
	function refreshList(list) {
		replaceOldList(list);
		refreshSubLists(list);
	}

	return {
		createTodo() {
			requestForm();
			// Date List?
		},
		completeTodo(todo) {
			const list = getList(todo.listId);

			list.removeTodo(todo);

			todo.toggleDone();

			list.addTodo(todo);

			refreshSubLists(list);
		},
		updateTodo(oldTodo, todo) {
			const list = getList(todo.listId);
			// Date List?
			// Update todo
			list.updateTodo(oldTodo, todo);

			// Refresh
			refreshSubLists(list);
		},
		moveTodo(oldTodo, todo) {
			const oldList = getList(oldTodo.listId);
			const newList = getList(todo.listId);
			// Date List?
			oldList.removeTodo(oldTodo);
			newList.addTodo(todo);
			// Refresh
			refreshSubLists(oldList);
		},
		newList() {
			const newList = createNewList();
			masterListsArr.addList(newList);
			refreshList(newList);
		},
		showList(id) {
			const list = getList(id);
			console.log(list);
			refreshList(list);
		}
	};
}

//* Screen

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	// if (Number(visibleList.id) === list.id) return;

	const newList = displayList(list);
	visibleList.replaceWith(newList);
}

function refreshSubLists(list) {
	refreshSubList(list.activeTodos);
	refreshSubList(list.completedTodos, false);
}

function refreshSubList(subList, active = true) {
	let subListClass = active ? 'activeTodos' : 'completedTodos';
	console.log(subListClass);

	const freshSubList = getFreshSubList(subList);
	freshSubList.className = subListClass;

	const oldUl = document.querySelector(`.${subListClass}`);
	oldUl.replaceWith(freshSubList);
}

function getFreshSubList(subList) {
	const freshSubList = document.createElement('div');

	subList.forEach((todo) => {
		const todoCard = displayCard(todo);
		controlCard(todo, todoCard);
		freshSubList.appendChild(todoCard);
	});

	return freshSubList;
}

//* Sidebar
export const inboxDisplay = displayList(inbox);
export const sidebarDisplay = displaySidebar();

export function populateSidebar() {
	const defaultSideLists = document.querySelector('.defaultSideLists');
	const customSideLists = document.querySelector('.customSideLists');

	masterListsArr.allLists.forEach((list) => {
		const listButton = document.createElement('button');
		listButton.className = 'sidebarButton';
		listButton.setAttribute('id', list.id);
		listButton.textContent = list.title || `New List ${arr.indexOf(list) - 2}`;
		// console.log(list.id);
		if (list.id <= 2) {
			defaultSideLists.append(listButton);
			if (list.id === 2) defaultSideLists.prepend(listButton);
		} else {
			customSideLists.append(listButton);
		}
	});
}

// function sidebarButtonHandleClick(list) {
// 	refreshList(list);
// }
//* Todo
function requestForm() {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');

	if (!activeForm) {
		const newTaskForm = createForm(formReturn);

		container.appendChild(newTaskForm);
		const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
		titleInput.focus();
	}
}

function formReturn({ title, notes, dueDate, priority, listId }) {
	const list = masterListsArr.findList(listId);
	const newTodo = createTodo(title, notes, dueDate, priority);
	newTodo.listId = listId;

	list.addTodo(newTodo);
	refreshSubList(list.activeTodos);
}

//* List
function createNewList() {
	const newList = createList();
	const displayNewList = displayList(newList);

	return displayNewList;
}

//* Memory

// Old Screen
// 	const visibleList = document.querySelector('.list');

// 	const nextStep = refreshConditions(visibleList, todo);

// 	if (!nextStep) return;

// 	const subList = nextStep;
// 	const sortedList = sortList(subList);

// function checkSubList(list) {
// 	if (list.activeTodos.length > 0) refreshSubList(list.activeTodos[0]);
// 	if (list.completedTodos.length > 0) refreshSubList(list.completedTodos[0]);
// }

// function refreshConditions(visibleList, todo) {
// 	if (visibleList.id < 2) {
// 		if (Number(todo.dateList) !== Number(visibleList.id)) return;
// 		return findDateList(todo).subList;
// 	}

// 	if (Number(todo.listId) !== Number(visibleList.id)) return;
// 	return findList(todo).subList;
// }

// updateCustomList(list);
// refreshSideLists();

// function refreshSideLists() {
// 	const currentLists = document.querySelector('.customLists');
// 	currentLists.replaceWith(createCustomLists(customListsArr));
// }
