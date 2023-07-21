export default function displaySidebar(masterListsArr) {
	const displaySidebar = createSidebar();

	const defaultLists = createDefaultLists();
	displaySidebar.append(defaultLists);

	const customLists = createCustomLists();
	displaySidebar.append(customLists);

	populateSidebar(defaultLists, customLists, masterListsArr);

	const addListButton = createAddListButton();
	customLists.append(addListButton);

	return displaySidebar;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createDefaultLists() {
	const defaultLists = document.createElement('div');
	defaultLists.className = 'defaultLists';

	return defaultLists;
}

function createCustomLists() {
	const customLists = document.createElement('div');
	customLists.className = 'customLists';

	return customLists;
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

function populateSidebar(defaultLists, customLists, arr) {
	arr.allLists.forEach((list) => {
		console.log(list);
		const listButton = document.createElement('button');
		listButton.className = 'sidebarButton';
		listButton.setAttribute('id', list.id);
		listButton.textContent = list.title || `New List ${arr.indexOf(list) - 2}`;
		console.log(list.id);
		if (list.id <= 2) {
			defaultLists.append(listButton);
			if (list.id === 2) defaultLists.prepend(listButton);
		} else {
			customLists.append(listButton);
		}
	});
}


