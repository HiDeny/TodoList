// let id = parseInt(localStorage.getItem('todoId')) || 0;
let id = 0;

// function incrementAndStoreId() {
// 	id++;
// 	localStorage.setItem('todoId', id.toString());
// }

export default function createTodo(title, notes, dueDate, priority) {
	let _todoId = id;
	id++;
	let _done = false;
	let _dateListId = null;
	let _listId = 0;

	return {
		title,
		notes,
		dueDate,
		priority,

		get id() {
			return _todoId;
		},
		get done() {
			return _done;
		},
		toggleDone() {
			_done = !_done;
		},
		get listId() {
			return _listId;
		},
		set listId(newListId) {
			_listId = Number(newListId);
		},
		get dateListId() {
			return _dateListId;
		},
		set dateListId(newDateListId) {
			_dateListId = Number(newDateListId);
		},
	};
}
