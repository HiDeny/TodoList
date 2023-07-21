export default function controlSidebar() {
	(() => {
		const sidebarButtons = document.getElementsByClassName('.sidebarButton');

		sidebarButtons.forEach((button) => {
			button.addEventListener('click', () => {
				sideButtonHandleClick(list);
			});
		});
	})();
}

// Sidebar

// sidebarButton

// #addListButton
addListButton.addEventListener('click', () => {
	addCustomList();
});
