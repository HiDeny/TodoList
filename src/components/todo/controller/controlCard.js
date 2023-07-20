import createTodoEditCard from './displayEditCard.js';

import { addTodo, removeTodo } from '../../list/updateList.js';

export default function controlCard(todo, todoCard) {
	const handleMouseClick = (event) => {
		const insideContainer = todoCard.contains(event.target);
		const activeEdit = document.querySelector('.todoCardEdit');

		if (activeEdit) {
			return;
		} else {
			if (event.target.className === 'deleteTodo') {
				removeTodo(todo);
				// Update todo
				todoCard.removeEventListener('click', handleMouseClick);
			} else if (event.target.type === 'checkbox') {
				const updatedTodo = { ...todo };
				updatedTodo.toggleDone;
				// Remove list control
				addTodo(updatedTodo);
				removeTodo(todo);
				//
				todoCard.removeEventListener('click', handleMouseClick);
			} else if (insideContainer) {
				const todoCardEdit = createTodoEditCard(todo);
				todoCard.replaceWith(todoCardEdit);
				todoCardEdit.querySelector('input[class="todoTitleEdit"]').focus();
				todoCard.removeEventListener('click', handleMouseClick);
			}
		}
	};

	// Change to edit form
	todoCard.addEventListener('click', handleMouseClick);
}
