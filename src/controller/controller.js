import '../style.css';
import 'normalize.css';

import createList from '../components/list/createList.js';
import displayList from '../components/list/displayList';
import {
	addTodoList,
	removeTodoList,
	moveTodoToDiffList,
	moveFinishedTodo,
	undoFinishedTodo,
} from '../components/list/updateList';

import { updateDone } from '../components/todo/updateTodo';
import { displayTodo, todoForm } from '../components/todo/displayTodo';

export default function generalController() {
	// Title
	const title = document.createElement('h1');
	title.className = 'mainTitle';
	title.textContent = 'TodoList';

	document.body.appendChild(title);

	// Container
	const container = document.createElement('div');
	container.classList.add('container');

	document.body.appendChild(container);

	// Input - Task
	const inputTask = document.createElement('div');
	inputTask.className = 'inputTask';

	// Add button - Task
	const addButton = document.createElement('button');
	addButton.classList.add('addBtn');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const activeForm = document.querySelector('#todoForm');

		if (!activeForm) {
			const newTaskForm = todoForm(formReturn);
			inputTask.appendChild(newTaskForm);
		}
	});

	function formReturn(newTodo) {
		addTodoList(newTodo, inbox);

		CheckArr(inbox);
	}

	function CheckArr(list) {
		const display = displayList(list);
		// console.log(display);
		list.todosArr.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			// console.log(currentTodo.checkBox);
			currentTodo.checkBox.addEventListener('click', () => {
				updateDone(todo);
				moveFinishedTodo(list);
				CheckCompleted(list);
				currentTodo.todoLi.remove();

				console.log(list.todosArr);
				console.log(list.completedTodos);
			});

			display.listUl.appendChild(currentTodo.todoLi);
		});

		const oldUl = document.querySelector('.inboxUl');
		oldUl.replaceWith(display.listUl);
	}

	function CheckCompleted(list) {
		const display = displayList(list);
		console.log(list.completedTodos);
		list.completedTodos.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			console.log(currentTodo);
			currentTodo.todoLi.classList.add('done');
			currentTodo.checkBox.setAttribute('checked', true);
			currentTodo.checkBox.addEventListener('click', () => {
				updateDone(todo);
				undoFinishedTodo(list);
				CheckArr(list);
				currentTodo.todoLi.remove();
			});

			display.listUlCompleted.appendChild(currentTodo.todoLi);
		});

		const oldUlCompleted = document.querySelector('.inboxUlCompleted');
		oldUlCompleted.replaceWith(display.listUlCompleted);
	}

	inputTask.append(addButton);
	container.appendChild(inputTask);

	// Inbox - list
	const inbox = createList('inbox', 'default list');
	const displayInbox = displayList(inbox);
	container.appendChild(displayInbox.completeList);
}
