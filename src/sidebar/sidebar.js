import { listArr } from '../components/list/createList';

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

	const listsDiv = createLists();
	sidebarVisual.append(listsDiv);

	return sidebarVisual;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createLists() {
	const listsDiv = document.createElement('div');

	const defaultLists = document.createElement('div');
	defaultLists.className = 'defaultLists';
	listsDiv.append(defaultLists);

	const customLists = document.createElement('div');
	customLists.className = 'customLists';
	listsDiv.append(customLists);

	listArr.forEach((list) => {
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
			// toggleSidebar();
		});
		if (list.id < 3) {
			console.log(list);
			defaultLists.append(listButton);
			console.log(defaultLists);
		}
		if (list.id > ) {
			console.log(list);
			customLists.append(listButton);
		}
	});

	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		addCustomList();
		refreshSideLists();
	});
	customLists.append(addListButton);

	return listsDiv;
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

function refreshSideLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(customListsArr));
}

export { sidebar, refreshSideLists };
