let id = 0;

function createList(title, description) {
	const listId = id++;
	// title = title ? title : '';
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

export { createList, defaultListsArr, customListsArr, inbox, today, upcoming };
