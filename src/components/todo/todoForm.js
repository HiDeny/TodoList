import createTodo from './createTodo';

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function todoForm(callback) {
	const newTodoForm = document.createElement('form');
	newTodoForm.setAttribute('id', 'todoForm');
	newTodoForm.setAttribute('method', 'post');
	newTodoForm.setAttribute('target', '_self');
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
	formTitleLabel.className = 'fromTitle';
	formTitleLabel.setAttribute('for', 'fromTitle');

	const formTitle = document.createElement('input');
	formTitle.setAttribute('required', true);
	formTitle.focus();
	formTitle.setAttribute('id', 'formTitle');
	formTitle.setAttribute('name', 'formTitle');
	formTitle.setAttribute('type', 'text');
	formTitle.setAttribute('placeholder', 'Title...');

	formTitleLabel.append(formTitle);
	newTodoForm.append(formTitleLabel);

	// Description
	const formDescLabel = document.createElement('label');
	formDescLabel.className = 'fromDesc';
	formDescLabel.setAttribute('for', 'formDesc');

	const formDesc = document.createElement('textarea');
	formDesc.setAttribute('id', 'formDesc');
	formDesc.setAttribute('name', 'formDesc');
	formDesc.setAttribute('placeholder', 'Description...');

	formDescLabel.append(formDesc);
	newTodoForm.append(formDescLabel);

	// Due Date
	const formDateLabel = document.createElement('label');
	formDateLabel.className = 'fromDate';
	formDateLabel.setAttribute('for', 'fromDate');
	formDateLabel.textContent = 'Due Date:';

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
	formListOptionsLabel.className = 'fromLists';
	formListOptionsLabel.setAttribute('for', 'fromLists');
	formListOptionsLabel.textContent = 'List:';

	// Priority
	const formPriorityLabel = document.createElement('label');
	formPriorityLabel.className = 'fromPriority';
	formPriorityLabel.setAttribute('for', 'fromPriority');
	formPriorityLabel.textContent = 'Priority:';

	const formPriority = document.createElement('select');
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');

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
        div.removeEventListener('keydown', handleEnterKey)
	}
}

function handleEscapeKey(div) {
	if (event.code === 'Escape') {
		div.remove();
		div.removeEventListener('keydown', handleEscapeKey);
	}
}

function handleSubmit(callback, formDiv) {
	const title = formDiv.elements['formTitle'].value;
	const description = formDiv.elements['formDesc'].value;
	const dueDate = formDiv.elements['formDate'].value;
	const priority = formDiv.elements['formPriority'].value;

	const newTodo = createTodo(title, description, dueDate, priority);

	callback(newTodo);
	formDiv.remove();
}
