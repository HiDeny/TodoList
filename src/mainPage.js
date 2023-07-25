// import controlMainPage from '../controller/controlMainPage';

import {
	masterController,
	sidebarDisplay,
	inboxDisplay,
	populateSidebar,
} from './masterController';

import { toggleSidebar } from './components/sidebar/controller/controlSidebar';

export default function mainPage() {
	// Header
	const headerDiv = document.createElement('header');
	document.body.append(headerDiv);

	// Add Todo Btn
	const addTodoBtn = document.createElement('button');
	addTodoBtn.className = 'addTodoBtn';
	addTodoBtn.textContent = '+';
	addTodoBtn.addEventListener('click', masterController.createTodo);

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

	// List
	container.append(inboxDisplay);

	// Sidebar
	container.append(sidebarDisplay);
	populateSidebar();
}
