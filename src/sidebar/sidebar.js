import { createList, defaultListsArr, customListsArr } from '../components/list/createList';

// import { createListForm } from '../components/list/listForm';

import { refreshList } from '../components/list/displayList';
import { addCustomList } from '../components/list/updateList';
import { displayCustomList } from '../components/list/displayCustomList';

// Sidebar
function sidebar() {
	const sidebarDiv = createSidebarVisual();

	function toggleSidebar() {
		const sidebar = document.querySelector('.sidebar');

		if (sidebar.classList.contains('showSidebar')) {
			sidebar.classList.remove('showSidebar');
		} else {
			sidebar.classList.add('showSidebar');
		}
	}

	return { sidebarDiv, toggleSidebar };
}

function createSidebarVisual() {
	const sidebarVisual = createSidebar();

	const defaultLists = createDefaultLists(defaultListsArr);
	sidebarVisual.append(defaultLists);

	const customLists = createCustomLists(customListsArr);
	sidebarVisual.append(customLists);

	return sidebarVisual;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createDefaultLists(defaultListsArr) {
	const defaultLists = document.createElement('div');
	defaultLists.className = 'defaultLists';

	defaultListsArr.forEach((list) => {
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
			// toggleSidebar();
		});
		defaultLists.append(listButton);
	});

	return defaultLists;
}

function createCustomLists(customListsArr) {
	const customLists = document.createElement('div');
	customLists.className = 'customLists';

	customListsArr.forEach((list) => {
		if (list.id === 0) return;
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
			// toggleSidebar();
		});
		customLists.append(listButton);
	});

	// const addListButton = createAddListButton();
	// addListButton.addEventListener('click', () => {
	// 	const newForm = createListForm(handleReturn);
	// 	addListButton.replaceWith(newForm);
	// 	const titleInput = newForm.querySelector('input[name="listTitle"]');
	// 	titleInput.focus();
	// });
	// customLists.append(addListButton);


	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		const visibleList = document.querySelector('.list');
		const newList = createList('New List');
		addCustomList(newList);
		refreshSideLists();
		console.log(newList);

		const displayNewList = displayCustomList(newList);
		visibleList.replaceWith(displayNewList);
		const titleInput = displayNewList.querySelector('input');
		titleInput.focus();
	});
	customLists.append(addListButton);

	return customLists;
}

function listButtonHandleClick(list) {
	refreshList(list);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.classList.add('addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

// function handleReturn(newList) {
// 	customListsArr.push(newList);
// 	refreshSideLists();
// }

function refreshSideLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(customListsArr));
}

export { sidebar, refreshSideLists };
