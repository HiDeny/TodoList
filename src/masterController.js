import firstSetup from './firstRun.js';

import allListsController from './components/list/controller/controlAllLists.js';

import createForm from './components/todo/interface/displayForm.js';
import createTodo from './components/todo/todo.js';
import displayCard from './components/todo/interface/displayCard.js';

import displayList from './components/list/interface/displayList.js';

import displaySidebar from './components/sidebar/interface/displaySidebar.js';

export const masterListsArr = allListsController();
firstSetup(masterListsArr);
const inbox = masterListsArr.findList(2);

export const sidebarDisplay = displaySidebar(masterListsArr);
export const inboxDisplay = displayList(inbox);

export default function screenController() {}

export function requestForm() {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');

	if (!activeForm) {
		const newTaskForm = createForm(masterListsArr, formReturn);

		container.appendChild(newTaskForm);
		const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
		titleInput.focus();
	}
}

function formReturn(formData) {
	const newTodo = createTodo(
		formData.title,
		formData.notes,
		formData.dueDate,
		formData.priority
	);
	// const newTodo = createTodo({title, notes, dueDate, priority});
	inbox.addTodo(newTodo);
	console.log(newTodo);
	refreshActiveList(inbox);
}

export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}

function sidebarButtonHandleClick(list) {
	refreshList(list);
}

function refreshActiveList(list) {
	const newSubListDiv = document.createElement('div');
	// newVisual.className = listClass;

	list.activeTodos.forEach((todo) => {
		newSubListDiv.appendChild(displayCard(todo));
	});

	// const oldUl = document.querySelector(`.${listClass}`);
	const oldUl = document.querySelector(`.activeTodos`);
	oldUl.replaceWith(newSubListDiv);
}

function refreshCompletedList(list) {
	const newSubListDiv = document.createElement('div');
	// newVisual.className = listClass;

	list.activeTodos.forEach((todo) => {
		newSubListDiv.appendChild(displayCard(todo));
	});
	list.activeTodos.forEach((todo) => {
		newSubListDiv.appendChild(displayCard(todo));
	});

	const oldUl = document.querySelector(`.${listClass}`);
	oldUl.replaceWith(newVisual);
}

// 	const visibleList = document.querySelector('.list');

// 	const nextStep = refreshConditions(visibleList, todo);

// 	if (!nextStep) return;

// 	const subList = nextStep;
// 	const sortedList = sortList(subList);

//

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

function refreshScreen(list) {
	// replaceOldList(list);
	// focusTitle();
	// checkSubList(list);
}

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

	const newList = displayList(list);
	visibleList.replaceWith(newList);
}

function refreshSideLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(customListsArr));
}

// Refresh Screen
// Show new list
// Screen controller?
