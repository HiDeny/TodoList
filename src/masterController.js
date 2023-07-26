import { isFuture, isToday } from 'date-fns';

import setupDefaultLists from './firstRun.js';

import allListsController from './components/list/controller/controlAllLists.js';
import createScreenController from './screenController.js';

import createTodo from './components/todo/createTodo.js';
import { createTodoForm } from './components/todo/todo.js';

import createList from './components/list/createList.js';
import createListElement from './components/list/interface/listElement.js';

import displaySidebar from './components/sidebar/interface/displaySidebar.js';

//* Master List

export const masterController = createMasterController();

function createMasterController() {
	const screenControl = createScreenController();
	const listsControl = allListsController();
	setupDefaultLists(listsControl);

	const inbox = listsControl.defaultLists[0];
	const today = listsControl.defaultLists[1];
	const upcoming = listsControl.defaultLists[2];

	return {
		screenControl,
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
			createTodoForm(handleFormReturn);
		},
		addTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			if (dateList) {
				dateList.addTodo(todo);
				todo.dateListId = Number(dateList.id);
				screenControl.refreshSubList(dateList);
			}

			list.addTodo(todo);
			screenControl.refreshSubList(list);
		},
		removeTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			if (dateList) dateList.removeTodo(todo);
			list.removeTodo(todo);
		},
		completeTodo(todo) {
			this.removeTodo(todo);
			todo.toggleDone();
			this.addTodo(todo);
		},
		updateTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			// Refresh
			screenControl.refreshSubList(list);
			if (dateList) screenControl.refreshSubList(dateList);
		},
		moveTodo(oldTodo, todo) {
			this.removeTodo(oldTodo);
			this.addTodo(todo);
		},
		//* Lists
		addList() {
			const newList = createList();
			listsControl.addList(newList);

			screenControl.replaceCurrentList(newList);
			screenControl.refreshSideBar();
		},
		deleteList(list) {
			const check = confirm(
				`Do you really want to delete ${list.title.toUpperCase()}?`
			);
			if (!check) return;

			if (check) {
				while (list.activeTodos.length > 0) {
					this.removeTodo(list.activeTodos[0]);
				}
				while (list.completedTodos.length > 0) {
					this.removeTodo(list.completedTodos[0]);
				}
				listsControl.deleteList(list);
			}

			screenControl.refreshSideBar();
			screenControl.replaceCurrentList(inbox);
		},
		updateList(oldList, list) {
			listsControl.updateList(oldList, list);
			screenControl.updateSideList(list);
		},
		showList(id) {
			const list = listsControl.getList(id);
			screenControl.replaceCurrentList(list);
		},
	};
}

//* Form
function handleFormReturn({ title, notes, dueDate, priority, listId }) {
	const newTodo = createTodo(title, notes, dueDate, priority);
	newTodo.listId = Number(listId);

	masterController.addTodo(newTodo);
}

//* Date List
function findDateList(dueDate) {
	const dateToCheck = new Date(dueDate);
	if (isToday(dateToCheck)) return masterController.getToday();
	if (isFuture(dateToCheck)) return masterController.getUpcoming();
}

//* Sidebar

export const inboxDisplay = createListElement(masterController.getInbox());
export const sidebarDisplay = displaySidebar();

export function populateSidebar() {
	const defaultSideLists = document.querySelector('.defaultSideLists');
	const customSideLists = document.querySelector('.customSideLists');

	const addListButton = createAddListButton();
	addListButton.onclick = () => masterController.addList();

	const allListsArr = masterController.listsControl.allLists;

	allListsArr.forEach((list) => {
		const sideListButton = document.createElement('button');
		sideListButton.className = 'sidebarButton';
		sideListButton.setAttribute('id', `no${list.id}`);
		sideListButton.textContent =
			list.title || `New List ${arr.indexOf(list) - 2}`;
		sideListButton.onclick = () => masterController.showList(list.id);
		// console.log(list.id);
		if (list.id <= 2) {
			defaultSideLists.append(sideListButton);
			if (list.id === 2) defaultSideLists.prepend(sideListButton);
		} else {
			customSideLists.append(sideListButton);
		}
	});

	customSideLists.append(addListButton);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

//* Memory

// Old Screen
// 	const visibleList = document.querySelector('.list');

// 	const nextStep = refreshConditions(visibleList, todo);

// 	if (!nextStep) return;

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

// import { listsControl.getLists, updateListMemory } from '../memory/storage';
// const allLists = listsControl.getLists();
// updateListMemory();
