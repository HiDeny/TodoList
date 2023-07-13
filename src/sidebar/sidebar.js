import { ListsArr } from '../components/list/createList';

import { addCustomList } from '../components/list/updateList';

import { refreshList } from '../components/list/displayList';

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

	const defaultDiv = createDefaultListsDiv();
	sidebarVisual.append(defaultDiv);

	const customDiv = createCustomListsDiv();
	sidebarVisual.append(customDiv);

	populateLists(defaultDiv, customDiv);

	return sidebarVisual;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createDefaultListsDiv() {
	const defaultLists = document.createElement('div');
	defaultLists.className = 'defaultLists';

	return defaultLists;
}

function createCustomListsDiv() {
	const customLists = document.createElement('div');
	customLists.className = 'customLists';

	return customLists;
}

function populateLists(defaultDiv, customDiv) {
	ListsArr.forEach((list) => {
		const listButton = createListButton(list);
		if (list.id < 2) defaultDiv.append(listButton);
		if (list.id == 2) defaultDiv.prepend(listButton);
		if (list.id >= 3) customDiv.append(listButton);
	});

	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		addCustomList();
	});
	customDiv.append(addListButton);
}

function createListButton(list) {
	const listButton = document.createElement('button');
	listButton.className = 'sidebarButton';
	listButton.classList.add(`no${list.id}`);
	listButton.textContent = list.title ? list.title : 'New List';
	listButton.addEventListener('click', () => {
		sideListButtonClick(list);
		// toggleSidebar();
	});

	return listButton;
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.classList.add('addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

function sideListButtonClick(list) {
	refreshList(list);
}

function refreshSideList(list) {
	const currentList = document.querySelector(`.sidebarButton.no${list.id}`);
	currentList.replaceWith(createListButton(list));
}

function addNewSideList(list) {
	const customLists = document.querySelector('.customLists');
	customLists.insertBefore(createListButton(list), customLists.lastChild);
}

function removeSideList(list) {
	const currentList = document.querySelector(`.sidebarButton.no${list.id}`);
	currentList.remove();
}

export { sidebar, addNewSideList, refreshSideList, removeSideList };
