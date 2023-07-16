import { getLists, updateListMemory } from '../memory/storage';

const allLists = getLists();
// console.log(allLists);

function firstSetup() {
	let today;
	let upcoming;
	let inbox;
	console.log('test');
	if (allLists.length < 2) {
		today = createList('🌤️ Today', "Todos with today's date");
		upcoming = createList('📆 Upcoming', 'Todos with future dates');
		inbox = createList('📥 Inbox', 'Default list');
	} else {
		today = allLists.find((list) => list.id === 0);
		upcoming = allLists.find((list) => list.id === 1);
		inbox = allLists.find((list) => list.id === 2);
	}

	return { today, upcoming, inbox };
}

let id = allLists.length > 0 ? allLists.length : 0;

const getDefaults = firstSetup();
const today = getDefaults.today;
const upcoming = getDefaults.upcoming;
const inbox = getDefaults.inbox;

function createList(title, description) {
	const listId = id++;
	const activeTodos = [];
	const completedTodos = [];

	return { title, description, activeTodos, completedTodos, id: listId };
}

// Default list
const defaultListsArr = [today, upcoming, inbox];
const customListsArr = allLists.slice(2);
console.log(customListsArr);

const combineLists = () => {
	const completeArr = [];

	defaultListsArr.forEach((defaultList) => {
		completeArr.push(defaultList);
	});

	customListsArr.forEach((customList) => {
		if (customList.id === 2) return;
		completeArr.push(customList);
	});

	return completeArr;
};

console.log(combineLists());
updateListMemory();

export {
	createList,
	defaultListsArr,
	customListsArr,
	inbox,
	today,
	upcoming,
	combineLists,
};
