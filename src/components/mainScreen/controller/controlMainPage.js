import {
	sidebarDisplay,
	toggleSidebar,
	inboxDisplay,
	requestForm,
} from '../../../masterController';

export default function controlMainPage() {
	const addTodoBtn = document.querySelector('.addTodoBtn');
	addTodoBtn.addEventListener('click', requestForm);

	const menuButton = document.querySelector('.hamburger');
	menuButton.addEventListener('click', toggleSidebar);

	const mainList = document.querySelector('.list');
	mainList.replaceWith(inboxDisplay);

	const sidebar = document.querySelector('.sidebar');
	sidebar.replaceWith(sidebarDisplay);
}
