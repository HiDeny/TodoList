import controlPage from './controlPage';

export default function mainPage() {
	// Header
	const headerDiv = document.createElement('header');
	document.body.append(headerDiv);

	// Menu Button
	const menuButton = document.createElement('button');
	menuButton.className = 'hamburger';
	menuButton.textContent = 'MENU';
	headerDiv.append(menuButton);

	// Add Todo Btn 
	const addTodoBtn = document.createElement('button');
	addTodoBtn.className = 'addTodoBtn';
	addTodoBtn.textContent = '+';
	headerDiv.append(addTodoBtn);

	// Container
	const container = document.createElement('div');
	container.className = 'container';
	document.body.appendChild(container);

	// List
	const listPlaceholder = document.createElement('div');
	listPlaceholder.className = 'list';
	container.append(listPlaceholder);

	// Footer
	const footerDiv = document.createElement('footer');
	document.body.append(footerDiv);

	// Empty Completed
	const emptyCompletedTodos = document.createElement('button');
	emptyCompletedTodos.classList.add('emptyCompletedButton');
	emptyCompletedTodos.textContent = 'Empty Completed';
	footerDiv.append(emptyCompletedTodos);

	controlPage(addTodoBtn, menuButton, container, emptyCompletedTodos);
}
