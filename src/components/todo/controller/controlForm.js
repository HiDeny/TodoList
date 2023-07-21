import createTodo from "../todo";

export default function controlForm(todoForm) {
	const handleMouseClick = (event) => {
		const insideContainer = todoForm.contains(event.target);

		if (!insideContainer) {
			removeListeners();
			todoForm.remove();
		}
		if (insideContainer) {
			if (event.target.className === 'deleteTodoEdit') {
				removeListeners();
				todoForm.remove();
			}
		}
	};

	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) {
			handleSubmit();
		}

		if (event.code === 'Escape') {
			removeListeners();
			todoForm.remove();
		}
	};

	function handleSubmit() {
		const newTodo = createTodo();
		newTodo.title = todoForm.elements['formTitle'].value;
		newTodo.notes = todoForm.elements['formNotes'].value;
		newTodo.dueDate = todoForm.elements['formDate'].value;
		newTodo.priority = todoForm.elements['formPriority'].value;
		newTodo.listId = Number(todoForm.elements['formList'].value);
		console.log(newTodo.listId);

		removeListeners();
		todoForm.remove();
        console.log(newTodo);
		return newTodo;
	}

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);
	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmit();
	});

	function removeListeners() {
		document.removeEventListener('click', handleMouseClick);
		document.removeEventListener('keydown', handleKeyDown);
	}
}
