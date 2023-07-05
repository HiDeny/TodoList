import { format, isThisYear, isToday, isTomorrow } from 'date-fns';
import { createTodoEditMode } from './updateTodo.js';
import { moveFinishedTodo, undoFinishedTodo } from '../list/updateList';
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
	}
	checkBox.addEventListener('click', () => {
		handleCheckboxClick(todo);
		todoLi.remove();
	});

	todoCard.append(checkBox);

	// Title
	const title = document.createElement('p');
	title.textContent = todo.title ? todo.title : 'New Task ...';
	title.className = 'todoTitle';

	todoCard.append(title);

	// Due Date
	const dueDate = document.createElement('p');
	dueDate.className = 'todoDate';

	const dueDateToCheck = new Date(todo.dueDate);
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
		// console.log(event.target.className);
		if (event.target.className === 'todoCheck') {
			return;
		}
		const todoCardEdit = createTodoEditMode(todo);
		// console.log(todoCardEdit);
		todoLi.replaceWith(todoCardEdit);
		todoCardEdit.focus();
	});

	return { todoLi, checkBox, title };
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

export { displayTodo };
