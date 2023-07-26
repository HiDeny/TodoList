import controlPage from './controlPage';

export default function mainPage() {
	// Header
	const headerDiv = document.createElement('header');
	document.body.append(headerDiv);

	// Add Todo Btn
	const addTodoBtn = document.createElement('button');
	addTodoBtn.className = 'addTodoBtn';
	addTodoBtn.textContent = '+';
	headerDiv.prepend(addTodoBtn);

	// Menu Button
	const menuButton = document.createElement('button');
	menuButton.className = 'hamburger';
	menuButton.textContent = 'MENU';
	headerDiv.append(menuButton);

	// Container
	const container = document.createElement('div');
	container.className = 'container';
	document.body.appendChild(container);

	controlPage(addTodoBtn, menuButton, container);
}
