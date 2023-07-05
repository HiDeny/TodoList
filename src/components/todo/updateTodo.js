import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { displayTodoCard } from './displayTodo.js';
import {
	replaceOldTodo,
	moveFinishedTodo,
	undoFinishedTodo,
} from '../list/updateList';
import { refreshList, refreshCompleted } from '../list/displayList';

function createTodoEditMode(todo) {
	const updatedTodo = todo;

	const todoLi = document.createElement('li');

	const todoEditCard = createTodoEditCard(updatedTodo, todoLi);
	todoLi.append(todoEditCard);

	todoEditCard.addEventListener('blur', () => {
		todoLi.replaceWith(displayTodoCard(updatedTodo));
		replaceOldTodo(todo, updatedTodo);
	});

	return todoLi;
}

function createTodoEditCard(todo, todoLi) {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'todoCardEdit';

	const cancelButton = createCancelButton(todoCardEdit);
	todoCardEdit.append(cancelButton);

	const checkBox = createCheckBox(todo, todoLi);
	todoCardEdit.append(checkBox);

	const editTitle = createTitle(todo);
	todoCardEdit.append(editTitle);

	const editNotes = createNotes(todo);
	todoCardEdit.append(editNotes);

	const editDate = createDueDate(todo);
	todoCardEdit.append(editDate);

	const editPriority = createPrioritySelector(todo);
	todoCardEdit.append(editPriority);

    return todoCardEdit;
}

function createCancelButton(todoEditCard) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		todoEditCard.remove();
	});

	return cancelButton;
}

function createCheckBox(todo, todoLi) {
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheckEdit';
	if (todo.done) {
		checkBox.setAttribute('checked', true);
		todoLi.classList.add('done');
	}
	checkBox.addEventListener('click', () => {
		handleCheckboxClick(todo);
		todoLi.remove();
	});

	return checkBox;
}

function createTitle(todo) {
	const editTitle = document.createElement('input');
	editTitle.className = 'todoTitleEdit';
	editTitle.setAttribute('type', 'text');
	editTitle.setAttribute('placeholder', 'New Task ...');
	editTitle.value = todo.title;
	editTitle.addEventListener('input', (event) => {
		todo.title = event.target.value;
	});

	return editTitle;
}

function createNotes(todo) {
	// Notes
	const editNotes = document.createElement('textarea');
	editNotes.className = 'todoNotesEdit';
	editNotes.textContent = todo.notes;
	editNotes.setAttribute('placeholder', 'Notes');
	editNotes.addEventListener('input', (event) => {
		todo.notes = event.target.value;
	});

	return editNotes;
}

function createDueDate(todo) {
	const editDate = document.createElement('input');
	editDate.className = 'todoDueDateEdit';
	editDate.setAttribute('type', 'text');
	editDate.setAttribute('placeholder', 'Date');
	editDate.value = todo.dueDate;
	flatpickr(editDate, {
		minDate: 'today',
		dateFormat: 'j M Y',
	});
	editDate.addEventListener('input', (event) => {
		todo.dueDate = event.target.value;
	});

	return editDate;
}

function createPrioritySelector(todo) {
	const editPriority = document.createElement('select');
	editPriority.className = 'todoPriorityEdit';

	const priorityOptions = [
		{ value: 'Low', text: 'Low' },
		{ value: 'Medium', text: 'Medium' },
		{ value: 'High', text: 'High' },
	];

	priorityOptions.forEach((option) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', option.value);
		optionElement.textContent = option.text;
		editPriority.append(optionElement);
	});

	editPriority.value = todo.priority;

	editPriority.addEventListener('input', (event) => {
		todo.priority = event.target.value;
	});

    return editPriority;
}

function handleCheckboxClick(todo) {
	if (todo.done === false) {
		todo.done = true;
		moveFinishedTodo(todo.list);
		refreshCompleted(todo.list);
	} else if (todo.done === true) {
		todo.done = false;
		undoFinishedTodo(todo.list);
		refreshList(todo.list);
	}
}

export { createTodoEditMode };
