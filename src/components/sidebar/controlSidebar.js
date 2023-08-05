import { masterController } from '../../masterController';

export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}

export function populateSidebar(defaultSideLists, customSideLists) {
	const allListsArr = masterController.listsControl.allLists;

	const addListButton = createAddListButton();
	addListButton.onclick = () => masterController.addList();

	allListsArr.forEach((list) => {
		const sideListButton = createSideListButton(list);
		if (list.id === 0) defaultSideLists.prepend(sideListButton);
		if (list.id <= 2) defaultSideLists.append(sideListButton);
		if (list.id > 2) customSideLists.append(sideListButton);
	});

	customSideLists.append(addListButton);
}

export function createSideListButton(list) {
	const sideListButton = document.createElement('button');
	sideListButton.className = 'sidebarButton';
	sideListButton.setAttribute('id', `no${list.id}`);
	sideListButton.textContent = list.title;
	sideListButton.onclick = () => masterController.showList(list.id);

	return sideListButton;
}

export function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.setAttribute('id', 'addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}