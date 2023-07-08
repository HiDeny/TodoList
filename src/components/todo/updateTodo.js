import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { displayTodoCard } from './displayTodo.js';
import { listsArr } from '../list/createList.js';
import { refreshList, refreshCompleted } from '../list/displayList';
import {
	replaceOldTodo,
	moveFinishedTodo,
	undoFinishedTodo,
	removeTodoList,
	findCorrectList,
	moveTodoToDiffList,
} from '../list/updateList';

function createTodoEditMode(todo) {
	const originalTodo = Object.assign({}, todo);
	const editedTodo = Object.assign({}, todo);

	const todoLi = document.createElement('li');

	const todoEditCard = createTodoEditCard(editedTodo, todoLi);
	todoLi.append(todoEditCard);

	visualizePriority(todo, todoEditCard);

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

function createCancelButton(todoEditCard, todo) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		handleCancelButton(todo);
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

function createListSelector(todo) {
	const editList = document.createElement('select');
	editList.className = 'todoListEdit';

	listsArr.forEach((list) => {
		const optionElement = document.createElement('option');
		optionElement.value = list.id;
		optionElement.textContent = list.title;
		optionElement.selected = list.id === todo.listId ? true : false;
		editList.append(optionElement);
	});

	editList.addEventListener('input', (event) => {
		if (todo.listId === event.target.value) return;

		const orgList = findCorrectList(todo);
		todo.listId = Number(event.target.value);
		const newList = findCorrectList(todo);

		if (!todo.done) {
			const list = orgList.todosArr;
			const nList = newList.todosArr;
			moveTodoToDiffList(todo, list, nList);
			refreshList(orgList);
		} else {
			const nList = newList.completedTodos;
			moveTodoToDiffList(todo, list, nList);
			refreshCompleted(orgList);
		}
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
	];

	priorityOptions.forEach((option) => {
		const optionElement = new Option(option.text, option.value);
		editPriority.append(optionElement);
	});

	editPriority.value = todo.priority;

	editPriority.addEventListener('input', (event) => {
		todo.priority = event.target.value;
		visualizePriority(todo, todoCardEdit);
	});

	return editPriority;
}

function visualizePriority(todo, todoCard) {
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
	};

	todoCard.classList.remove('high', 'medium', 'low');
	const priorityClass = priorityClassMap[todo.priority];
	if (priorityClass) {
		todoCard.classList.add(priorityClass);
	}
}

function handleCheckboxClick(todo) {
	const list = findCorrectList(todo);
	replaceOldTodo(todo, todo);
	if (todo.done === false) {
		todo.done = true;
		moveFinishedTodo(list);
		refreshCompleted(list);
	} else if (todo.done === true) {
		todo.done = false;
		undoFinishedTodo(list);
		refreshList(list);
	}
}

function handleCancelButton(todo) {
	const list = findCorrectList(todo);
	if (todo.done === false) {
		removeTodoList(todo, list.todosArr);
		refreshCompleted(list);
	} else if (todo.done === true) {
		removeTodoList(todo, list.completedTodos);
		refreshCompleted(list);
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
		todoLi.replaceWith(displayTodoCard(originalTodo));
		replaceOldTodo(todo, originalTodo);
	}
}

export { createTodoEditMode };

// function handleMouseLeave(event, todoLi, editedTodo, todo) {
// 	todoLi.replaceWith(displayTodoCard(editedTodo));
// 	replaceOldTodo(todo, editedTodo);
// }
