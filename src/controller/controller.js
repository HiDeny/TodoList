import createForm from '../components/todo/interface/displayForm';
import { addTodo } from '../components/list/updateList';

export default function generalController() {
	const addTodoBtn = document.querySelector('.addTodoBtn');
	addTodoBtn.addEventListener('click', requestForm);
}

function requestForm() {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');

	if (!activeForm) {
		const newTaskForm = createForm();
		container.appendChild(newTaskForm);
		const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
		titleInput.focus();
	}

	// function formReturn(newTodo) {
	// 	addTodo(newTodo);
	// }
}
