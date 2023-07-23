import { masterController } from '../../../masterController';

export function controlSideBarButtons() {
	(() => {
		const addListButton = document.getElementById('addListButton');
		(() => {
			addListButton.addEventListener('click', createNewList);
		})();

		const sidebarButtons = document.getElementsByClassName('sidebarButton');

		for (let button of sidebarButtons) {
			if (button.id === 'addListButton') return;
			button.addEventListener('click', () => {
				masterController.showList(button.id);
			});
		}
	})();
}

export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}

const createNewList = () => {
	masterController.addList();
	addListButton.removeEventListener('click', createNewList);
};
