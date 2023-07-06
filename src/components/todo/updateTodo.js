import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { displayTodoCard } from './displayTodo.js';
import { refreshList, refreshCompleted } from '../list/displayList';
import {
	replaceOldTodo,
	moveFinishedTodo,
	undoFinishedTodo,
	removeTodoList
} from '../list/updateList';

function createTodoEditMode(todo) {
	const originalTodo = Object.assign({}, todo);
	const editedTodo = Object.assign({}, todo);

	const todoLi = document.createElement('li');

	const todoEditCard = createTodoEditCard(editedTodo, todoLi);
	todoLi.append(todoEditCard);

	todoEditCard.addEventListener('keydown', (event) => {
		handleEnterKey(event, todoLi, editedTodo, todo);
		handleEscapeKey(event, todoLi, originalTodo, todo);
	});

	return todoLi;
}

function createTodoEditCard(todo, todoLi) {
	const todoCardEdit = createTodoCardEdit();

	const cancelButton = createCancelButton(todoCardEdit, todo);
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

function createTodoCardEdit() {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'todoCardEdit';

	return todoCardEdit;
}

function createCancelButton(todoEditCard, todo) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		handleCancelButton(todo);
		console.log(todo.list);
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

	const priorityOptions = ['High', 'Medium', 'Low'];

	priorityOptions.forEach((option) => {
		const optionElement = document.createElement('option');
		optionElement.setAttribute('value', option);
		optionElement.textContent = option;
		editPriority.append(optionElement);
	});

	editPriority.value = todo.priority;

	editPriority.addEventListener('input', (event) => {
		todo.priority = event.target.value;
	});

	return editPriority;
}

function handleCheckboxClick(todo) {
	replaceOldTodo(todo, todo);
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

function handleCancelButton(todo) {
	if (todo.done === false) {
		removeTodoList(todo, todo.list.todosArr);
		refreshCompleted(todo.list);
	} else if (todo.done === true) {
		removeTodoList(todo, todo.list.completedTodos);
		refreshCompleted(todo.list);
	}
}

function handleEnterKey(event, todoLi, editedTodo, todo) {
	if (event.code === 'Enter' && !event.shiftKey) {
		todoLi.replaceWith(displayTodoCard(editedTodo));
		replaceOldTodo(todo, editedTodo);
		
	}
}

function handleEscapeKey(event, todoLi, originalTodo, todo) {
	if (event.code === 'Escape') {
		console.log(originalTodo === todo);
		todoLi.replaceWith(displayTodoCard(originalTodo));
		replaceOldTodo(todo, originalTodo);
	}
}

export { createTodoEditMode };

// function handleMouseLeave(event, todoLi, editedTodo, todo) {
// 	todoLi.replaceWith(displayTodoCard(editedTodo));
// 	replaceOldTodo(todo, editedTodo);
// }
