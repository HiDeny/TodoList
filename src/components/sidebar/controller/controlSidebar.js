export function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}

// export function controlSideListButton(button) {
// 	button.onclick = () => masterController.showList(button.id);
// }

// export function controlAddListButton(button) {
// 	addListButton.onclick = () => masterController.addList();
// }
