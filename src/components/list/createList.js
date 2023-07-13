import {
	setIdStorage,
	getIdStorage,
	setArrStorage,
	getArrStorage,
} from '../memory/storage';

const id = setId();
function setId() {
	const storedId = getIdStorage();
	return Number(storedId) > 0 ? Number(storedId) : 0;
}


function createList(title, description) {
	const listId = id;
	id++;
	setIdStorage(id);
	const activeTodos = [];
	const completedTodos = [];
	return { title, description, activeTodos, completedTodos, id: listId };
}

// Default list
const allLists = getArrStorage();


function sortTodos(arr) {
	if (arr.length > 1) {
		console.log('1 ' + new Date);
		return arr;
	} else {
		console.log('2');
		return initSetup();
	}
}

const ListsArr = sortTodos(allLists);
console.log(ListsArr);

function initSetup() {
	const today = createList('🌤️ Today', "Todos with today's date");
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	const inbox = createList('📥 Inbox', 'Default list');
	const ListsArr = [today, upcoming, inbox];
	setArrStorage(ListsArr);
	return ListsArr;
}

const today = ListsArr[0];
const upcoming = ListsArr[1];
const inbox = ListsArr[2];

export { createList, ListsArr, inbox, today, upcoming, id };
