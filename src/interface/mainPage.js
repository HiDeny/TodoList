import '../style.css';
import 'normalize.css';

import { sidebar } from '../sidebar/sidebar';
import { inbox } from '../components/list/createList';
import { displayList, refreshList } from '../components/list/displayList';

export default function mainPage() {
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

	// Inbox - list
	const displayInbox = displayList(inbox);
	container.appendChild(displayInbox);
	refreshList(inbox);
}
