let id = parseInt(localStorage.getItem('listId')) || 0;

function incrementAndStoreId() {
	id++;
	// localStorage.setItem('listId', id.toString());
}

export default function createList(title, description) {
	let _listId = id;
	incrementAndStoreId();
	let _activeTodos = [];
	let _completedTodos = [];

	// Find
	function findTodo(todo) {
		const subList = getSubList(todo);
		const foundTodo = subList.find((currentTodo) => currentTodo.id === todo.id);
		return foundTodo;
	}

	// SubList
	function getSubList(todo) {
		if (!todo.done) return _activeTodos;
		if (todo.done) return _completedTodos;
	}

	return {
		//* LIST
		title,
		description,
		// Get
		get id() {
			return _listId;
		},
		get activeTodos() {
			return _activeTodos;
		},
		get completedTodos() {
			return _completedTodos;
		},
		// Clear SubList
		clearSubLists(shouldClear) {
			if (shouldClear === true) {
				while (_activeTodos.length > 0) {
					removeTodo(_activeTodos[0]);
				}
				while (_completedTodos.length > 0) {
					removeTodo(_completedTodos[0]);
				}
			}
		},
		// Sort
		sortList() {
			_activeTodos.sort(compareTodos);
			_completedTodos.sort(compareTodos);
		},

		//* TODO
		// Add
		addTodo(todo) {
			const subList = getSubList(todo);
			subList.push(todo);
		},
		// Remove
		removeTodo(todo) {
			const subList = getSubList(todo);
			subList.splice(subList.indexOf(todo), 1);
		},
		updateTodo(oldTodo, todo) {
			const subList = getSubList(oldTodo);
			subList.splice(subList.indexOf(oldTodo), 1, todo);
		},
	};
}

function compareTodos(a, b) {
	if (a.priority === b.priority) {
		if (a.dueDate && !b.dueDate) return -1;
		if (!a.dueDate && b.dueDate) return 1;
		return new Date(a.dueDate) - new Date(b.dueDate);
	} else {
		const priorityOrder = ['high', 'medium', 'low', ''];
		const priorityA = priorityOrder.indexOf(a.priority);
		const priorityB = priorityOrder.indexOf(b.priority);
		return priorityA - priorityB;
	}
}
