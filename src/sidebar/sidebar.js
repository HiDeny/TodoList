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

	const defaultDiv = populateLists().defaultDiv;
	sidebarVisual.append(defaultDiv);

	const customDiv = populateLists().customDiv;
	sidebarVisual.append(customDiv);

	populateLists(defaultDiv, customDiv);

	return sidebarVisual;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function populateLists() {
	const defaultDiv = document.createElement('div');
	defaultDiv.className = 'defaultLists';

	const customDiv = document.createElement('div');
	customDiv.className = 'customLists';

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

	return { defaultDiv, customDiv };
}

function createListButton(list) {
	const listButton = document.createElement('button');
	listButton.className = 'sidebarButton';
	console.log(list);
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

function customSideLists() {
	const customLists = document.querySelector(`.customLists`);
	customLists.replaceWith(populateLists().customDiv);
}

function addNewSideList(list) {
	const customLists = document.querySelector('.customLists');
	customLists.insertBefore(createListButton(list), customLists.lastChild);
}

function removeSideList(list) {
	const currentList = document.querySelector(`.sidebarButton.no${list.id}`);
	currentList.remove();
}

export { sidebar, addNewSideList, customSideLists, removeSideList };
