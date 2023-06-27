import createTodo from './createTodo';
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
	checkBox.onclick = () => {};

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

function todoForm() {
	let newTodo;

	const newTodoForm = document.createElement('form');
	newTodoForm.setAttribute('id', 'todoForm');
	newTodoForm.setAttribute('method', 'post');
	newTodoForm.setAttribute('target', '_self');
	newTodoForm.addEventListener('submit', (e) => {
		e.preventDefault();
		const title = newTodoForm.elements['formTitle'].value;
		const description = newTodoForm.elements['formDesc'].value;
		const dueDate = newTodoForm.elements['formDate'].value;
		const priority = newTodoForm.elements['formPriority'].value;

		newTodo = createTodo(title, description, dueDate, priority);
		
		console.log(newTodo);
	});

	// Id
	// input - hidden ?

	// Title
	const formTitleLabel = document.createElement('label');
	formTitleLabel.className = 'fromTitle';
	formTitleLabel.setAttribute('for', 'fromTitle');
	formTitleLabel.textContent = 'Title:';

	const formTitle = document.createElement('input');
	formTitle.setAttribute('required', true);
	formTitle.setAttribute('autofocus', true);
	formTitle.setAttribute('id', 'formTitle');
	formTitle.setAttribute('name', 'formTitle');
	formTitle.setAttribute('type', 'text');
	formTitle.setAttribute('placeholder', 'Title...');

	formTitleLabel.append(formTitle);
	newTodoForm.append(formTitleLabel);

	// Description
	const formDescLabel = document.createElement('label');
	formDescLabel.className = 'fromDesc';
	formDescLabel.setAttribute('for', 'formDesc');
	formDescLabel.textContent = 'Description...';

	const formDesc = document.createElement('textarea');
	formDesc.setAttribute('id', 'formDesc');
	formDesc.setAttribute('name', 'formDesc');
	formDesc.setAttribute('placeholder', 'Description...');

	formDescLabel.append(formDesc);
	newTodoForm.append(formDescLabel);

	// Due Date
	const formDateLabel = document.createElement('label');
	formDateLabel.className = 'fromDate';
	formDateLabel.setAttribute('for', 'fromDate');
	formDateLabel.textContent = 'Due Date:';

	const formDate = document.createElement('input');
	formDate.setAttribute('id', 'formDate');
	formDate.setAttribute('name', 'formDate');
	formDate.setAttribute('type', 'date');

	formDateLabel.append(formDate);
	newTodoForm.append(formDateLabel);

	// List/Project
	// Select / Datalist element, populated with all lists and projects available

	// Priority
	const formPriorityLabel = document.createElement('label');
	formPriorityLabel.className = 'fromPriority';
	formPriorityLabel.setAttribute('for', 'fromTitle');
	formPriorityLabel.textContent = 'Priority:';

	const formPriority = document.createElement('select');
	formPriority.setAttribute('id', 'formPriority');
	formPriority.setAttribute('name', 'formPriority');

	const lowPriority = document.createElement('option');
	lowPriority.setAttribute('value', 'low');
	lowPriority.textContent = 'Low';
	formPriority.append(lowPriority);

	const mediumPriority = document.createElement('option');
	mediumPriority.setAttribute('value', 'medium');
	mediumPriority.textContent = 'Medium';
	formPriority.append(mediumPriority);

	const highPriority = document.createElement('option');
	highPriority.setAttribute('value', 'high');
	highPriority.textContent = 'High';
	formPriority.append(highPriority);

	formPriorityLabel.append(formPriority);
	newTodoForm.append(formPriorityLabel);

	// Submit button
	const confirmBtn = document.createElement('button');
	confirmBtn.className = 'confirmBtn';
	confirmBtn.setAttribute('type', 'submit');
	confirmBtn.textContent = 'Add!';

	newTodoForm.append(confirmBtn);

	return { newTodoForm, newTodo };
}

export { displayTodo, todoForm };
