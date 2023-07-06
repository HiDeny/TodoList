import createTodo from './createTodo';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function todoForm(callback) {
	const todoForm = createTodoForm();

	//? Id input - hidden ?

	const cancelButtonForm = createCancelButtonForm(todoForm, callback);
	todoForm.append(cancelButtonForm);

	const titleForm = createTitleForm();
	todoForm.append(titleForm);

	const notesForm = createNotesForm();
	todoForm.append(notesForm);

	const dueDateForm = createDateForm();
	todoForm.append(dueDateForm);

	//? Lists Select / Datalist element, populated with all lists and projects available
	// const listsFrom = createListsForm(listsArr);
	// todoForm.append(listsFrom);

	const priorityForm = createPriorityForm();
	todoForm.append(priorityForm);

	const submitButton = createSubmitButton();
	todoForm.append(submitButton);

	todoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSubmit(callback, todoForm);
	});

	todoForm.addEventListener('keydown', (event) => {
		handleEnterKey(event, todoForm, callback);
		handleEscapeKey(event, todoForm);
	});

	return todoForm;
}

function createTodoForm() {
	const todoForm = document.createElement('form');
	todoForm.setAttribute('id', 'todoForm');
	todoForm.setAttribute('tabindex', '1');
	todoForm.setAttribute('method', 'post');

	return todoForm;
}

function createCancelButtonForm(form) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'cancelForm';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		form.remove();
	});

	return cancelButton;
}

function createTitleForm() {
	const formTitleLabel = createLabel('formTitle');

	const formTitle = document.createElement('input');
	formTitle.setAttribute('required', true);
	formTitle.setAttribute('id', 'formTitle');
	formTitle.setAttribute('name', 'formTitle');
	formTitle.setAttribute('type', 'text');
	formTitle.setAttribute('placeholder', 'Title...');

	formTitleLabel.append(formTitle);
	return formTitleLabel;
}

function createNotesForm() {
	const formNotesLabel = createLabel('formNotes');

	const formNotes = document.createElement('textarea');
	formNotes.setAttribute('id', 'formNotes');
	formNotes.setAttribute('name', 'formNotes');
	formNotes.setAttribute('placeholder', 'Notes');

	formNotesLabel.append(formNotes);
	return formNotesLabel;
}

function createDateForm() {
	const formDateLabel = createLabel('formDate');

	const formDate = document.createElement('input');
	formDate.setAttribute('id', 'formDate');
	formDate.setAttribute('name', 'formDate');
	formDate.setAttribute('type', 'text');
	formDate.setAttribute('placeholder', 'Date');

	flatpickr(formDate, {
		minDate: 'today',
		dateFormat: 'd M y',
	});

	formDateLabel.append(formDate);
	return formDateLabel;
}

function createListsForm(listsArr) {
	const formListsLabel = createLabel('formLists');

	const formLists = document.createElement('select');
	formLists.setAttribute('id', 'formLists');
	formLists.setAttribute('name', 'formLists');
	formLists.className = 'formLists';

	listsArr.forEach((list) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', list);
		optionElement.textContent = list.title;
		formLists.append(optionElement);
	});

	formListsLabel.append(formLists);
	return formListsLabel;
}

function createPriorityForm() {
	const formPriorityLabel = createLabel('formPriority');

	const formPriority = document.createElement('select');
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');
	formPriority.className = 'formPriority';

	const placeholderPriority = document.createElement('option');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.setAttribute('value', '');
	placeholderPriority.setAttribute('selected', true);
	placeholderPriority.setAttribute('disabled', true);
	placeholderPriority.setAttribute('hidden', true);
	placeholderPriority.textContent = 'Priority';
	formPriority.append(placeholderPriority);

	const priorityOptions = ['High', 'Medium', 'Low'];

	priorityOptions.forEach((option) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', option);
		optionElement.textContent = option;
		formPriority.append(optionElement);
	});

	formPriorityLabel.append(formPriority);
	return formPriorityLabel;
}

function createSubmitButton(form, callback) {
	const submitButton = document.createElement('button');
	submitButton.className = 'submitButton';
	submitButton.setAttribute('type', 'submit');
	submitButton.textContent = 'Add!';

	return submitButton;
}

function createLabel(name) {
	const label = document.createElement('label');
	label.className = name;
	label.setAttribute('for', name);

	return label;
}

function handleSubmit(callback, formDiv) {
	const title = formDiv.elements['formTitle'].value;
	const notes = formDiv.elements['formNotes'].value;
	const dueDate = formDiv.elements['formDate'].value;
	const priority = formDiv.elements['formPriority'].value;

	const newTodo = createTodo(title, notes, dueDate, priority);
	
	callback(newTodo);
	formDiv.remove();
}

function handleEnterKey(event, div, callback) {
	if (event.code === 'Enter') {
		handleSubmit(callback, div);
		div.removeEventListener('keydown', handleEnterKey);
	}
}

function handleEscapeKey(event, div) {
	if (event.code === 'Escape') {
		div.remove();
		div.removeEventListener('keydown', handleEscapeKey);
	}
}