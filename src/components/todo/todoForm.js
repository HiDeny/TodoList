import createTodo from './createTodo';
import { customListsArr } from '../list/createList';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function todoForm(callback) {
	const todoForm = createTodoForm();

	//? Id input - hidden ?

	const cancelButtonForm = createCancelButtonForm(todoForm);
	todoForm.append(cancelButtonForm);

	const titleForm = createTitleForm();
	todoForm.append(titleForm);

	const notesForm = createNotesForm();
	todoForm.append(notesForm);

	const dueDateForm = createDateForm();
	todoForm.append(dueDateForm);

	const listsFrom = createListsForm();
	todoForm.append(listsFrom);

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

function createListsForm() {
	const formListLabel = createLabel('formList');

	const formList = document.createElement('select');
	formList.setAttribute('id', 'formList');
	formList.setAttribute('name', 'formList');
	formList.className = 'formList';
	const visibleList = getVisibleId();

	customListsArr.forEach((option) => {
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === Number(visibleList) ? true : false;
		formList.append(optionElement);
	});

	formListLabel.append(formList);
	return formListLabel;
}

function getVisibleId() {
	const visibleId = document.querySelector('.list').id;
	if (visibleId < 2) return 2;
	return visibleId;
}

function createPriorityForm() {
	const formPriorityLabel = createLabel('formPriority');

	const formPriority = document.createElement('select');
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');
	formPriority.className = 'formPriority';

	const placeholderPriority = new Option('Priority', '');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.selected = true;
	placeholderPriority.disabled = true;
	placeholderPriority.hidden = true;
	formPriority.append(placeholderPriority);

	const priorityOptions = [
		{ value: 'high', text: 'High' },
		{ value: 'medium', text: 'Medium' },
		{ value: 'low', text: 'Low' },
		{ value: '', text: 'None' },
	];

	priorityOptions.forEach((option) => {
		const optionElement = new Option(option.text, option.value);
		formPriority.append(optionElement);
	});

	formPriorityLabel.append(formPriority);
	return formPriorityLabel;
}

function createSubmitButton() {
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
	const listId = Number(formDiv.elements['formList'].value);

	const newTodo = createTodo(title, notes, dueDate, priority, listId);

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
