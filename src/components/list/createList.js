function createList(title) {
	const todosArr = [];
	const completedTodos = [];

	listsArr.push(title);

	return { title, todosArr, completedTodos };
}

const listsArr = [];

export { createList, listsArr };
