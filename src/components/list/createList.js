import { getLists } from '../memory/storage';

let id = 0;

function createList(title, description) {
	const listId = id++;
	const activeTodos = [];
	const completedTodos = [];

	return { title, description, activeTodos, completedTodos, id: listId };
}

// Default list
const today = createList('🌤️ Today', "Todos with today's date");
const upcoming = createList('📆 Upcoming', 'Todos with future dates');
const inbox = createList('📥 Inbox', 'Default list');

const defaultListsArr = [inbox, today, upcoming];
const customListsArr = [inbox];
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

export {
	createList,
	defaultListsArr,
	customListsArr,
	inbox,
	today,
	upcoming,
	combineLists,
};
