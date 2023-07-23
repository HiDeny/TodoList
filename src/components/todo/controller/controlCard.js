import { masterController } from '../../../masterController.js';

import displayEditCard from '../interface/displayEditCard.js';
import controlEditCard from './controlEditCard.js';

export default function controlCard(todo, todoCard) {
	const todoCardClick = (event) => {
		const target = event.target;
		const insideContainer = todoCard.contains(target);
		const activeEdit = document.querySelector('.editCard');

		if (activeEdit) return;
		if (insideContainer) {
			if (target.className !== 'deleteTodo' || target.type !== 'checkbox') {
				const editCard = displayEditCard(todo);
				todoCard.replaceWith(editCard);
				editCard.querySelector('input[class="todoTitleEdit"]').focus();
			}
			if (target.className === 'deleteTodo') masterController.removeTodo(todo);
			if (target.type === 'checkbox') masterController.completeTodo(todo);
		}
	};

	// Change to edit form
	todoCard.addEventListener('click', todoCardClick);
}
