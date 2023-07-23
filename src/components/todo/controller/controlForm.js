export default function controlForm(todoForm, callBack) {
	const handleMouseClick = (event) => {
		const target = event.target;
		const insideContainer = todoForm.contains(target);

		if (!insideContainer || target.className === 'deleteTodoEdit') {
			removeForm();
		}
	};

	const handleKeyDown = (event) => {
		if (event.code === 'Enter' && !event.shiftKey) handleSubmit();
		if (event.code === 'Escape') removeForm();
	};

	function handleSubmit() {
		const title = todoForm.elements['formTitle'].value;
		const notes = todoForm.elements['formNotes'].value;
		const dueDate = todoForm.elements['formDate'].value;
		const priority = todoForm.elements['formPriority'].value;
		const listId = Number(todoForm.elements['formList'].value);

		callBack({ title, notes, dueDate, priority, listId });

		removeForm();
	}

	function removeForm() {
		document.removeEventListener('click', handleMouseClick);
		document.removeEventListener('keydown', handleKeyDown);
		todoForm.remove();
	}

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);

	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmit();
	});
}
