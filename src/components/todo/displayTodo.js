import { format, isThisYear, isToday, isTomorrow } from 'date-fns';

import { createTodoEditMode } from './updateTodo.js';

import { removeTodoList, changeSubList } from '../list/updateList';

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

	const removeButton = createRemoveButton(todoCard, todo);
	todoCard.append(removeButton);

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

function createRemoveButton(todoCard, todo) {
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
	dueDate.textContent = todo.dueDate ? selectDateName(todo.dueDate) : '';

	return dueDate;
}

function selectDateName(dueDate) {
	const dateToCheck = new Date(dueDate);
	console.log(dateToCheck);
	console.log(dueDate);

	if (isToday(dateToCheck)) return 'Today';
	if (isTomorrow(dateToCheck)) return 'Tomorrow';

	const formattedDate = format(dateToCheck, 'dd MMM');
	if (isThisYear(dateToCheck)) return formattedDate;

	return dueDate;
}

function visualizePriority(todo, todoCard) {
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
		none: '',
	};
	todoCard.classList.remove('high', 'medium', 'low');
	const priorityClass = priorityClassMap[todo.priority];
	if (priorityClass && priorityClass !== '') {
		todoCard.classList.add(priorityClass);
	}
}

function handleCheckboxClick(todo) {
	changeSubList(todo);
}

function handleCancelButton(todo) {
	removeTodoList(todo);
}

function removeFlatpickrDiv() {
	const flatpickrDiv = document.querySelector('.flatpickr-calendar');
	if (!flatpickrDiv) return;
	flatpickrDiv.remove();
}

export { displayTodoCard, visualizePriority };
