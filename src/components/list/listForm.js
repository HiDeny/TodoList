import { createList } from "./createList";

function createListForm(handleReturn) {
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

export { createListForm };
