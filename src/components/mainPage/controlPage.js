import masterController from '../../controllers/masterController';

import displaySidebar from '../sidebar/displaySidebar';
import { toggleSidebar } from '../sidebar/controlSidebar';

export default function controlPage(addTodoBtn, menuButton, container) {
	addTodoBtn.onclick = masterController.createTodo;
	menuButton.onclick = toggleSidebar;

	container.append(displaySidebar());
	masterController.showList(0);
}
