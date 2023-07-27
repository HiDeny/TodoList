import { masterController } from '../masterController';

import displaySidebar from '../components/sidebar/displaySidebar';
import { toggleSidebar } from '../components/sidebar/controlSidebar';

export default function controlPage(addTodoBtn, menuButton, container) {
	addTodoBtn.onclick = masterController.createTodo;
	menuButton.onclick = toggleSidebar;

	container.append(displaySidebar());
	masterController.showList(0);
}
