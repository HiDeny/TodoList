import todoForm from '../components/todo/todoForm';

export default function generalController() {
	const addTodoBtn = document.querySelector('.addTodoBtn');
	addTodoBtn.addEventListener('click', requestForm);
}

function requestForm() {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');

	if (!activeForm) {
		const newTaskForm = todoForm();
		container.appendChild(newTaskForm);
		const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
		titleInput.focus();
	}
}
