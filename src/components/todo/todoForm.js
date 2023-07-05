import createTodo from './createTodo';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function todoForm(callback) {
	const newTodoForm = document.createElement('form');
	newTodoForm.setAttribute('id', 'todoForm');
	newTodoForm.setAttribute('tabindex', '1');
	newTodoForm.setAttribute('method', 'post');
	newTodoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		handleSubmit(callback, newTodoForm);
	});

	// Id
	// input - hidden ?
	// Cancel btn
	const cancelBtn = document.createElement('button');
	cancelBtn.classList = 'cancelForm';
	cancelBtn.textContent = 'x';
	cancelBtn.addEventListener('click', () => {
		newTodoForm.remove();
	});

	newTodoForm.addEventListener('keydown', () => {
		handleEscapeKey(newTodoForm);
		handleEnterKey(callback, newTodoForm);
	});

	newTodoForm.append(cancelBtn);

	// Title
	const formTitleLabel = document.createElement('label');
	formTitleLabel.className = 'formTitle';
	formTitleLabel.setAttribute('for', 'formTitle');

	const formTitle = document.createElement('input');
	formTitle.setAttribute('required', true);
	formTitle.setAttribute('id', 'formTitle');
	formTitle.setAttribute('name', 'formTitle');
	formTitle.setAttribute('type', 'text');
	formTitle.setAttribute('placeholder', 'Title...');

	formTitleLabel.append(formTitle);
	newTodoForm.append(formTitleLabel);

	// Notes
	const formNotesLabel = document.createElement('label');
	formNotesLabel.className = 'formNotes';
	formNotesLabel.setAttribute('for', 'formNotes');

	const formNotes = document.createElement('textarea');
	formNotes.setAttribute('id', 'formNotes');
	formNotes.setAttribute('name', 'formNotes');
	formNotes.setAttribute('placeholder', 'Notes');

	formNotesLabel.append(formNotes);
	newTodoForm.append(formNotesLabel);

	// Due Date
	const formDateLabel = document.createElement('label');
	formDateLabel.className = 'formDate';
	formDateLabel.setAttribute('for', 'formDate');
	// formDateLabel.textContent = 'Due Date:';

	const formDate = document.createElement('input');
	formDate.setAttribute('id', 'formDate');
	formDate.setAttribute('name', 'formDate');
	formDate.setAttribute('type', 'text');
	formDate.setAttribute('placeholder', 'Date');

	formDateLabel.append(formDate);
	newTodoForm.append(formDateLabel);

	flatpickr(formDate, {
		minDate: 'today',
		dateFormat: 'd M y',
	});
	// List/Project
	// Select / Datalist element, populated with all lists and projects available
	const formListOptionsLabel = document.createElement('label');
	formListOptionsLabel.className = 'formLists';
	formListOptionsLabel.setAttribute('for', 'formLists');
	formListOptionsLabel.textContent = 'List:';

	// Priority
	const formPriorityLabel = document.createElement('label');
	formPriorityLabel.className = 'formPriority';
	formPriorityLabel.setAttribute('for', 'formPriority');

	const formPriority = document.createElement('select');
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');

	const placeholderPriority = document.createElement('option');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.setAttribute('value', '');
	placeholderPriority.setAttribute('selected', true);
	placeholderPriority.setAttribute('disabled', true);
	placeholderPriority.setAttribute('hidden', true);
	placeholderPriority.textContent = 'Priority';
	formPriority.append(placeholderPriority);

	const lowPriority = document.createElement('option');
	lowPriority.setAttribute('value', 'Low');
	lowPriority.textContent = 'Low';
	formPriority.append(lowPriority);

	const mediumPriority = document.createElement('option');
	mediumPriority.setAttribute('value', 'Medium');
	mediumPriority.textContent = 'Medium';
	formPriority.append(mediumPriority);

	const highPriority = document.createElement('option');
	highPriority.setAttribute('value', 'High');
	highPriority.textContent = 'High';
	formPriority.append(highPriority);

	formPriorityLabel.append(formPriority);
	newTodoForm.append(formPriorityLabel);

	// Submit button
	const confirmBtn = document.createElement('button');
	confirmBtn.className = 'confirmBtn';
	confirmBtn.setAttribute('type', 'submit');
	confirmBtn.textContent = 'Add!';

	newTodoForm.append(confirmBtn);

	return newTodoForm;
}

function handleEnterKey(callback, div) {
	if (event.code === 'Enter') {
		handleSubmit(callback, div);
		div.removeEventListener('keydown', handleEnterKey);
	}
}

function handleEscapeKey(div) {
	if (event.code === 'Escape') {
		div.remove();
		div.removeEventListener('keydown', handleEscapeKey);
	}
}

function handleSubmit(callback, formDiv) {
	// const title = formDiv.elements['formTitle'].value ? formDiv.elements['formTitle'].value : 'New Task...';
	const title = formDiv.elements['formTitle'].value;
	const notes = formDiv.elements['formNotes'].value;
	const dueDate = formDiv.elements['formDate'].value;
	const priority = formDiv.elements['formPriority'].value;

	const newTodo = createTodo(title, notes, dueDate, priority);

	callback(newTodo);
	formDiv.remove();
}
