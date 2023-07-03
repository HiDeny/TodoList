import '../style.css';
import 'normalize.css';

import { createList } from '../components/list/createList.js';
import { displayFreshList, refreshList } from '../components/list/displayList';
import {
	addTodoList,
	removeTodoList,
	moveTodoToDiffList,
	moveFinishedTodo,
	undoFinishedTodo,
} from '../components/list/updateList';

import { updateDone } from '../components/todo/updateTodo';
import todoForm from '../components/todo/todoForm';
import { displayTodo, displayTodoEdit } from '../components/todo/displayTodo';

export default function generalController() {
	// Title
	const title = document.createElement('h1');
	title.className = 'mainTitle';
	title.textContent = 'TodoList';

	document.body.appendChild(title);

	// Container
	const container = document.createElement('div');
	container.className = 'container';

	document.body.appendChild(container);

	// Add Todo Btn
	const addTodoBtn = document.createElement('button');
	addTodoBtn.classList.add('addTodoBtn');
	addTodoBtn.textContent = '+';
	addTodoBtn.addEventListener('click', () => {
		const activeForm = document.querySelector('#todoForm');

		if (!activeForm) {
			const newTaskForm = todoForm(formReturn);
			container.appendChild(newTaskForm);
		}
	});

	document.body.appendChild(addTodoBtn);

	function formReturn(newTodo) {
		addTodoList(newTodo, inbox);
		console.log(newTodo);
		refreshList(inbox);
	}

	//* List stuff

	// Inbox - list
	const inbox = createList('inbox', 'default list');
	const displayInbox = displayFreshList(inbox);
	container.appendChild(displayInbox.completeList);

	// function CheckArr(list) {
	// 	const display = displayFreshList(list).listUl;
	// 	list.todosArr.forEach((todo) => {
	// 		todo.list = list;
	// 		// todo.listIndex = list.todosArr.indexOf(todo);
	// 		console.log(list.todosArr.indexOf(todo));
	// 		console.log(todo.list);
	// 		console.log(todo.listIndex);
	// 		const currentTodo = displayTodo(todo);
	// 		currentTodo.checkBox.addEventListener('click', () => {
	// 			// updateDone(todo);
	// 			// moveFinishedTodo(list);
	// 			console.log('test1');
	// 			CheckCompleted(list);
	// 			// currentTodo.todoLi.remove();
	// 		});

	// 		display.appendChild(currentTodo.todoLi);
	// 	});

	// 	const oldUl = document.querySelector('.inboxUl');
	// 	oldUl.replaceWith(display);
	// }

	// function CheckCompleted(list) {
	// 	const display = displayFreshList(list);
	// 	list.completedTodos.forEach((todo) => {
	// 		console.log('test2');
	// 		const currentTodo = displayTodo(todo);
	// 		currentTodo.todoLi.classList.add('done');
	// 		currentTodo.checkBox.setAttribute('checked', true);
	// 		currentTodo.checkBox.addEventListener('click', () => {
	// 			// updateDone(todo);
	// 			// undoFinishedTodo(list);
	// 			CheckArr(list);
	// 			console.log('test3');
	// 			// currentTodo.todoLi.remove();
	// 		});

	// 		display.listUlCompleted.appendChild(currentTodo.todoLi);
	// 	});

	// 	const oldUlCompleted = document.querySelector('.inboxUlCompleted');
	// 	oldUlCompleted.replaceWith(display.listUlCompleted);
	// }
}
