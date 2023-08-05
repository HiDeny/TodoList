import { masterController } from '../../../masterController';
import { visualizePriority } from '../interface/helperFunctions';

export default function controlEditCard(
	todo,
	editCard,
	title,
	notes,
	dueDate,
	list,
	priority
) {
	const oldTodo = { ...todo };

	// Flatpickr
	const fp = flatpickr(dueDate, {
		minDate: 'today',
		dateFormat: 'j M Y',
	});
	const flatpickrContainer = document.querySelector('.flatpickr-calendar');

	//* Handle Mouse Event
	const handleMouseClick = (event) => {
		const target = event.target;
		const insideContainer = editCard.contains(target);
		console.log(target);

		if (insideContainer) {
			const isCheckbox = target.type === 'checkbox';
			const isDeleteButton = target.className === 'deleteTodoEdit';

			if (!isCheckbox && !isDeleteButton) return;

			if (isCheckbox) {
				const oldList = oldTodo.listId;
				const currentList = todo.listId;

				//! Bug - sometimes it still closes when the calendar is loading
				if (oldList !== currentList) masterController.moveTodo(oldTodo, todo);
				masterController.completeTodo(todo);
				removeCard();
			}

			if (isDeleteButton) {
				const checkPrompt = `Do you want to delete ${todo.title}?`;
				const deleteCheck = masterController.deleteCheck(checkPrompt);
				if (!deleteCheck) return;
				masterController.removeTodo(oldTodo);
				removeCard();
			}
		}
		if (!insideContainer) {
			const sameList = oldTodo.listId === todo.listId;
			const sameDate = oldTodo.dueDate === todo.dueDate;

			if (flatpickrContainer.contains(target)) return;
			if (!sameList || !sameDate) masterController.moveTodo(oldTodo, todo);
			if (sameList && sameDate) masterController.saveTodo(todo);
			removeCard();
		}
	};

	//* Handle Key Event
	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) {
			masterController.saveTodo(todo);
			removeCard();
		}

		if (event.code === 'Escape') {
			masterController.saveTodo(todo);
			removeCard();
		}
	};

	//* Add Listeners
	// Title
	title.addEventListener('input', (event) => {
		todo.title = event.target.value;
	});

	// Notes
	notes.addEventListener('input', (event) => {
		todo.notes = event.target.value;
	});

	// Date
	dueDate.addEventListener('input', (event) => {
		todo.dueDate = event.target.value;
		todo.dateListId = null;
	});

	// List
	list.addEventListener('input', (event) => {
		todo.listId = Number(event.target.value);
	});

	// Priority
	priority.addEventListener('input', (event) => {
		todo.priority = event.target.value;
		visualizePriority(editCard, todo.priority);
	});

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);

	// Remove Listeners
	function removeCard() {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleMouseClick);
		fp.destroy();
		editCard.remove();
	}
}
