import '../style.css';
import 'normalize.css';

import createList from '../components/list/createList.js';
import displayList from '../components/list/displayList';
import { addTodoList, removeTodoList } from '../components/list/updateList';

import createTodo from '../components/todo/createTodo';
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
		const newTodo = createTodo(taskTitleInput.value);
        clearListUl(displayInbox);
		addTodoList(newTodo, inbox);
        refreshList(inbox, displayInbox);

		taskTitleInput.value = '';
	});

	inputTask.append(addButton);
	container.appendChild(inputTask);

	// Inbox - list
	const inbox = createList('Inbox', 'default list');
	const displayInbox = displayList(inbox);
    container.appendChild(displayInbox.listDiv);

	const checkBtn = document.createElement('button');
	checkBtn.textContent = 'Check!';
	checkBtn.onclick = () => checkDoneTodos(inbox, completedTodos);

    const clearListUl = (listDisplay) => {
        listDisplay.listUl = '';
    }

    const refreshList = (list, listDisplay) => {
        list.todosArr.forEach((todo) => listDisplay.listUl.appendChild(displayTodo(todo)));
        // displayActiveList.listDiv.appendChild(displayInbox.listDiv);
    }

    refreshList(inbox, displayInbox);
	

	const checkDoneTodos = (list, completedList) => {
		list.todosArr.forEach((todo) => {
			if (todo.done == true) {
				addTodoList(removeTodoList(todo, list), inbox);
			}
		});
	};

	container.appendChild(checkBtn);

	// Completed - list
	const completedTodos = createList('Completed', 'completed todos');
	const displayCompletedTodos = displayList(completedTodos);

	container.appendChild(displayCompletedTodos.listDiv);
}
