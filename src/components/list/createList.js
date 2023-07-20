let id = parseInt(localStorage.getItem('listId')) || 0;

function incrementAndStoreId() {
	id++;
	localStorage.setItem('listId', id.toString());
}

export default function createList(title, description) {
	let _listId = id;
	incrementAndStoreId();
	let _activeTodos = [];
	let _completedTodos = [];

	function removeTodo(todo) {
		if (todo.done === false) {
			_activeTodos.splice(_activeTodos.indexOf(todo), 1);
		} else {
			_completedTodos.splice(_completedTodos.indexOf(todo), 1);
		}
	}

	return {
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
		// Add
		addTodo(todo) {
			if (todo.done === false) {
				_activeTodos.push(todo);
			} else {
				_completedTodos.push(todo);
			}
		},
		// Remove
		removeTodo,
		updateTodo(oldTodo, updatedTodo) {
			if (todo.done === false)
				_activeTodos.splice(_activeTodos.indexOf(oldTodo), 1, updatedTodo);
			if (todo.done === true)
				_completedTodos.splice(
					_completedTodos.indexOf(oldTodo),
					1,
					updatedTodo
				);
		},
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
		sortList() {
			_activeTodos.sort(compareTodos);
			_completedTodos.sort(compareTodos);
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
