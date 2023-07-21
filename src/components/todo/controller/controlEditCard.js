// import { addTodo, removeTodo, replaceOldTodo } from '../../list/updateList';

export default function controlEditCard(todo, todoCardEdit) {
	const originalTodo = { ...todo };
	const editedTodo = { ...todo };

	// Handle events
	const handleMouseClick = (event) => {
		const insideContainer = todoCardEdit.contains(event.target);

		if (!insideContainer) {
			if (
				todo.listId === editedTodo.listId &&
				todo.dueDate === editedTodo.dueDate
			) {
				// replaceOldTodo(todo, editedTodo);
				removeListeners();
			} else {
				// addTodo(editedTodo);
				// removeTodo(todo);
				removeListeners();
			}
		}
		if (insideContainer) {
			if (event.target.type === 'checkbox') {
				editedTodo.toggleDone;
				// Remove list control
				// addTodo(editedTodo);
				// removeTodo(todo);
				//
				removeListeners();
			}
			if (event.target.className === 'deleteTodoEdit') {
				// Remove list control
				// removeTodo(todo);
				removeListeners();
			}
		}
	};

	function removeListeners() {
		document.removeEventListener('keydown', handleKeyDown);
		document.removeEventListener('click', handleMouseClick);
	}

	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) {
			removeTodo(todo);
			addTodo(editedTodo);
			removeListeners();
		}

		if (event.code === 'Escape') {
			removeTodo(todo);
			addTodo(originalTodo);
			removeListeners();
		}
	};

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);

	(() => {
		const title = document.querySelector('.todoTitleEdit');

		title.addEventListener('input', (event) => {
			editedTodo.title = event.target.value;
		});
	})();
	notesEventListener(editedTodo);
	dueDateEventListener(editedTodo);
	listEventListener(editedTodo);
	priorityEventListener(editedTodo);
}

const notesEventListener = (editedTodo) => {
	const notes = document.querySelector('.todoNotesEdit');

	const handleNotesInput = (event) => {
		const newNotes = event.target.value;
		editedTodo.notes = newNotes;
	};

	notes.addEventListener('input', handleNotesInput);
};

const dueDateEventListener = (editedTodo) => {
	const dueDate = document.querySelector('.todoDueDateEdit');

	const handleDateInput = (event) => {
		const newDate = event.target.value;
		editedTodo.dueDate = newDate;
	};

	dueDate.addEventListener('input', handleDateInput);
};

const listEventListener = (editedTodo) => {
	const list = document.querySelector('.todoListEdit');

	const handleListIdInput = (event) => {
		const newListId = event.target.value;
		editedTodo.listId = newListId;
	};

	list.addEventListener('input', handleListIdInput);
};

const priorityEventListener = (editedTodo) => {
	const priority = document.querySelector('.todoPriorityEdit');

	const handlePriorityInput = (event) => {
		const newPriority = event.target.value;
		editedTodo.priority = newPriority;
	};

	priority.addEventListener('input', handlePriorityInput);
};
