import {
	createList,
	defaultListsArr,
	listsArr,
} from '../components/list/createList';

import {
	displayFreshList,
	refreshCompleted,
	refreshList,
} from '../components/list/displayList';

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

	const customLists = createCustomLists(listsArr);
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

function createCustomLists(listsArr) {
	const customLists = document.createElement('div');
	customLists.className = 'customLists';

	listsArr.forEach((list) => {
		if (list.title === '📥 Inbox') return;
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
		});
		customLists.append(listButton);
	});

	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		const newForm = newListForm();
		addListButton.replaceWith(newForm);
		const titleInput = newForm.querySelector('input');
		console.log(titleInput);
		titleInput.focus();
	});
	customLists.append(addListButton);

	return customLists;
}

function listButtonHandleClick(list) {
	const newList = displayFreshList(list);
	const currentList = document.querySelector('.list');
	currentList.replaceWith(newList.completeList);
	refreshList(list);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.className = 'sidebarButton';
	addListButton.classList.add('addListButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

function newListForm() {
	const activeForm = document.querySelector('#listForm');

	if (activeForm) return;
	const newListForm = createListForm();

	return newListForm;
}

//! Here
function createListForm() {
	// handle submit - callback?
	const listForm = createForm();

	const cancelButtonForm = createCancelButton(listForm);
	listForm.append(cancelButtonForm);

	const titleForm = createTitle();
	listForm.append(titleForm);

	const descriptionForm = createDescription();
	listForm.append(descriptionForm);

	const submitButton = createSubmitButton();
	listForm.append(submitButton);

	listForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSubmit(handleReturn, listForm);
	});

	listForm.addEventListener('keydown', (event) => {
		handleEnterKey(event, handleReturn, listForm);
		handleEscapeKey(event, listForm);
	});

	return listForm;
}

function createForm() {
	const form = document.createElement('form');
	form.setAttribute('id', 'listForm');
	form.setAttribute('tabindex', '1');

	return form;
}

function createCancelButton(form) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'cancelListForm';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		form.remove();
		refreshLists();
	});

	return cancelButton;
}

function createTitle() {
	const title = document.createElement('input');
	title.setAttribute('id', 'listTitle');
	title.setAttribute('name', 'listTitle');
	title.setAttribute('type', 'text');
	title.setAttribute('placeholder', 'Title...');

	return title;
}

function createDescription() {
	const description = document.createElement('textarea');
	description.setAttribute('id', 'listDescription');
	description.setAttribute('name', 'listDescription');
	description.setAttribute('placeholder', 'Description');

	return description;
}

function createSubmitButton() {
	const submitButton = document.createElement('button');
	submitButton.className = 'listSubmitButton';
	submitButton.setAttribute('type', 'submit');
	submitButton.textContent = 'Add!';

	return submitButton;
}

function handleSubmit(handleReturn, formDiv) {
	const title = formDiv.elements['listTitle'].value;
	const description = formDiv.elements['listDescription'].value;

	const newList = createList(title, description);

	handleReturn(newList);
	formDiv.remove();
}

function handleReturn(newList) {
	listsArr.push(newList);
	refreshLists();
	displayFreshList(newList);
}

function refreshLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(listsArr));
}

function handleEnterKey(event, handleReturn, formDiv) {
	if (event.code === 'Enter') {
		handleSubmit(handleReturn, formDiv);
		formDiv.removeEventListener('keydown', handleEnterKey);
	}
}

function handleEscapeKey(event, formDiv) {
	if (event.code === 'Escape') {
		formDiv.remove();
		formDiv.removeEventListener('keydown', handleEscapeKey);
	}
}

export { sidebar };
