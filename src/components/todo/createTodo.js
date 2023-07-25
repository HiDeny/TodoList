let id = parseInt(localStorage.getItem('todoId')) || 0;

function incrementAndStoreId() {
	id++;
	// localStorage.setItem('listId', id.toString());
}

export default function createTodo(title, notes, dueDate, priority) {
	let _todoId = id;
	incrementAndStoreId();
	let _done = false;
	let _dateList = null;
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
			_listId = newListId;
		},
		get dateList() {
			return _dateList;
		},
		set dateList(newDateList) {
			_dateList = newDateList;
		},
	};
}
