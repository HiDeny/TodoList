import '../style.css';
import 'normalize.css';

import { inbox } from '../components/list/createList.js';
import { displayFreshList } from '../components/list/displayList';
import {
	setList,
	findCorrectList,
	processDueDate,
} from '../components/list/updateList';

import todoForm from '../components/todo/todoForm';

import { sidebar } from '../sidebar/sidebar.js';

export default function generalController() {
	// Header
	const headerDiv = document.createElement('header');
	document.body.append(headerDiv);

	// Container
	const container = document.createElement('div');
	container.className = 'container';

	document.body.appendChild(container);

	// Add Todo Btn
	const addTodoBtn = document.createElement('button');
	addTodoBtn.className = 'addTodoBtn';
	addTodoBtn.textContent = '+';
	addTodoBtn.setAttribute('tabindex', '0');
	addTodoBtn.addEventListener('click', () => {
		const activeForm = document.querySelector('#todoForm');

		if (!activeForm) {
			const newTaskForm = todoForm(formReturn);
			container.appendChild(newTaskForm);
			const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
			titleInput.focus();
		}
	});

	function formReturn(newTodo) {
		const dateList = processDueDate(newTodo);
		if (dateList) dateList.push(newTodo);

		setList(newTodo);
	}

	headerDiv.prepend(addTodoBtn);

	// Sidebar
	const sidebarComponent = sidebar();
	container.append(sidebarComponent.sidebarDiv);

	// Menu Button
	const menuButton = document.createElement('button');
	menuButton.className = 'hamburger';
	menuButton.textContent = 'MENU';
	menuButton.addEventListener('click', sidebarComponent.toggleSidebar);

	headerDiv.append(menuButton);

	//* List stuff

	// Inbox - list
	const displayInbox = displayFreshList(inbox);
	container.appendChild(displayInbox);
}
