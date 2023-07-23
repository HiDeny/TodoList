import {
	createListSelector,
	createPrioritySelector,
	visualizePriority,
} from './helperFunctions';

export default function createNewTodoForm() {
	const todoForm = createTodoFormContainer();

	const cancelButtonForm = createCancelButtonForm();
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
	todoForm.setAttribute('id', 'todoForm');
	todoForm.setAttribute('tabindex', '1');

	return todoForm;
}

function createCancelButtonForm() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'cancelForm';
	cancelButton.textContent = 'x';

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

	const formList = createListSelector();
	formList.setAttribute('id', 'formList');
	formList.setAttribute('name', 'formList');
	formList.className = 'formList';

	formListLabel.append(formList);
	return formListLabel;
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
