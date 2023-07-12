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
	console.log(listId);
	const activeTodos = [];
	const completedTodos = [];
	return { title, description, activeTodos, completedTodos, id: listId };
}

// Default list
const allTodos = getArrStorage();
let listArr;
function sortTodos(arr) {
	console.log(arr);
	if (arr.length > 1) {
		listArr = arr;
	} else {
		initSetup();
	}
}
sortTodos(allTodos);

function initSetup() {
	console.log('test');
	const today = createList('🌤️ Today', "Todos with today's date");
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	const inbox = createList('📥 Inbox', 'Default list');
	listArr = [inbox, today, upcoming];
	setArrStorage(listArr);
}

const inbox = listArr[0];
const today = listArr[1];
const upcoming = listArr[2];


export { createList, listArr, inbox, today, upcoming };
