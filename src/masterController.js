import setupDefaultLists from './firstRun.js';

import allListsController from './components/list/controller/controlAllLists.js';
import createScreenController from './screenController.js';

import createTodo from './components/todo/createTodo.js';
import { createTodoCard, createTodoForm } from './components/todo/todo.js';

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

	// Find dateList

	function handleFormReturn({ title, notes, dueDate, priority, listId }) {
		const list = listsControl.getList(listId);
		const newTodo = createTodo(title, notes, dueDate, priority);
		newTodo.listId = Number(listId);

		list.addTodo(newTodo);
		screenControl.refreshSubList(list);
	}

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
		removeTodo(todo) {
			const list = listsControl.getList(todo.listId);

			list.removeTodo(todo);

			screenControl.refreshSubList(list);
		},
		completeTodo(todo) {
			const list = listsControl.getList(todo.listId);

			list.removeTodo(todo);

			todo.toggleDone();

			list.addTodo(todo);

			list.sortList();
			screenControl.refreshSubList(list);
		},
		updateTodo(todo) {
			const list = listsControl.getList(todo.listId);
			// Date List?

			// Refresh
			list.sortList();
			screenControl.refreshSubList(list);
		},
		moveTodo(oldTodo, todo) {
			const oldList = listsControl.getList(oldTodo.listId);
			const newList = listsControl.getList(todo.listId);
			// Date List?
			oldList.removeTodo(oldTodo);
			newList.addTodo(todo);
			newList.sortList();
			// Refresh
			screenControl.refreshSubList(oldList);
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
			listsControl.deleteList(list, check);

			screenControl.replaceCurrentList(inbox);
			screenControl.refreshSideBar();
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

// import { listsControl.getLists, updateListMemory } from '../memory/storage';
// const allLists = listsControl.getLists();
// updateListMemory();
