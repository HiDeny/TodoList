import { updateDone } from './updateTodo';

function displayTodo(todo) {
	const todoLi = document.createElement('li');
	todoLi.setAttribute('id', todo.title);

	const todoCard = document.createElement('div');
	todoCard.className = 'todoCard';

	// Done
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheck';
	checkBox.onclick = () => {

	};

	todoCard.append(checkBox);

	// Title
	const title = document.createElement('p');
	title.className = 'todoTitle';
	title.textContent = todo.title;
	todoCard.append(title);

	// Description
	if (todo.desc) {
		const desc = document.createElement('p');
		desc.className = 'todoDescription';
		desc.textContent = todo.desc;
		todoCard.append(desc);
	}

	// Due Date
	if (todo.dueDate) {
		const dueDate = document.createElement('p');
		dueDate.className = 'todoDueDate';
		dueDate.textContent = todo.dueDate;
		todoCard.append(dueDate);
	}

	// Priority
	if (todo.priority) {
		const priority = document.createElement('p');
		priority.className = 'todoPriority';
		priority.textContent = todo.priority;
		todoCard.append(priority);
	}

	todoLi.append(todoCard);
	return { todoLi, checkBox, title };
}

function removeDisplayTodo(todo) {
	const todoToRemove = document.querySelector(`#${todo.title}`);
	todoToRemove.remove();
}

export { displayTodo, removeDisplayTodo };
