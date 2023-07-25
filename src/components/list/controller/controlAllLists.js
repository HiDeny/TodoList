export default function allListsController() {
	let _defaultListsArr = [];
	let _customListsArr = [];

	function getAllLists() {
		return [..._defaultListsArr, ..._customListsArr];
	}

	function setListIds() {
		_customListsArr.forEach((list) => {
			list.id = _customListsArr.indexOf(list) + 3;
		});
	}

	return {
		// Get
		get defaultLists() {
			return [..._defaultListsArr];
		},
		get customLists() {
			return [..._customListsArr];
		},
		getAllLists,
		// Add
		addDefaultList(list) {
			if (list.id > 2) console.log(`Not default list ${list}`);
			_defaultListsArr.push(list);
		},
		addList(list) {
			_customListsArr.push(list);
			setListIds();
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
					setListIds();
				}
			}
		},
		getList(id) {
			return getAllLists().find((list) => list.id === Number(id));
		},
	};
}
