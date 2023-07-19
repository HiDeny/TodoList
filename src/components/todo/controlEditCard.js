import { addTodo, removeTodo, replaceOldTodo } from '../list/updateList';
import {
	updateTitleTodo,
	updateNotesTodo,
	updateDateTodo,
	updateListTodo,
	updatePriorityTodo,
} from './updateTodo';

export default function controlEditCard(todo, todoCardEdit) {
	const originalTodo = Object.assign({}, todo);
	const editedTodo = Object.assign({}, todo);

	// Handle events
	const handleMouseClick = (event) => {
		const insideContainer = todoCardEdit.contains(event.target);

		if (!insideContainer) {
			if (
				todo.listId === editedTodo.listId &&
				todo.dueDate === editedTodo.dueDate
			) {
				replaceOldTodo(todo, editedTodo);
				removeListeners();
			} else {
				addTodo(editedTodo);
				removeTodo(todo);
				removeListeners();
			}
		}
		if (insideContainer) {
			if (event.target.type === 'checkbox') {
				editedTodo.done = !originalTodo.done;
				addTodo(editedTodo);
				removeTodo(todo);
				removeListeners();
			}
			if (event.target.className === 'deleteTodoEdit') {
				removeTodo(todo);
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

	titleEventListener(editedTodo);
	notesEventListener(editedTodo);
	dueDateEventListener(editedTodo);
	listEventListener(editedTodo);
	priorityEventListener(editedTodo);
}

const titleEventListener = (editedTodo) => {
	const title = document.querySelector('.todoTitleEdit');

	const handleTitleInput = (event) => {
		const newTitle = event.target.value;
		updateTitleTodo(editedTodo, newTitle);
	};

	title.addEventListener('input', handleTitleInput);
};

const notesEventListener = (editedTodo) => {
	const notes = document.querySelector('.todoNotesEdit');

	const handleNotesInput = (event) => {
		const newNotes = event.target.value;
		updateNotesTodo(editedTodo, newNotes);
	};

	notes.addEventListener('input', handleNotesInput);
};

const dueDateEventListener = (editedTodo) => {
	const dueDate = document.querySelector('.todoDueDateEdit');

	const handleDateInput = (event) => {
		const newDate = event.target.value;
		updateDateTodo(editedTodo, newDate);
	};

	dueDate.addEventListener('input', handleDateInput);
};

const listEventListener = (editedTodo) => {
	const list = document.querySelector('.todoListEdit');

	const handleListIdInput = (event) => {
		const newListId = event.target.value;
		updateListTodo(editedTodo, newListId);
	};

	list.addEventListener('input', handleListIdInput);
};

const priorityEventListener = (editedTodo) => {
	const priority = document.querySelector('.todoPriorityEdit');

	const handlePriorityInput = (event) => {
		const newPriority = event.target.value;
		updatePriorityTodo(editedTodo, newPriority);
	};

	priority.addEventListener('input', handlePriorityInput);
};
