import { masterController } from '../../../masterController';
import { visualizePriority } from '../interface/helperFunctions';

export default function controlEditCard(todo, todoCardEdit) {
	const oldTodo = { ...todo };

	//* Handle Mouse Event
	const handleMouseClick = (event) => {
		const insideContainer = todoCardEdit.contains(event.target);

		if (!insideContainer) {
			if (oldTodo.listId !== todo.listId || oldTodo.dueDate !== todo.dueDate) {
				masterController.moveTodo(oldTodo, todo);
				removeListeners();
			} else {
				masterController.updateTodo(oldTodo, todo);
				removeListeners();
			}
		}
		if (insideContainer) {
			if (event.target.type === 'checkbox') {
				masterController.completeTodo(todo);
				removeListeners();
			}
			if (event.target.className === 'deleteTodoEdit') {
				masterController.removeTodo(todo);
				removeListeners();
			}
		}
	};

	//* Handle Key Event
	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) {
			masterController.updateTodo(oldTodo, todo);
			removeListeners();
		}

		if (event.code === 'Escape') {
			masterController.updateTodo(todo, todo);
			removeListeners();
		}
	};

	//! Add Listeners
	(() => {
		// Title
		const title = document.querySelector('.todoTitleEdit');
		title.addEventListener('input', (event) => {
			todo.title = event.target.value;
		});

		// Notes
		const notes = document.querySelector('.todoNotesEdit');
		notes.addEventListener('input', (event) => {
			todo.notes = event.target.value;
		});

		// Date
		const dueDate = document.querySelector('.todoDueDateEdit');
		dueDate.addEventListener('input', (event) => {
			todo.dueDate = event.target.value;
		});

		// List
		const list = document.querySelector('.todoListEdit');
		list.addEventListener('input', (event) => {
			todo.listId = event.target.value;
		});

		// Priority
		const priority = document.querySelector('.todoPriorityEdit');
		priority.addEventListener('input', (event) => {
			todo.priority = event.target.value;
			visualizePriority(todoCardEdit, todo.priority);
		});
	})();

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);

	// Remove Listeners
	function removeListeners() {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleMouseClick);
	}
}
