import { visualizePriority } from '../interface/helperFunctions';

export default function controlForm(todoForm, callBack) {
	// Flatpickr
	const fp = flatpickr(formDate, {
		minDate: 'today',
		dateFormat: 'j M Y',
	});
	const flatpickrContainer = document.querySelector('.flatpickr-calendar');

	const handleMouseClick = (event) => {
		const target = event.target;
		const insideContainer = todoForm.contains(target);

		//! Bug - sometimes it still closes when the calendar is loading
		if (flatpickrContainer.contains(target)) return;
		if (!insideContainer || target.className === 'cancelForm') {
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
		fp.destroy();
		todoForm.remove();
	}

	setTimeout(() => {
		document.addEventListener('click', handleMouseClick);
		document.addEventListener('keydown', handleKeyDown);
	}, 10);

	todoForm.elements['formTitle'].focus();
	// Visualize priority on change.
	todoForm.elements['formPriority'].addEventListener('input', (event) => {
		visualizePriority(todoForm, event.target.value);
	});

	todoForm.addEventListener('submit', (event) => {
		event.preventDefault();
		handleSubmit();
	});
}
