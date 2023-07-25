import createNewTodoForm from './interface/displayForm';
import controlForm from './controller/controlForm';

export default function createTodoForm(handleFormReturn) {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');
	if (activeForm) return;

	const newTaskForm = createNewTodoForm();
	container.appendChild(newTaskForm);

	controlForm(newTaskForm, handleFormReturn);
}
