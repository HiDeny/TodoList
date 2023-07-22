import { masterController } from '../../../masterController.js';

import displayEditCard from '../interface/displayEditCard.js';

export default function controlCard(todo, todoCard) {
	const handleMouseClick = (event) => {
		const insideContainer = todoCard.contains(event.target);
		const activeEdit = document.querySelector('.editCard');

		if (activeEdit) {
			return;
		} else {
			if (event.target.className === 'deleteTodo') {
				masterController.removeTodo(todo);
				todoCard.removeEventListener('click', handleMouseClick);
			} else if (event.target.type === 'checkbox') {
				masterController.completeTodo(todo);
				todoCard.removeEventListener('click', handleMouseClick);
			} else if (insideContainer) {
				const editCard = displayEditCard(todo);

				todoCard.replaceWith(editCard);
				controlCard(todo, editCard);
				editCard.querySelector('input[class="todoTitleEdit"]').focus();

				todoCard.removeEventListener('click', handleMouseClick);
			}
		}
	};

	// Change to edit form
	todoCard.addEventListener('click', handleMouseClick);
}
