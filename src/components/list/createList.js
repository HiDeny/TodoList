function createList(title, description) {
	const todosArr = [];
	const completedTodos = [];

	return { title, description, todosArr, completedTodos };
}

// Default list
const inbox = createList('Inbox', 'Default list');
const today = createList('Today', 'Todos with todays date');
const upcoming = createList('Upcoming', 'Todos with future dates');


const listsArr = [inbox, today, upcoming];

export { createList, listsArr };
