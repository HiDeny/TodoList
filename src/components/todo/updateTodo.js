const updateTitleTodo = (todo, newTitle) => {
	todo.title = newTitle;
};

const updateNotesTodo = (todo, newNotes) => {
	todo.notes = newNotes;
};

const updateDateTodo = (todo, newDate) => {
	todo.dueDate = newDate;
};

const updateListTodo = (todo, newListId) => {
	todo.listId = Number(newListId);
};

const updatePriorityTodo = (todo, newPriority) => {
	todo.priority = newPriority;
};

export {
	updateTitleTodo,
	updateNotesTodo,
	updateDateTodo,
	updateListTodo,
	updatePriorityTodo,
};
