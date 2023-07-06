import { format, isThisYear, isToday, isTomorrow } from 'date-fns';

import { createTodoEditMode } from './updateTodo.js';

import { refreshList, refreshCompleted } from '../list/displayList';
import { moveFinishedTodo, undoFinishedTodo, removeTodoList } from '../list/updateList';

function displayTodoCard(todo) {
	const todoLi = document.createElement('li');

	const todoCard = createTodoCard(todo, todoLi);
	todoLi.append(todoCard);

	// Change to edit form
	todoCard.addEventListener('click', (event) => {
		console.log(event.target);
		if (event.target.className === 'todoCheck' || event.target.className === 'deleteTodo') {
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

	checkPriority(todo, todoCard);

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
		console.log(todo.list);
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

function checkPriority(todo, todoCard) {
	if (todo.priority === 'High') {
		todoCard.classList.add('high');
	} else if (todo.priority === 'Medium') {
		todoCard.classList.add('medium');
	} else if (todo.priority === 'Low') {
		todoCard.classList.add('low');
	}
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

function handleCancelButton(todo) {
	if (todo.done === false) {
		removeTodoList(todo, todo.list.todosArr);
		refreshCompleted(todo.list);
	} else if (todo.done === true) {
		removeTodoList(todo, todo.list.completedTodos);
		refreshCompleted(todo.list);
	}
}

function removeFlatpickrDiv() {
	const flatpickrDiv = document.querySelector('.flatpickr-calendar');
	if(!flatpickrDiv) return;
	flatpickrDiv.remove();
}

export { displayTodoCard };
