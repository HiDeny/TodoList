import { format, isThisYear, isToday, isTomorrow } from 'date-fns';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { updateDone } from './updateTodo';
import {
	replaceOldTodo,
	moveFinishedTodo,
	CheckCompleted,
	undoFinishedTodo,
} from '../list/updateList';

import { refreshList, refreshCompleted } from '../list/displayList';

function displayTodo(todo) {
	const todoLi = document.createElement('li');
	todoLi.setAttribute('id', todo.title);

	const todoCard = document.createElement('div');
	todoCard.setAttribute('tabindex', '0');
	todoCard.className = 'todoCard';

	// Cancel BTN
	const cancelBtn = document.createElement('button');
	cancelBtn.classList = 'deleteTodo';
	cancelBtn.textContent = 'x';
	cancelBtn.addEventListener('click', () => {
		// Remove todo from array
		todoCard.remove();
	});

	todoCard.append(cancelBtn);

	// Done
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheck';
	if (todo.done) {
		checkBox.setAttribute('checked', true);
		todoLi.classList.add('done');
		TODO
	}
	checkBox.addEventListener('click', () => {
		handleCheckboxClick(todo);
		todoLi.remove();
	});

	todoCard.append(checkBox);

	// Title
	const title = document.createElement('p');
	title.textContent = todo.title;
	title.className = 'todoTitle';

	todoCard.append(title);

	// Due Date
	const dueDate = document.createElement('p');
	dueDate.className = 'todoDate';

	const dueDateToCheck = new Date(todo.dueDate);
	console.log(dueDateToCheck);
	console.log(isToday(dueDateToCheck));
	if (isToday(dueDateToCheck)) {
		dueDate.textContent = 'Today';
	} else if (isTomorrow(dueDateToCheck)) {
		dueDate.textContent = 'Tomorrow';
	} else if (isThisYear(dueDateToCheck)) {
		const formattedDate = format(dueDateToCheck, 'dd MMM');
		dueDate.textContent = formattedDate;
	} else {
		dueDate.textContent = todo.dueDate;
	}

	todoCard.append(dueDate);

	// Priority
	if (todo.priority === 'High') {
		todoCard.classList.add('high');
	} else if (todo.priority === 'Medium') {
		todoCard.classList.add('medium');
	} else if (todo.priority === 'Low') {
		todoCard.classList.add('low');
	}

	todoLi.append(todoCard);

	// Change to edit form
	todoCard.addEventListener('click', (event) => {
		console.log(event.target.className);
		if (event.target.className === 'todoCheck') {
			return;
		}
		const todoCardEdit = displayTodoEdit(todo);
		console.log(todoCardEdit);
		todoLi.replaceWith(todoCardEdit);
		todoCardEdit.focus();
	});

	return { todoLi, checkBox, title };
}

function displayTodoEdit(todo) {
	const updatedTodo = todo;

	const todoLi = document.createElement('li');
	todoLi.setAttribute('id', updatedTodo.title);

	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'todoCardEdit';

	// Cancel BTN
	const cancelBtn = document.createElement('button');
	cancelBtn.classList = 'deleteTodoEdit';
	cancelBtn.textContent = 'x';
	cancelBtn.addEventListener('click', () => {
		// Remove todo from array
		todoCardEdit.remove();
	});

	todoCardEdit.append(cancelBtn);

	// Done
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheckEdit';
	if (updatedTodo.done) {
		checkBox.setAttribute('checked', true);
		todoLi.classList.add('done');
	}
	checkBox.addEventListener('click', () => {
		handleCheckboxClick(updatedTodo)
		todoLi.remove();
	});

	todoCardEdit.append(checkBox);

	// Title
	const title = document.createElement('input');
	title.setAttribute('type', 'text');
	title.value = updatedTodo.title;
	title.className = 'todoTitleEdit';
	title.addEventListener('input', (event) => {
		const newTitle = event.target.value;
		updatedTodo.title = newTitle;
	});

	todoCardEdit.append(title);

	// Description
	const desc = document.createElement('textarea');
	desc.className = 'todoDescriptionEdit';
	desc.textContent = updatedTodo.desc;
	desc.setAttribute('placeholder', 'Description...');
	desc.addEventListener('input', (event) => {
		const newDesc = event.target.value;
		updatedTodo.desc = newDesc;
	});

	todoCardEdit.append(desc);

	// Due Date
	const dueDate = document.createElement('input');
	dueDate.className = 'todoDueDateEdit';
	dueDate.setAttribute('type', 'text');
	dueDate.setAttribute('placeholder', 'Date');
	dueDate.value = updatedTodo.dueDate;
	// dueDate.classList.add('flatpickr')
	flatpickr(dueDate, {
		minDate: 'today',
		dateFormat: 'j M Y',
	});
	dueDate.addEventListener('input', (event) => {
		const newDate = event.target.value;
		updatedTodo.dueDate = newDate;
	});

	todoCardEdit.append(dueDate);

	// Priority
	const priority = document.createElement('select');
	priority.className = 'todoPriorityEdit';
	todoCardEdit.append(priority);

	const lowPriority = document.createElement('option');
	lowPriority.setAttribute('value', 'Low');
	lowPriority.textContent = 'Low';
	priority.append(lowPriority);

	const mediumPriority = document.createElement('option');
	mediumPriority.setAttribute('value', 'Medium');
	mediumPriority.textContent = 'Medium';
	priority.append(mediumPriority);

	const highPriority = document.createElement('option');
	highPriority.setAttribute('value', 'High');
	highPriority.textContent = 'High';
	priority.append(highPriority);

	priority.value = updatedTodo.priority;

	priority.addEventListener('input', (event) => {
		const newPriority = event.target.value;
		updatedTodo.priority = newPriority;
	});

	todoLi.append(todoCardEdit);

	// Change back to todo form
	todoCardEdit.addEventListener('blur', () => {
		const todoCard = displayTodo(updatedTodo).todoLi;
		todoLi.replaceWith(todoCard);

		replaceOldTodo(todo, updatedTodo);

		console.log(todoCard);
	});

	// todoCardEdit.focus();

	return todoLi;
}

function handleCheckboxClick(todo) {
	if (todo.done === false) {
		updateDone(todo);
		moveFinishedTodo(todo.list);
		refreshCompleted(todo.list);
	} else if (todo.done === true) {
		updateDone(todo);
		undoFinishedTodo(todo.list);
		refreshList(todo.list);
	}
}

export { displayTodo, displayTodoEdit };
