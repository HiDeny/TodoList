
import { visualizePriority } from '../interface/helperFunctions';

export default function controlForm(todoForm, formReturn) {
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
		const title = todoForm.elements['formTitle'].value;
		const notes = todoForm.elements['formNotes'].value;
		const dueDate = todoForm.elements['formDate'].value;
		const priority = todoForm.elements['formPriority'].value;
		const listId = Number(todoForm.elements['formList'].value);

		removeListeners();
		todoForm.remove();

		formReturn({ title, notes, dueDate, priority, listId });
	}

	function removeListeners() {
		document.removeEventListener('click', handleMouseClick);
		document.removeEventListener('keydown', handleKeyDown);
	}

	document.addEventListener('click', handleMouseClick);
	document.addEventListener('keydown', handleKeyDown);
	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmit();
	});

	(() => {
		const formPriority = document.querySelector('.formPriority');
		formPriority.addEventListener('input', (event) => {
			visualizePriority(todoForm, event.target.value);
		});
	})();
}
