export default function createList(title, description) {
	let listTitle = title;
	let listDescription = description || '';
	let _activeTodos = [];
	let _completedTodos = [];
	let _listId;

	// SubList
	function getSubList(todo) {
		if (!todo.done) return _activeTodos;
		if (todo.done) return _completedTodos;
	}

	function findTodo(todo, subList) {
		return subList.find((todoInList) => todoInList.id === Number(todo.id));
	}

	return {
		//* LIST
		// Basics
		get title() {
			return listTitle;
		},
		set title(newTitle) {
			listTitle = newTitle;
		},
		get description() {
			return listDescription;
		},
		set description(newDescription) {
			listDescription = newDescription;
		},
		// Get
		get id() {
			return _listId;
		},
		set id(newId) {
			_listId = Number(newId);
		},
		get activeTodos() {
			return _activeTodos;
		},
		get completedTodos() {
			return _completedTodos;
		},
		// Sort
		sortList() {
			_activeTodos.sort(compareTodos);
		},
		//* TODOS
		// Add
		addTodo(todo) {
			const subList = getSubList(todo);
			subList.unshift(todo);
		},
		// Remove
		removeTodo(todo) {
			const subList = getSubList(todo);
			const todoToRemove = findTodo(todo, subList);
			const todoToRemoveIndex = subList.indexOf(todoToRemove);

			subList.splice(todoToRemoveIndex, 1);
		},
	};
}

// Should i give more weight to date or priority?
function compareTodos(a, b) {
	if (a.priority === b.priority) {
		if (a.dueDate && !b.dueDate) return -1;
		if (!a.dueDate && b.dueDate) return 1;
		return new Date(a.dueDate) - new Date(b.dueDate);
	} else {
		const priorityOrder = ['high', 'medium', 'low', 'none'];
		const priorityA = priorityOrder.indexOf(a.priority);
		const priorityB = priorityOrder.indexOf(b.priority);
		return priorityA - priorityB;
	}
}
