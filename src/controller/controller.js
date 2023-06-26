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
import { displayTodo, removeDisplayTodo } from '../components/todo/displayTodo';

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

	const taskTitleInput = document.createElement('input');
	taskTitleInput.setAttribute('id', 'taskTitleInputInput');
	taskTitleInput.setAttribute('type', 'text');
	taskTitleInput.setAttribute('placeholder', 'Title....');

	inputTask.appendChild(taskTitleInput);

	// Add button - Task
	const addButton = document.createElement('button');
	addButton.classList.add('addBtn');
	addButton.textContent = 'Add';
	addButton.addEventListener('click', () => {
		const oldList = document.querySelector('.InboxUl');

		const newTodo = createTodo(taskTitleInput.value);

		addTodoList(newTodo, inbox);

		oldList.replaceWith(createListUl(inbox));

		taskTitleInput.value = '';
	});

	const createListUl = (list) => {
		const display = displayList(list);
		list.todosArr.forEach((todo) => {
			const currentTodo = displayTodo(todo);
			currentTodo.checkBox.addEventListener('click', () => {

				updateDone(todo);
				moveTodoToDiffList(todo, inbox, completedTodos);
				currentTodo.todoLi.style.display = 'none';
				console.log(currentTodo.todoLi);
				console.log(inbox.todosArr);

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
				currentTodo.title.classList.add('done');
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
