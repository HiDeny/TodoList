import firstSetup from './firstRun.js';

import allListsController from './components/list/controller/controlAllLists.js';

import createForm from './components/todo/interface/displayForm.js';
import createTodo from './components/todo/todo.js';
import displayCard from './components/todo/interface/displayCard.js';
import controlCard from './components/todo/controller/controlCard.js';

import createList from './components/list/createList.js';
import displayList from './components/list/interface/displayList.js';

import displaySidebar from './components/sidebar/interface/displaySidebar.js';
import { controlSideBarButtons } from './components/sidebar/controller/controlSidebar.js';

//* Master List

export const masterController = createMasterController();

// First Run
const today = createList('🌤️ Today', "Todos with today's date");
today.id = 0;
const upcoming = createList('📆 Upcoming', 'Todos with future dates');
upcoming.id = 1;
const inbox = createList('📥 Inbox', 'Default list');
inbox.id = 2;

masterController.listsControl.addDefaultList(today);
masterController.listsControl.addDefaultList(upcoming);
masterController.listsControl.addDefaultList(inbox);

function createMasterController() {
	const listsControl = allListsController();
	console.log(listsControl);

	// Find List
	function getList(id) {
		return listsControl.allLists.find((list) => list.id === Number(id));
	}
	// Find dateList
	// Refresh
	function refreshList(list) {
		replaceOldList(list);
		refreshSubLists(list);
	}

	//* Todo
	function newTodoForm() {
		const container = document.querySelector('div.container');
		const activeForm = document.querySelector('#todoForm');

		if (!activeForm) {
			const newTaskForm = createForm(handleFormReturn);

			container.appendChild(newTaskForm);
			const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
			titleInput.focus();
		}

		function handleFormReturn({ title, notes, dueDate, priority, listId }) {
			const list = getList(listId);
			const newTodo = createTodo(title, notes, dueDate, priority);
			newTodo.listId = listId;

			list.addTodo(newTodo);
			refreshSubList(list.activeTodos);
		}
	}

	return {
		listsControl,
		// Defaults
		getInbox() {
			return inbox;
		},
		getToday() {
			return today;
		},
		getUpcoming() {
			return upcoming;
		},

		//* Todos
		createTodo() {
			newTodoForm();
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
		//* Lists
		addList() {
			const newList = createList();
			listsControl.addList(newList);
			newList.id = listsControl.allLists.indexOf(newList);
			console.log(listsControl.customLists);
			refreshList(newList);
			freshCustomSideLists();
		},
		deleteList(list) {
			const check = confirm(
				`Do you really want to delete ${list.title.toUpperCase()}?`
			);
			if (!check) return;
			listsControl.deleteList(list, check);
			refreshList(inbox);
			freshCustomSideLists();
		},
		updateList(oldList, list) {
			listsControl.updateList(oldList, list);
			freshCustomSideLists();
		},
		showList(id) {
			const list = getList(id);
			refreshList(list);
		},
	};
}

console.log(masterController);

//* Screen

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

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

export const inboxDisplay = displayList(masterController.getInbox());
export const sidebarDisplay = displaySidebar();

export function populateSidebar() {
	const defaultSideLists = document.querySelector('.defaultSideLists');
	const customSideLists = document.querySelector('.customSideLists');
	const addListButton = createAddListButton();

	masterController.listsControl.allLists.forEach((list) => {
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

	setTimeout(() => {
		controlSideBarButtons();
	}, 50);

	customSideLists.append(addListButton);
}

function freshCustomSideLists() {
	const oldSideLists = document.querySelector('.customSideLists');

	const freshSideList = document.createElement('div');
	freshSideList.className = 'customSideLists';
	const addListButton = createAddListButton();

	masterController.listsControl.customLists.forEach((sideList) => {
		const listButton = document.createElement('button');
		listButton.className = 'sidebarButton';
		listButton.setAttribute('id', sideList.id);
		listButton.textContent =
			sideList.title ||
			`New List ${masterController.listsControl.customLists.indexOf(sideList)}`;
		// console.log(list.id);
		freshSideList.append(listButton);
	});

	freshSideList.append(addListButton);

	setTimeout(() => {
		controlSideBarButtons();
	}, 50);

	oldSideLists.replaceWith(freshSideList);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

// function sidebarButtonHandleClick(list) {
// 	refreshList(list);
// }

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
// function findDateList(todo) {
// 	if (!todo.dueDate) return null;

// 	const date = new Date(todo.dueDate);

// 	const completeList = isToday(date) ? today : upcoming;
// 	const subList = !todo.done
// 		? completeList.activeTodos
// 		: completeList.completedTodos;

// 	return { completeList, subList };
// }

// function addDateList(todo) {
// 	const dateList = findDateList(todo);
// 	if (dateList) {
// 		todo.dateList = dateList.completeList.id;
// 		dateList.subList.push(todo);
// 		updateListMemory(dateList.completeList);
// 	}
// }

// Remove
// function removeDateList(todo) {
// 	const dateList = findDateList(todo);
// 	if (dateList) {
// 		dateList.subList.splice(dateList.subList.indexOf(todo), 1);
// 		updateListMemory(dateList.completeList);
// 	}
// }

// import { getLists, updateListMemory } from '../memory/storage';
// const allLists = getLists();
// updateListMemory();
