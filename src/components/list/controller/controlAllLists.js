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
		addDefaultList(list) {
			if (list.id <= 2) _defaultListsArr.push(list);
		},
		addList(list) {
			_customListsArr.push(list);
		},
		// Update
		updateList(oldList, list) {
			_customListsArr.splice(_customListsArr.indexOf(oldList), 1, list);
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
	};
}
