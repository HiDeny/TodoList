import createList from '../list/controller/createList';
import { createTodo } from '../todo/todo';

export default function createStorageController(listsControl) {
	//* First Run
	if (localStorage.length < 2) createDefaults(listsControl);
	if (localStorage.length > 2) iniAllLists(listsControl);

	return {
		uploadList(list) {
			const listToJSON = JSON.stringify(list);
			localStorage.setItem(list.id, listToJSON);
		},
		uploadAllLists() {
			localStorage.clear();
			const allLists = listsControl.allLists;
			allLists.forEach((list) => this.uploadList(list));
		},
	};
}

// Create Default Lists
function createDefaults(listsControl) {
	const inbox = createList('📥 Inbox', 'Default list');
	inbox.id = 0;
	listsControl.addDefaultList(inbox);

	const today = createList('🌤️ Today', "Todos with today's date");
	today.id = 1;
	listsControl.addDefaultList(today);

	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	upcoming.id = 2;
	listsControl.addDefaultList(upcoming);
}

// Initialize All Lists
function iniAllLists(listsControl) {
	for (let i = 0; i < localStorage.length; i++) {
		const JSONlist = localStorage[i];
		const ListBase = JSON.parse(JSONlist);
		const completeList = initList(ListBase);

		if (completeList.id <= 2) listsControl.addDefaultList(completeList);
		if (completeList.id > 2) listsControl.addList(completeList);
	}
}

// initLists
function initList({ id, title, description, activeTodos, completedTodos }) {
	const completeList = createList(title, description);
	completeList.id = id;
	if (activeTodos.length > 0) initSubList(activeTodos);
	if (completedTodos.length > 0) initSubList(completedTodos);

	function initSubList(subList) {
		subList.forEach((todo) => {
			const completeTodo = initTodo(todo);
			completeList.addTodo(completeTodo);
		});
	}

	return completeList;
}

// initTodos
function initTodo({
	done,
	title,
	notes,
	dueDate,
	priority,
	listId,
	dateListId,
}) {
	// console.log(todoBase);
	const completeTodo = createTodo(title, notes, dueDate, priority);
	completeTodo.listId = listId;
	completeTodo.dateListId = dateListId;

	if (done) completeTodo.toggleDone();

	return completeTodo;
}
