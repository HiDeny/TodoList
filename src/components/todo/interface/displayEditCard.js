import {
	createListSelector as listSelector,
	createPrioritySelector as prioritySelector,
	visualizePriority,
} from './helperFunctions.js';

import controlEditCard from '../controller/controlEditCard.js';

export default function displayEditCard(todo) {
	const todoCardEdit = createTodoCardEdit(todo);
	todoCardEdit.classList.add(`card${todo.id}`);

	const cancelButton = createCancelButton();
	todoCardEdit.append(cancelButton);

	const checkBox = createCheckBox();
	if (todo.done) {
		checkBox.setAttribute('checked', true);
		todoCardEdit.classList.add('done');
	}
	todoCardEdit.append(checkBox);

	const editTitle = createTitle(todo);
	todoCardEdit.append(editTitle);

	const editNotes = createNotes(todo);
	todoCardEdit.append(editNotes);

	const editDate = createDueDate(todo);
	todoCardEdit.append(editDate);

	const editList = createListSelector(todo);
	todoCardEdit.append(editList);

	const editPriority = createPrioritySelector(todo);
	todoCardEdit.append(editPriority);

	setTimeout(() => {
		controlEditCard(
			todo,
			todoCardEdit,
			editTitle,
			editNotes,
			editDate,
			editList,
			editPriority
		);
	}, 50);

	return todoCardEdit;
}

function createTodoCardEdit(todo) {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'editCard';

	visualizePriority(todoCardEdit, todo.priority);

	return todoCardEdit;
}

function createCancelButton() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	// cancelButton.textContent = 'x';

	return cancelButton;
}

function createCheckBox() {
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheckEdit';

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

	return editDate;
}

function createListSelector(todo) {
	const editList = listSelector(Number(todo.listId));
	editList.className = 'todoListEdit';

	return editList;
}

function createPrioritySelector(todo) {
	const editPriority = prioritySelector(todo.priority);
	editPriority.className = 'todoPriorityEdit';

	return editPriority;
}
