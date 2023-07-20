export default function createTodo(title, notes, dueDate, priority) {
	let _done = false;
	let _dateList = null;
	let _listId = 0;

	return {
		title,
		notes,
		dueDate,
		priority,
		// get coreInformation() {
		// 	return { title, notes, dueDate, priority, _done, _dateList, _listId };
		// },
		get done() {
			return _done;
		},
		toggleDone() {
			_done = !_done;
		},
		get dateList() {
			return _dateList;
		},
		set dateList(newDateList) {
			_dateList = newDateList;
		},
		get listId() {
			return _listId;
		},
		set listId(newListId) {
			_listId = newListId;
		},
	};
}
