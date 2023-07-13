import {
	setIdStorage,
	getIdStorage,
	setArrStorage,
	getArrStorage,
} from '../memory/storage';

let id;
function setId() {
	const storedId = getIdStorage();
	id = Number(storedId) > 0 ? Number(storedId) : 0;
}
setId();

function createList(title, description) {
	const listId = id;
	id++;
	setIdStorage(id);
	const activeTodos = [];
	const completedTodos = [];
	return { title, description, activeTodos, completedTodos, id: listId };
}

// Default list
const allTodos = getArrStorage();

let ListsArr;
function sortTodos(arr) {
	if (arr.length > 1) {
		ListsArr = arr;
	} else {
		initSetup();
	}
}
sortTodos(allTodos);

function initSetup() {
	const today = createList('🌤️ Today', "Todos with today's date");
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	const inbox = createList('📥 Inbox', 'Default list');
	ListsArr = [today, upcoming, inbox];
	setArrStorage(ListsArr);
}

const today = ListsArr[0];
const upcoming = ListsArr[1];
const inbox = ListsArr[2];

export { createList, ListsArr, inbox, today, upcoming };
