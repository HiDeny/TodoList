import '../style.css';
import 'normalize.css';

import createList from '../components/list/createList.js';
import displayList from '../components/list/displayList';
import {
	addTodoList,
	removeTodoList,
	moveTodoToDiffList,
} from '../components/list/updateList';

import createTodo from '../components/todo/createTodo';
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
		const newTask = todoForm(updateList);
		inputTask.appendChild(newTask);

		console.log(newTask);
	});

	function updateList (newTodo) {
		const oldList = document.querySelector('.InboxUl');

		addTodoList(newTodo, inbox);

		oldList.replaceWith(createListUl(inbox));
	}

	

	const createListUl = (list) => {
		const display = displayList(list);
		list.todosArr.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			currentTodo.checkBox.addEventListener('click', () => {

				updateDone(todo);
				moveTodoToDiffList(todo, list, completedTodos);
				currentTodo.todoLi.style.display = 'none';

				const oldList = document.querySelector('.CompletedUl');
				oldList.replaceWith(createCompletedUl());
			});
			display.listUl.appendChild(currentTodo.todoLi);
		});

		return display.listUl;
	};

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
	const inbox = createList('Inbox', 'default list');
	const displayInbox = displayList(inbox);
	container.appendChild(displayInbox.listDiv);

	createListUl(inbox, displayInbox);

	// Completed - list
	const completedTodos = createList('Completed', 'completed todos');
	const displayCompletedTodos = displayList(completedTodos);

	createListUl(completedTodos, displayCompletedTodos);

	container.appendChild(displayCompletedTodos.listDiv);

}
