import { masterController } from '../../../masterController';

export function controlSideBarButtons() {
	const sidebarButtons = document.getElementsByClassName('sidebarButton');

	for (let button of sidebarButtons) {
		button.addEventListener('click', () => {
			if (button.id === 'addListButton') masterController.addList();
			if (button.id !== 'addListButton') masterController.showList(button.id);
		});
	}
}

export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}
