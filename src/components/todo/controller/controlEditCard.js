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

	//* Handle Mouse Event
	const handleMouseClick = (event) => {
		const target = event.target;
		const insideContainer = editCard.contains(target);

		if (insideContainer) {
			const isCheckbox = target.type === 'checkbox';
			const isDeleteButton = target.className === 'deleteTodoEdit';

			if (!isCheckbox && !isDeleteButton) return;
			if (isCheckbox) {
				if (oldTodo.listId !== todo.listId)
					masterController.moveTodo(oldTodo, todo);
				masterController.completeTodo(todo);
			}

			if (isDeleteButton) masterController.removeTodo(todo);
			removeListeners();
		}
		if (!insideContainer) {
			const sameList = oldTodo.listId === todo.listId;
			// const sameDate = oldTodo.dueDate === todo.dueDate;

			if (!sameList) masterController.moveTodo(oldTodo, todo);
			if (sameList) masterController.updateTodo(todo);
			removeListeners();
		}
	};

	//* Handle Key Event
	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey)
			masterController.updateTodo(todo);

		if (event.code === 'Escape') {
			masterController.updateTodo(todo);
		}
	};

	//! Add Listeners
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
	function removeListeners() {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleMouseClick);
	}
}
