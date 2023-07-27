import { masterController } from '../masterController';

import createListElement from '../components/list/interface/listElement';

import displaySidebar from '../components/sidebar/displaySidebar';
import { toggleSidebar } from '../components/sidebar/controlSidebar';

export default function controlPage(addTodoBtn, menuButton, container) {
	addTodoBtn.onclick = masterController.createTodo;
	menuButton.onclick = toggleSidebar;

	container.append(displaySidebar());
	container.append(createListElement(masterController.inbox));
	masterController.showList(0);
}
