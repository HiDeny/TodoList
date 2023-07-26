import { isFuture, isToday } from 'date-fns';

import { setupDefaultLists } from './firstRun.js';
import allListsController from './components/list/controller/controlAllLists.js';
import createScreenController from './screenController.js';

import { createTodoForm, createTodo } from './components/todo/todo.js';

import createList from './components/list/createList.js';

//* Master List
export const masterController = createMasterController();

function createMasterController() {
	const screenControl = createScreenController();
	const listsControl = allListsController();
	setupDefaultLists(listsControl);

	const inbox = listsControl.defaultLists[0];
	const today = listsControl.defaultLists[1];
	const upcoming = listsControl.defaultLists[2];

	return {
		screenControl,
		listsControl,
		// Defaults
		get inbox() {
			return inbox;
		},
		get today() {
			return today;
		},
		get upcoming() {
			return upcoming;
		},

		//* Todos
		createTodo() {
			createTodoForm(handleFormReturn);
		},
		addTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			if (dateList) {
				dateList.addTodo(todo);
				todo.dateListId = Number(dateList.id);
				screenControl.refreshSubList(dateList);
			}

			list.addTodo(todo);
			screenControl.refreshSubList(list);
		},
		removeTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			if (dateList) dateList.removeTodo(todo);
			list.removeTodo(todo);
		},
		completeTodo(todo) {
			this.removeTodo(todo);
			todo.toggleDone();
			this.addTodo(todo);
		},
		saveTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);
			// Refresh
			screenControl.refreshSubList(list);
			if (dateList) screenControl.refreshSubList(dateList);
		},
		moveTodo(oldTodo, todo) {
			this.removeTodo(oldTodo);
			this.addTodo(todo);
		},
		//* Lists
		addList() {
			const newList = createList();
			listsControl.addList(newList);

			screenControl.replaceCurrentList(newList);
			screenControl.refreshSideBar();
		},
		deleteList(list) {
			const listTitle = list.title.toUpperCase();
			const check = confirm(`Do you want to delete ${listTitle}?`);

			if (!check) return;

			clearSubList(list.activeTodos);
			clearSubList(list.completedTodos);
			listsControl.deleteList(list);

			screenControl.refreshSideBar();
			screenControl.replaceCurrentList(inbox);
		},
		saveList(list) {
			screenControl.updateSideList(list);
		},
		showList(id) {
			const list = listsControl.getList(id);
			screenControl.replaceCurrentList(list);
		},
	};
}

//* Form
function handleFormReturn({ title, notes, dueDate, priority, listId }) {
	const newTodo = createTodo(title, notes, dueDate, priority);
	newTodo.listId = Number(listId);

	masterController.addTodo(newTodo);
}

//* List
function clearSubList(subList) {
	while (subList.length > 0) masterController.removeTodo(subList[0]);
}

//* Date List
function findDateList(dueDate) {
	const dateToCheck = new Date(dueDate);
	if (isToday(dateToCheck)) return masterController.today;
	if (isFuture(dateToCheck)) return masterController.upcoming;
}

//* Memory
