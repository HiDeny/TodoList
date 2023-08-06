import masterController from '../../../controllers/masterController.js';

import displayEditCard from '../interface/displayEditCard.js';

export default function controlCard(todo, todoCard) {
	if (todo.notes) todoCard.classList.add('todoCardExtra');

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
					const checkPrompt = `Do you want to delete ${todo.title}?`;
					const deleteCheck = masterController.deleteCheck(checkPrompt);
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
