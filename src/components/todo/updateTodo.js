import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { visualizePriority } from './displayTodo.js';
import { customListsArr } from '../list/createList.js';
import { addTodo, removeTodo, replaceOldTodo } from '../list/updateList';

function createTodoEditMode(todo) {
	const originalTodo = Object.assign({}, todo);
	const editedTodo = Object.assign({}, todo);

	const todoLi = document.createElement('li');

	const todoEditCard = createTodoEditCard(editedTodo, todoLi);
	todoLi.append(todoEditCard);

	visualizePriority(todo, todoEditCard);

	// Handle submits
	const handleMouseClick = (event) => {
		const insideContainer = todoEditCard.contains(event.target);

		if (!insideContainer) {
			if (
				todo.listId === editedTodo.listId &&
				todo.dueDate === editedTodo.dueDate
			) {
				replaceOldTodo(todo, editedTodo);
				removeListeners();
			} else {
				addTodo(editedTodo);
				removeTodo(todo);
				removeListeners();
			}
		}
		if (insideContainer) {
			if (event.target.type === 'checkbox') {
				editedTodo.done = !originalTodo.done;
				addTodo(editedTodo);
				removeTodo(todo);
				removeListeners();
			}
			if (event.target.className === 'deleteTodoEdit') {
				removeTodo(todo);
				removeListeners();
			}
		}
	};

	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) {
			removeTodo(todo);
			addTodo(editedTodo);
			removeListeners();
		}

		if (event.code === 'Escape') {
			removeTodo(todo);
			addTodo(originalTodo);
			removeListeners();
		}
	};

	function removeListeners() {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleMouseClick);
	}
	setTimeout(() => {
		document.addEventListener('click', handleMouseClick);
		document.addEventListener('keydown', handleKeyDown);
	}, 50);

	return todoLi;
}

function createTodoEditCard(todo, todoLi) {
	const todoCardEdit = createTodoCardEdit();

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

	return todoCardEdit;
}

function createTodoCardEdit() {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'todoCardEdit';

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

function createListSelector(todo) {
	const editList = document.createElement('select');
	editList.className = 'todoListEdit';

	customListsArr.forEach((option) => {
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === todo.listId ? true : false;
		editList.append(optionElement);
	});

	editList.addEventListener('input', (event) => {
		todo.listId = Number(event.target.value);
	});

	return editList;
}

function createPrioritySelector(todo, todoCardEdit) {
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

	editPriority.addEventListener('input', (event) => {
		todo.priority = event.target.value;
		visualizePriority(todo, todoCardEdit);
	});

	const placeholderPriority = new Option('Priority', '');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.selected = !todo.priority ? true : false;
	placeholderPriority.disabled = true;
	placeholderPriority.hidden = true;
	editPriority.append(placeholderPriority);

	return editPriority;
}

export { createTodoEditMode };
