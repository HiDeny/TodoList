import { format, isThisYear, isToday, isTomorrow } from 'date-fns';

import { createTodoEditMode } from './updateTodo.js';

import { listsArr } from '../list/createList.js';
import { refreshList, refreshCompleted } from '../list/displayList';
import {
	findCorrectList,
	moveFinishedTodo,
	undoFinishedTodo,
	removeTodoList,
} from '../list/updateList';

function displayTodoCard(todo) {
	const todoLi = document.createElement('li');

	const todoCard = createTodoCard(todo, todoLi);
	todoLi.append(todoCard);

	// Change to edit form
	todoCard.addEventListener('click', (event) => {
		if (
			event.target.className === 'todoCheck' ||
			event.target.className === 'deleteTodo'
		) {
			return;
		}
		const todoCardEdit = createTodoEditMode(todo);
		todoLi.replaceWith(todoCardEdit);
		todoCardEdit.focus();
	});

	removeFlatpickrDiv();
	return todoLi;
}

function createTodoCard(todo, todoLi) {
	const todoCard = createCard();

	const cancelButton = createCancelButton(todoCard, todo);
	todoCard.append(cancelButton);

	const checkBox = createCheckBox(todo, todoLi);
	todoCard.append(checkBox);

	const title = createTitle(todo);
	todoCard.append(title);

	const dueDate = createDueDate(todo);
	todoCard.append(dueDate);

	visualizePriority(todo, todoCard);

	return todoCard;
}

function createCard() {
	const todoCard = document.createElement('div');
	todoCard.setAttribute('tabindex', '0');
	todoCard.className = 'todoCard';

	return todoCard;
}

function createCancelButton(todoCard, todo) {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodo';
	cancelButton.textContent = 'x';
	cancelButton.addEventListener('click', () => {
		handleCancelButton(todo);
		todoCard.remove();
	});

	return cancelButton;
}

function createCheckBox(todo, todoLi) {
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheck';
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
	const title = document.createElement('p');
	title.textContent = todo.title ? todo.title : 'New Task ...';
	title.className = 'todoTitle';

	return title;
}

function createDueDate(todo) {
	const dueDate = document.createElement('p');
	dueDate.className = 'todoDate';

	const dateToCheck = new Date(todo.dueDate);
	if (isToday(dateToCheck)) {
		dueDate.textContent = 'Today';
	} else if (isTomorrow(dateToCheck)) {
		dueDate.textContent = 'Tomorrow';
	} else if (isThisYear(dateToCheck)) {
		const formattedDate = format(dateToCheck, 'dd MMM');
		dueDate.textContent = formattedDate;
	} else {
		dueDate.textContent = todo.dueDate;
	}

	return dueDate;
}

function visualizePriority(todo, todoCard) {
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
	};

	const priorityClass = priorityClassMap[todo.priority];
	if (priorityClass) {
		todoCard.classList.add(priorityClass);
	}
}

function handleCheckboxClick(todo) {
	const list = findCorrectList(todo);
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

function removeFlatpickrDiv() {
	const flatpickrDiv = document.querySelector('.flatpickr-calendar');
	if (!flatpickrDiv) return;
	flatpickrDiv.remove();
}

export { displayTodoCard };
