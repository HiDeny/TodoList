import '../style.css';
import 'normalize.css';

import createList from '../components/list/createList.js';
import displayList from '../components/list/displayList';
import {
	addTodoList,
	removeTodoList,
	moveTodoToDiffList,
	moveFinishedTodo,
} from '../components/list/updateList';

import createTodo from '../components/todo/createTodo';
import { updateDone } from '../components/todo/updateTodo';
import { displayTodo, todoForm } from '../components/todo/displayTodo';
import { check } from 'prettier';

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
			const newTaskForm = todoForm(updateList);
			inputTask.appendChild(newTaskForm);
		}
	});

	function updateList(newTodo) {
		const oldList = document.querySelector('.inboxUl');
		console.log(oldList);

		addTodoList(newTodo, inbox);

		const newList = createListComponent(inbox);
		console.log(newList);
		const test = document.createElement('p');
		test.textContent = 'Shit';
		oldList.replaceWith(newList.listUl);
	}

	const createListComponent = (list) => {
		const display = displayList(list);

		display.listUl = CheckArr(list);
		console.log(display.listUl);

		display.listDivCompleted = CheckCompleted(list);
		// console.log(CheckCompleted(list));

		// console.log(display);
		return display;
	};

	function CheckArr(list) {
		const display = displayList(list);

		list.todosArr.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			currentTodo.checkBox.addEventListener('click', () => {
				updateDone(todo);
				moveFinishedTodo(list);
				currentTodo.todoLi.style.display = 'none';

				// const oldList = document.querySelector(`#${list.title}`);
				// oldList.replaceWith(createListComponent(list));
			});
			// console.log(currentTodo);
			// console.log(currentTodo.todoLi);
			// console.log(display.listUl);

			display.listUl.appendChild(currentTodo.todoLi);
		});


		// console.log(display.listUl);
		return display.listUl;
	}

	function CheckCompleted(list) {
		const display = displayList(list);

		list.completedTodos.forEach((todo) => {
			// console.log('2');
			const currentTodo = displayTodo(todo);
			currentTodo.classList.add('done');
			currentTodo.checkBox.addEventListener('click', () => {
				updateDone(todo);
				moveFinishedTodo(list);
				currentTodo.todoLi.style.display = 'none';

			});

			display.listUlCompleted.appendChild(currentTodo.todoLi);
		});

		return display.listUlCompleted;
	}

	const createCompletedUl = () => {
		const display = displayList(completedTodos);
		completedTodos.todosArr.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			if (todo.done === true) {
				currentTodo.todoLi.classList.add('done');
				currentTodo.checkBox.toggleAttribute('checked');
			}
			display.listUl.appendChild(currentTodo.todoLi);
		});

		return display.listUl;
	};

	inputTask.append(addButton);
	container.appendChild(inputTask);

	// Inbox - list
	const inbox = createList('inbox', 'default list');
	const displayInbox = displayList(inbox);
	container.appendChild(displayInbox.listDiv);

	// createListComponent(inbox, displayInbox);

	// Completed - list
	// const completedTodos = createList('Completed', 'completed todos');
	// const displayCompletedTodos = displayList(completedTodos);

	// createListComponent(completedTodos, displayCompletedTodos);

	// container.appendChild(displayCompletedTodos.listDiv);
}
