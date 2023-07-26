export default function allListsController() {
	let _defaultListsArr = [];
	let _customListsArr = [];

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
		get allLists() {
			return [..._defaultListsArr, ..._customListsArr];
		},
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
		deleteList(list) {
			const listIndex = _customListsArr.indexOf(list);
			if (listIndex !== -1) {
				_customListsArr.splice(listIndex, 1);
				setListIds();
			}
		},
		getList(id) {
			return this.allLists.find((list) => list.id === Number(id));
		},
	};
}
