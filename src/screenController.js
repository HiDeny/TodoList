import { masterController } from './masterController';

import { createTodoCard } from './components/todo/todo';

import createListElement from './components/list/interface/listElement';

import {
	createAddListButton,
	createSideListButton,
} from './components/sidebar/controlSidebar';

export default function createScreenController() {
	return {
		// List
		replaceCurrentList(list) {
			const currentList = document.querySelector('.list');
			const newListElement = createListElement(list);
			currentList.replaceWith(newListElement);

			this.checkSubLists(list);
		},
		checkSubLists(list) {
			const visibleList = document.querySelector('.list');
			if (Number(visibleList.id) !== list.id) return;
			list.sortList();
			refreshSubList(list.activeTodos, 'activeTodos');
			refreshSubList(list.completedTodos, 'completedTodos');
		},
		// Sidebar
		showActiveSideButton(list) {
			const currentlyActive = document.querySelector('.activeSideButton');
			if (currentlyActive) currentlyActive.classList.remove('activeSideButton');

			const sideListSelector = `.sidebarButton#no${list.id}`;
			const buttonToUpdate = document.querySelector(sideListSelector);
			if (buttonToUpdate) buttonToUpdate.classList.add('activeSideButton');
		},
		updateSideList(list) {
			const sideListSelector = `.sidebarButton#no${list.id}`;
			const buttonToUpdate = document.querySelector(sideListSelector);

			buttonToUpdate.textContent = list.title;
		},
		refreshSideBar() {
			const oldSideLists = document.querySelector('.customSideLists');
			const freshSideList = freshCustomSideLists();

			oldSideLists.replaceWith(freshSideList);
		},
		// Display changes
		displayChange(occurringChange) {
			const containerDiv = document.querySelector('.container');
			const changeAlert = document.createElement('div');
			changeAlert.className = 'changeAlert';
			containerDiv.append(changeAlert);

			changeAlert.textContent = occurringChange;

			setTimeout(() => {
				changeAlert.remove();
			}, 4000);
		},
		hideBgd() {
			const activeForm = document.querySelector('#todoForm');
			const darkBackground = document.createElement('div');
			darkBackground.classList.add('darkBgd');

			activeForm.append(darkBackground);
		},
	};
}

// Sub List
function refreshSubList(subList, className) {
	let newSubList = document.createElement('div');
	newSubList.className = className;

	subList.forEach((todo) => newSubList.appendChild(createTodoCard(todo)));

	if (subList.length === 0) newSubList = emptyListMessage(className);

	const oldSubList = document.querySelector(`.${className}`);
	oldSubList.replaceWith(newSubList);
}

function emptyListMessage(classList) {
	const emptyList = document.createElement('div');
	emptyList.className = classList;
	emptyList.classList.add('emptySubList');

	let message;
	if (classList === 'activeTodos') message = 'Add to-do by pressing +';
	if (classList === 'completedTodos') message = 'No completed to-dos, yet!';
	emptyList.textContent = message;

	return emptyList;
}

// Sidebar
function freshCustomSideLists() {
	const freshSideList = document.createElement('div');
	freshSideList.className = 'customSideLists';

	const customLists = masterController.listsControl.customLists;

	customLists.forEach((sideList) => {
		freshSideList.append(createSideListButton(sideList));
	});

	const addListButton = createAddListButton();
	addListButton.onclick = () => masterController.addList();

	freshSideList.append(addListButton);

	return freshSideList;
}
