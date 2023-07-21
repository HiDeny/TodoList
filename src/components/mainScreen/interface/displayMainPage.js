import controlMainPage from '../controller/controlMainPage';

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

	// List
	const mainList = document.createElement('div');
	mainList.className = 'list';

	container.append(mainList);

	// Sidebar
	const sidebar = document.createElement('div');
	sidebar.className = 'sidebar';

	container.append(sidebar);

	setTimeout(() => {
		controlMainPage();
	}, 50);
}
