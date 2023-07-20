import controlEditCard from '../controller/controlEditCard.js';

import { customListsArr } from '../../list/createList.js';
import visualizePriority from './visualizePriority.js';

export default function createTodoEditCard(todo) {
	const todoCardEdit = createTodoCardEdit(todo);

	const cancelButton = createCancelButton();
	todoCardEdit.append(cancelButton);

	const checkBox = createCheckBox(todo, todoLi);
	todoCardEdit.append(checkBox);

	const editTitle = createTitle(todo);
	todoCardEdit.append(editTitle);

	const editNotes = createNotes(todo);
	todoCardEdit.append(editNotes);

	const editDate = createDueDate(todo);
	todoCardEdit.append(editDate);

	const editList = createListSelector(todo);
	todoCardEdit.append(editList);

	const editPriority = createPrioritySelector(todo, todoCardEdit);
	todoCardEdit.append(editPriority);

	setTimeout(() => {
		controlEditCard(todo, todoCardEdit);
	}, 50);

	return todoCardEdit;
}

function createTodoCardEdit(todo) {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'todoCardEdit';

	visualizePriority(todo, todoCardEdit);

	return todoCardEdit;
}

function createCancelButton() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	cancelButton.textContent = 'x';

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

	return checkBox;
}

function createTitle(todo) {
	const editTitle = document.createElement('input');
	editTitle.className = 'todoTitleEdit';
	editTitle.setAttribute('type', 'text');
	editTitle.setAttribute('placeholder', 'New Task ...');
	editTitle.value = todo.title;

	return editTitle;
}

function createNotes(todo) {
	const editNotes = document.createElement('textarea');
	editNotes.className = 'todoNotesEdit';
	editNotes.textContent = todo.notes;
	editNotes.setAttribute('placeholder', 'Notes');

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

	return editDate;
}

function createListSelector(todo) {
	const editList = document.createElement('select');
	editList.className = 'todoListEdit';

	customListsArr.forEach((option) => {
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === todo.listId ? true : false;
		editList.append(optionElement);
	});

	return editList;
}

function createPrioritySelector(todo) {
	const editPriority = document.createElement('select');
	editPriority.className = 'todoPriorityEdit';

	const priorityOptions = [
		{ value: 'high', text: 'High' },
		{ value: 'medium', text: 'Medium' },
		{ value: 'low', text: 'Low' },
		{ value: '', text: 'None' },
	];

	priorityOptions.forEach((option) => {
		const optionElement = new Option(option.text, option.value);
		optionElement.selected = option.value === todo.priority ? true : false;
		editPriority.append(optionElement);
	});

	const placeholderPriority = new Option('Priority', '');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.selected = !todo.priority ? true : false;
	placeholderPriority.disabled = true;
	placeholderPriority.hidden = true;
	editPriority.append(placeholderPriority);

	return editPriority;
}
