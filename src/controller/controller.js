import '../style.css';
import 'normalize.css';

import { createList } from '../components/list/createList.js';
import { displayFreshList, refreshList } from '../components/list/displayList';
import { addTodoList } from '../components/list/updateList';

import todoForm from '../components/todo/todoForm';

export default function generalController() {

	// Title
	const title = document.createElement('h1');
	title.className = 'mainTitle';
	title.textContent = 'TodoList';

	document.body.appendChild(title);

	// Container
	const container = document.createElement('div');
	container.className = 'container';

	document.body.appendChild(container);

	// Add Todo Btn
	const addTodoBtn = document.createElement('button');
	addTodoBtn.classList.add('addTodoBtn');
	addTodoBtn.setAttribute('tabindex', '0');
	addTodoBtn.textContent = '+';
	addTodoBtn.addEventListener('click', () => {
		const activeForm = document.querySelector('#todoForm');

		if (!activeForm) {
			const newTaskForm = todoForm(formReturn);
			container.appendChild(newTaskForm);
			const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
			titleInput.focus();
		}
	});

	document.body.appendChild(addTodoBtn);

	function formReturn(newTodo) {
		addTodoList(newTodo, inbox);
		refreshList(inbox);
	}

	//* List stuff

	// Inbox - list
	const inbox = createList('inbox', 'default list');
	const displayInbox = displayFreshList(inbox);
	container.appendChild(displayInbox.completeList);
}
