import { masterController } from '../../../masterController';

export default function controlSidebar() {
	(() => {
		const addListButton = document.getElementById('addListButton');
		console.log(addListButton);
		addListButton.addEventListener('click', () => {
			const newList = masterController.newList();
		});

		const sidebarButtons = document.getElementsByClassName('sidebarButton');

		console.log(sidebarButtons);
		for (let button of sidebarButtons) {
			if (button.id === 'addListButton') return;
			button.addEventListener('click', () => {
				console.log(button.id);
				masterController.showList(button.id);
			});
		}
	})();
}

// Sidebar

// #addListButton
//
export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}
