import { isFuture, isToday } from 'date-fns';

import createListsController from '../components/list/controller/controlAllLists.js';
import createScreenController from './screenController.js';
import createStorageController from '../components/memory/storage.js';

import { createTodoForm, createTodo } from '../components/todo/todo.js';

//* Master List
const masterController = (() => {
	const screenControl = createScreenController();
	const listsControl = createListsController();
	const storageControl = createStorageController(listsControl);

	const inbox = listsControl.defaultLists[0];
	storageControl.uploadList(inbox);

	const today = listsControl.defaultLists[1];
	storageControl.uploadList(today);

	const upcoming = listsControl.defaultLists[2];
	storageControl.uploadList(upcoming);

	return {
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
		deleteCheck(checkPrompt) {
			const check = confirm(checkPrompt);
			return check;
		},
		createTodo() {
			createTodoForm(handleFormReturn);
			screenControl.hideBgd();
		},
		addTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			list.addTodo(todo);
			screenControl.checkSubLists(list);
			storageControl.uploadList(list);

			if (dateList) {
				dateList.addTodo(todo);
				todo.dateListId = Number(dateList.id);
				screenControl.checkSubLists(dateList);
				storageControl.uploadList(dateList);
			}

			screenControl.displayChange('TO-DO Added!');
		},
		removeTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			list.removeTodo(todo);
			storageControl.uploadList(list);

			if (dateList) {
				dateList.removeTodo(todo);
				storageControl.uploadList(dateList);
			}
			screenControl.displayChange('TO-DO Removed!');
		},
		completeTodo(todo) {
			this.removeTodo(todo);
			todo.toggleDone();
			this.addTodo(todo);
			screenControl.displayChange('TO-DO Completed!');
		},
		saveTodo(todo) {
			const list = listsControl.getList(todo.listId);
			const dateList = findDateList(todo.dueDate);

			screenControl.checkSubLists(list);
			storageControl.uploadList(list);

			if (dateList) {
				screenControl.checkSubLists(dateList);
				storageControl.uploadList(dateList);
			}
			screenControl.displayChange('TO-DO Saved!');
		},
		moveTodo(oldTodo, todo) {
			this.removeTodo(oldTodo);
			this.addTodo(todo);
			screenControl.displayChange('TO-DO Moved!');
		},

		//* Lists
		addList() {
			const newList = listsControl.createNewList();

			screenControl.replaceCurrentList(newList);
			screenControl.refreshSideBar();
			screenControl.showActiveSideButton(newList);

			storageControl.uploadAllLists();
			screenControl.displayChange('LIST Added!');
		},
		deleteList(list) {
			clearSubList(list.activeTodos);
			clearSubList(list.completedTodos);
			listsControl.deleteList(list);

			screenControl.refreshSideBar();
			screenControl.replaceCurrentList(inbox);
			screenControl.showActiveSideButton(inbox);

			storageControl.uploadAllLists();
			screenControl.displayChange('LIST Deleted!');
		},
		saveList(list) {
			screenControl.updateSideList(list);
			storageControl.uploadList(list);
		},
		emptyCompleted(currentListId) {
			const list = listsControl.getList(currentListId);

			const checkPrompt = `Do you want to empty completed of ${list.title}?`;
			const deleteCheck = this.deleteCheck(checkPrompt);
			if (!deleteCheck) return;

			clearSubList(list.completedTodos);
			storageControl.uploadList(list);
			screenControl.checkSubLists(list);
			screenControl.displayChange('Completed is empty');
		},
		showList(id) {
			const list = listsControl.getList(id);
			screenControl.showActiveSideButton(list);
			screenControl.replaceCurrentList(list);
		},
	};
})();

export default masterController;

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
