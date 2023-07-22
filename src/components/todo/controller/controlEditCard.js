import masterController from '../../../masterController';

export default function controlEditCard(todo, todoCardEdit) {
	const updatedTodo = { ...todo };

	//* Handle Mouse Event
	const handleMouseClick = (event) => {
		const insideContainer = todoCardEdit.contains(event.target);

		if (!insideContainer) {
			if (
				todo.listId !== updatedTodo.listId ||
				todo.dueDate !== updatedTodo.dueDate
			) {
				masterController.moveTodo(todo, updatedTodo);
				removeListeners();
			} else {
				masterController.updatedTodo(todo, updatedTodo);
				removeListeners();
			}
		}
		if (insideContainer) {
			if (event.target.type === 'checkbox') {
				updatedTodo.toggleDone;
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
			masterController.updatedTodo(todo, updatedTodo);
			removeListeners();
		}

		if (event.code === 'Escape') {
			masterController.updatedTodo(todo, todo);
			removeListeners();
		}
	};

	//! Add Listeners
	(() => {
		// Title
		const title = document.querySelector('.todoTitleEdit');
		title.addEventListener('input', (event) => {
			updatedTodo.title = event.target.value;
		});

		// Notes
		const notes = document.querySelector('.todoNotesEdit');
		notes.addEventListener('input', (event) => {
			updatedTodo.notes = event.target.value;
		});

		// Date
		const dueDate = document.querySelector('.todoDueDateEdit');
		dueDate.addEventListener('input', (event) => {
			updatedTodo.dueDate = event.target.value;
		});

		// List
		const list = document.querySelector('.todoListEdit');
		list.addEventListener('input', (event) => {
			updatedTodo.listId = event.target.value;
		});

		// Priority
		const priority = document.querySelector('.todoPriorityEdit');
		priority.addEventListener('input', (event) => {
			updatedTodo.priority = event.target.value;
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

// notesEventListener(updatedTodo);
// dueDateEventListener(updatedTodo);
// listEventListener(updatedTodo);
// priorityEventListener(updatedTodo);

// const notesEventListener = (updatedTodo) => {
// 	const notes = document.querySelector('.todoNotesEdit');

// 	const handleNotesInput = (event) => {
// 		const newNotes = event.target.value;
// 		updatedTodo.notes = newNotes;
// 	};

// 	notes.addEventListener('input', handleNotesInput);
// };

// const dueDateEventListener = (updatedTodo) => {
// 	const dueDate = document.querySelector('.todoDueDateEdit');

// 	const handleDateInput = (event) => {
// 		const newDate = event.target.value;
// 		updatedTodo.dueDate = newDate;
// 	};

// 	dueDate.addEventListener('input', handleDateInput);
// };

// const listEventListener = (updatedTodo) => {
// 	const list = document.querySelector('.todoListEdit');

// 	const handleListIdInput = (event) => {
// 		const newListId = event.target.value;
// 		updatedTodo.listId = newListId;
// 	};

// 	list.addEventListener('input', handleListIdInput);
// };

// const priorityEventListener = (updatedTodo) => {
// 	const priority = document.querySelector('.todoPriorityEdit');

// 	const handlePriorityInput = (event) => {
// 		const newPriority = event.target.value;
// 		updatedTodo.priority = newPriority;
// 	};

// 	priority.addEventListener('input', handlePriorityInput);
// };
