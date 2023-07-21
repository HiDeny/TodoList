export default function allListsController() {
	let _defaultListsArr = [];
	let _customListsArr = [];

	return {
		// Get
		get defaultLists() {
			return [..._defaultListsArr];
		},
		get customLists() {
			return [..._customListsArr];
		},
		get allLists() {
			return [..._defaultListsArr, ..._customListsArr];
		},
		// Add
		addList(list) {
			if (list.id <= 2) {
				_defaultListsArr.push(list);
			} else {
				_customListsArr.push(list);
			}
		},
		updateList(updatedList) {
			const listToUpdate = _customListsArr.find(
				(list) => list.id === updatedList.id
			);
			if (listToUpdate) Object.assign(listToUpdate, updatedList);
		},
		// Remove
		deleteList(list, shouldDelete) {
			if (shouldDelete === true) {
				list.clearSubLists(shouldDelete);
				const listIndex = _customListsArr.indexOf(list);
				if (listIndex !== -1) {
					_customListsArr.splice(listIndex, 1);
				}
			}
		},
		// Find
		findList(listId) {
			return this.allLists.find((list) => list.id === listId);
		},
	};
}

// function findDateList(todo) {
// 	if (!todo.dueDate) return null;

// 	const date = new Date(todo.dueDate);

// 	const completeList = isToday(date) ? today : upcoming;
// 	const subList = !todo.done
// 		? completeList.activeTodos
// 		: completeList.completedTodos;

// 	return { completeList, subList };
// }

// function addDateList(todo) {
// 	const dateList = findDateList(todo);
// 	if (dateList) {
// 		todo.dateList = dateList.completeList.id;
// 		dateList.subList.push(todo);
// 		updateListMemory(dateList.completeList);
// 	}
// }

// Remove
// function removeDateList(todo) {
// 	const dateList = findDateList(todo);
// 	if (dateList) {
// 		dateList.subList.splice(dateList.subList.indexOf(todo), 1);
// 		updateListMemory(dateList.completeList);
// 	}
// }

// import { getLists, updateListMemory } from '../memory/storage';
// const allLists = getLists();
// updateListMemory();
