import { masterListsArr } from '../controller/controlMainPage';
import displaySidebar from '../../sidebar/interface/displaySidebar';

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
	container.append(displaySidebar(masterListsArr));

	// Menu Button
	const menuButton = document.createElement('button');
	menuButton.className = 'hamburger';
	menuButton.textContent = 'MENU';
	// menuButton.addEventListener('click', sidebarComponent.toggleSidebar);

	headerDiv.append(menuButton);

	// Inbox - list
	// const displayInbox = displayList(inbox);
	// container.appendChild(displayInbox);
	// refreshList(inbox);
}
