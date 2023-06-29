import format from 'date-fns/format';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

export default function displayTodo(todo) {
	const todoLi = document.createElement('li');
	todoLi.setAttribute('id', todo.title);



	const todoCard = document.createElement('div');
	todoCard.className = 'todoCard';

	// Cancel BTN
	const cancelBtn = document.createElement('button');
	cancelBtn.classList = 'deleteTodo';
    cancelBtn.textContent = 'x';
    cancelBtn.addEventListener('click', () => {
		// Remove todo from array
		todoCard.remove()
	});
    
    todoCard.append(cancelBtn);

	// Done
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheck';

	todoCard.append(checkBox);

	// Title
	const title = document.createElement('input');
	title.setAttribute('type', 'text');
	title.setAttribute('value', todo.title);
	title.className = 'todoTitle';
	title.addEventListener('input', (event) => {
		const newTitle = event.target.value;
		todo.title = newTitle;
	});

	todoCard.append(title);

	// Description
	const desc = document.createElement('textarea');
	desc.className = 'todoDescription';
	desc.textContent = todo.desc;
	desc.setAttribute('placeholder', 'Description...')
	desc.addEventListener('input', (event) => {
		const newDesc = event.target.value;
		todo.desc = newDesc;
	});

	todoCard.append(desc);

	// Due Date
	const dueDate = document.createElement('input');
	dueDate.setAttribute('type', 'text');
	dueDate.setAttribute('placeholder', 'Date');
	dueDate.setAttribute('value', todo.dueDate);
	dueDate.classList.add('flatpickr')
	dueDate.classList.add('todoDueDate')
	flatpickr(dueDate, {
		minDate: 'today',
		dateFormat: 'j M',
	});
	dueDate.addEventListener('input', (event) => {
		const newDate = event.target.value;
		console.log(newDate);
		todo.dueDate = newDate;
		
	});

	todoCard.append(dueDate);

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



