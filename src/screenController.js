import { masterController } from './masterController';
import { createTodoCard } from './components/todo/todo';
import createListElement from './components/list/interface/listElement';

export default function createScreenController() {
	function refreshSubList(list) {
		const activeSubList = list.activeTodos.length > 0;
		const completedSubList = list.completedTodos.length > 0;

		if (activeSubList) refreshActiveSub(list.activeTodos);
		if (completedSubList) refreshCompletedSub(list.completedTodos);
	}

	return {
		// List
		replaceCurrentList(list) {
			const currentList = document.querySelector('.list');
			const newList = createListElement(list);
			currentList.replaceWith(newList);
			refreshSubList(list);
		},
		refreshSubList,
		// Sidebar
		updateSideList(list) {
			console.log(`.sidebarButton.${list.id}`);

			const buttonToUpdate = document.querySelector(
				`.sidebarButton#id${list.id}`
			);

			console.log(buttonToUpdate);
			buttonToUpdate.textContent = list.title;
		},
		refreshSideBar() {
			const oldSideLists = document.querySelector('.customSideLists');
			const freshSideList = freshCustomSideLists();
			console.log(freshSideList);

			oldSideLists.replaceWith(freshSideList);
		},
	};
}

//* Screen

// Sub List
function refreshActiveSub(subList) {
	const activeSubList = document.createElement('div');
	activeSubList.classList = 'activeTodos';

	subList.forEach((todo) => activeSubList.appendChild(createTodoCard(todo)));

	const oldUl = document.querySelector('.activeTodos');
	oldUl.replaceWith(activeSubList);
}

function refreshCompletedSub(subList) {
	const completedSubList = document.createElement('div');
	completedSubList.classList = 'completedTodos';

	subList.forEach((todo) => completedSubList.appendChild(createTodoCard(todo)));

	const oldUl = document.querySelector('.completedTodos');
	oldUl.replaceWith(completedSubList);
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

function createSideListButton(sideList) {
	const sideListButton = document.createElement('button');
	sideListButton.className = 'sidebarButton';
	sideListButton.setAttribute('id', `id${sideList.id}`);
	sideListButton.textContent = sideList.title || `New List ${sideList.id - 2}`;
	sideListButton.onclick = () => masterController.showList(sideList.id);

	return sideListButton;
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}
