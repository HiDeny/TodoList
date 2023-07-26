import { populateSidebar } from '../controller/controlSidebar';

export default function displaySidebar() {
	const displaySidebar = createSidebar();

	const defaultSideLists = createDefaultSideLists();
	displaySidebar.append(defaultSideLists);

	const customSideLists = createCustomSideLists();
	displaySidebar.append(customSideLists);

	populateSidebar(defaultSideLists, customSideLists);

	return displaySidebar;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createDefaultSideLists() {
	const defaultSideLists = document.createElement('div');
	defaultSideLists.className = 'defaultSideLists';

	return defaultSideLists;
}

function createCustomSideLists() {
	const customSideLists = document.createElement('div');
	customSideLists.className = 'customSideLists';

	return customSideLists;
}
