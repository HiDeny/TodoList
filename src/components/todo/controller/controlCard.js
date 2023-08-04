import { masterController } from '../../../masterController.js';

import displayEditCard from '../interface/displayEditCard.js';

export default function controlCard(todo, todoCard) {
	if (todo.notes) todoCard.classList.add('todoCardExtra');
	console.log(todo.notes);

	const todoCardClick = (event) => {
		const target = event.target;
		const insideContainer = todoCard.contains(target);
		const activeEdit = document.querySelector('.editCard');

		if (activeEdit) return;
		if (insideContainer) {
			if (target.className !== 'deleteTodo' && target.type !== 'checkbox') {
				const editCard = displayEditCard(todo);
				todoCard.replaceWith(editCard);
			}

			if (target.type === 'checkbox') masterController.completeTodo(todo);
			if (target.className === 'deleteTodo') {
				if (todo.title !== '' || todo.notes !== '') {
					const deleteCheck = masterController.deleteCheck(todo.title);
					if (!deleteCheck) return;
				}
				masterController.removeTodo(todo);
				todoCard.remove();
			}
		}
	};

	// Change to edit form
	todoCard.addEventListener('click', todoCardClick);
}
