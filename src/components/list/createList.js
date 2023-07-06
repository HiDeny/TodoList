function createList(title) {
	const todosArr = [];
	const completedTodos = [];

	return { title, todosArr, completedTodos };
}


const inbox = createList('Inbox');
const today = createList('Today');
const upcoming = createList('Upcoming');


const listsArr = [inbox, today, upcoming];

export { createList, listsArr };
