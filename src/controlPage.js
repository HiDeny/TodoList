import { masterController } from './masterController';

import { createListElement } from './components/list/list';

import displaySidebar from './components/sidebar/interface/displaySidebar';
import { toggleSidebar } from './components/sidebar/controller/controlSidebar';

export default function controlPage(addTodoBtn, menuButton, container) {
	addTodoBtn.onclick = masterController.createTodo;
	menuButton.onclick = toggleSidebar;

	container.append(displaySidebar());
	container.append(createListElement(masterController.inbox));
}
