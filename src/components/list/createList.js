let id = 0;

function createList(title, description) {
	const listId = id++;
	title = title ? title : 'List';
	const todosArr = [];
	const completedTodos = [];

	return { title, description, todosArr, completedTodos, id: listId };
}

// Default list
const inbox = createList('📥 Inbox', 'Default list');
const today = createList('🌤️ Today', "Todos with today's date");
const upcoming = createList('📆 Upcoming', 'Todos with future dates');

const defaultListsArr = [inbox, today, upcoming];
const customListsArr = [inbox];
const listsArr = [inbox, today, upcoming];

export { createList, defaultListsArr, customListsArr, listsArr, inbox, today, upcoming };
