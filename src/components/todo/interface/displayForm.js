<<<<<<< HEAD:src/components/todo/todoForm.js
import createTodo from './createTodo';
import { ListsArr } from '../list/createList';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function todoForm(callback) {
	const todoForm = createTodoForm();

	const cancelButtonForm = createCancelButtonForm(todoForm);
=======
import {
	createListSelector,
	createPrioritySelector,
	visualizePriority,
} from './helperFunctions';

export default function createNewTodoForm() {
	const todoForm = createTodoFormContainer();

	const cancelButtonForm = createCancelButtonForm();
>>>>>>> memory2:src/components/todo/interface/displayForm.js
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

	visualizePriority(todoForm);

	return todoForm;
}

function createTodoFormContainer() {
	const todoForm = document.createElement('form');
	todoForm.autocomplete = 'off';
	todoForm.setAttribute('id', 'todoForm');
	todoForm.setAttribute('tabindex', '1');

	return todoForm;
}

function createCancelButtonForm() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'cancelForm';

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

	formDateLabel.append(formDate);
	return formDateLabel;
}

function createListsForm() {
	const formListLabel = createLabel('formList');
	const visibleList = document.querySelector('.list');

	const formList = createListSelector(Number(visibleList.id));
	formList.setAttribute('id', 'formList');
	formList.setAttribute('name', 'formList');
	formList.className = 'formList';
	const visibleList = getVisibleId();

<<<<<<< HEAD:src/components/todo/todoForm.js
	ListsArr.forEach((option) => {
		if (option.id < 2) return;
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === Number(visibleList) ? true : false;
		formList.append(optionElement);
	});

=======
>>>>>>> memory2:src/components/todo/interface/displayForm.js
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

	const formPriority = createPrioritySelector();
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');
	formPriority.className = 'formPriority';

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
