export default function displaySidebar() {
	const displaySidebar = createSidebar();

	const defaultSideLists = createdefaultSideLists();
	displaySidebar.append(defaultSideLists);

	const customSideLists = createcustomSideLists();
	displaySidebar.append(customSideLists);

	const addListButton = createAddListButton();
	customSideLists.append(addListButton);

	return displaySidebar;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createdefaultSideLists() {
	const defaultSideLists = document.createElement('div');
	defaultSideLists.className = 'defaultSideLists';

	return defaultSideLists;
}

function createcustomSideLists() {
	const customSideLists = document.createElement('div');
	customSideLists.className = 'customSideLists';

	return customSideLists;
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}
