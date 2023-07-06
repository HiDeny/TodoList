import { createList, listsArr } from '../components/list/createList';

import { displayFreshList, refreshCompleted, refreshList } from '../components/list/displayList';

// Sidebar
function sidebarMenu() {
	const sidebar = createSidebar();

	const sidebarContent = createSidebarContent(listsArr);
	sidebar.append(sidebarContent);

	return sidebar;
}

function createSidebar() {
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	return sidebar;
}

function createSidebarContent(listsArr) {
	const sidebarContent = document.createElement('div');
	sidebarContent.className = 'sidebarContent';

	listsArr.forEach((list) => {
		const listButton = document.createElement('button');
		listButton.setAttribute('class', 'sidebarButton');
		listButton.textContent = list.title;
		listButton.addEventListener('click', () => {
			listButtonHandleClick(list);
		});
		sidebarContent.append(listButton);
	});

	const addListButton = createAddListButton();
	addListButton.addEventListener('click', () => {
		addListButton.replaceWith(newListForm());
	});
	sidebarContent.append(addListButton);

	return sidebarContent;
}

function listButtonHandleClick(list) {
	const newList = displayFreshList(list);
	const currentList = document.querySelector('.list');
	currentList.replaceWith(newList.completeList);
	refreshList(list);
	refreshCompleted(list);
}

function createAddListButton() {
	const addListButton = document.createElement('button');
	addListButton.setAttribute('class', 'sidebarButton');
	addListButton.textContent = '+ New List';

	return addListButton;
}

function newListForm() {
	// Use data from form for Title and Description
	// add new list to list arr
	// refresh side bar
	// display new list
	
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
		console.log(listForm);
	});

	// listForm.addEventListener('keydown', (event) => {
	// 	handleEnterKey(event, listForm, callback);
	// 	handleEscapeKey(event, listForm);
	// });

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
		refreshSideBar();
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
	refreshSideBar();
	displayFreshList(newList)
}

function refreshSideBar() {
	const currentSidebar = document.querySelector('.sidebarContent');
	currentSidebar.replaceWith(createSidebarContent(listsArr));
}

export { sidebarMenu };
