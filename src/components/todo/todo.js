import createNewTodoForm from './interface/displayForm';
import controlForm from './controller/controlForm';

import displayCard from './interface/displayCard';
import controlCard from './controller/controlCard';

export function createTodoForm(handleFormReturn) {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');
	if (activeForm) return;

	const newTaskForm = createNewTodoForm();
	container.appendChild(newTaskForm);

	controlForm(newTaskForm, handleFormReturn);
}

export function createTodoCard(todo) {
	const newCard = displayCard(todo);
	controlCard(todo, newCard);

	return newCard;
}
