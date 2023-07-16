import { defaultListsArr, customListsArr } from '../components/list/createList';

import { refreshList } from '../components/list/displayList';
import { addCustomList } from '../components/list/updateList';

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

	const defaultLists = createDefaultLists();
	sidebarVisual.append(defaultLists);

	const customLists = createCustomLists();
	sidebarVisual.append(customLists);

	return sidebarVisual;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createDefaultLists() {
	const defaultLists = document.createElement('div');
	defaultLists.className = 'defaultLists';

	defaultListsArr.forEach((list) => {
		console.log(list);
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
			// toggleSidebar();
		});
		defaultLists.append(listButton);
		if (list.id === 2) defaultLists.prepend(listButton);
	});

	return defaultLists;
}

function createCustomLists() {
	const customLists = document.createElement('div');
	customLists.className = 'customLists';

	customListsArr.forEach((list) => {
		if (list.id === 2) return;
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title
			? list.title
			: `New List ${customListsArr.indexOf(list)}`;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
			// toggleSidebar();
		});
		customLists.append(listButton);
	});

	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		addCustomList();
		refreshSideLists();
	});
	customLists.append(addListButton);

	return customLists;
}

function listButtonHandleClick(list) {
	console.log(list);
	refreshList(list);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.classList.add('addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

function refreshSideLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(customListsArr));
}

export { sidebar, refreshSideLists };
