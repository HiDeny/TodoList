import '../style.css';
import 'normalize.css';

import { inbox, listsArr } from '../components/list/createList.js';
import { displayFreshList, refreshList } from '../components/list/displayList';
import { addTodoList } from '../components/list/updateList';

import todoForm from '../components/todo/todoForm';

import { sidebarMenu } from '../sidebar/sidedar';

export default function generalController() {
	// Header
	const headerDiv = document.createElement('header');
	document.body.append(headerDiv);

	// Title
	const title = document.createElement('h1');
	title.className = 'mainTitle';
	title.textContent = 'TodoList';

	headerDiv.appendChild(title);

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

	function formReturn(newTodo) {
		const list = listsArr.find((list) => list.title === newTodo.list);
		addTodoList(newTodo, list);

		const visibleList = document.querySelector('.list');
		if (visibleList.id === list.title) {
			refreshList(list);
		};
	}

	headerDiv.prepend(addTodoBtn);

	// Menu Button
	const menuButton = document.createElement('button');
	menuButton.className = 'hamburger';
	menuButton.textContent = 'MENU';
	menuButton.addEventListener('click', toggleSidebar);

	headerDiv.append(menuButton);

	// Container
	const container = document.createElement('div');
	container.className = 'container';

	document.body.appendChild(container);

	// Sidebar
	const sidebar = sidebarMenu();
	container.append(sidebar);

	function toggleSidebar() {
		if (sidebar.classList.contains('showSidebar')) {
			sidebar.classList.remove('showSidebar');
		} else {
			sidebar.classList.add('showSidebar');
		}
	}
	//* List stuff

	// Inbox - list
	const displayInbox = displayFreshList(inbox);
	container.appendChild(displayInbox.completeList);
}
