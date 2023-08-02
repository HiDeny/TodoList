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
				changeAlert.classList.add('showChange');
			}, 200);

			setTimeout(() => {
				changeAlert.classList.remove('showChange');
			}, 2000);
		},
	};
}

// Sub List
function refreshSubList(subList, className) {
	const newSubList = document.createElement('div');
	newSubList.classList = className;

	subList.forEach((todo) => newSubList.appendChild(createTodoCard(todo)));

	const oldSubList = document.querySelector(`.${className}`);
	oldSubList.replaceWith(newSubList);
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
