import { setListsStorage, getArrStorage } from '../memory/storage';

function createList(title, description) {
	const id = null;
	const activeTodos = [];
	const completedTodos = [];
	return { title, description, activeTodos, completedTodos, id };
}

// Default list
const allLists = getArrStorage();

const ListsArr = sortTodos(allLists);
console.log(ListsArr);

function initSetup() {
	const today = createList('🌤️ Today', "Todos with today's date");
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	const inbox = createList('📥 Inbox', 'Default list');
	const ListsArr = [today, upcoming, inbox];
	setListId(ListsArr);
	setListsStorage(ListsArr);
	return ListsArr;
}

function sortTodos(arr) {
	if (arr.length > 1) return arr;
	if (!arr.length > 1) return initSetup();
}

function setListId(arr) {
	for (let i = 0; i < arr.length; i++) {
		const element = arr[i];
		element.id = arr.indexOf(element);
	}
}

const today = ListsArr[0];
const upcoming = ListsArr[1];
const inbox = ListsArr[2];

export { createList, ListsArr, inbox, today, upcoming, setListId };
