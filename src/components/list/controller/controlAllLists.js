import createList from './createList';

export default function createListsController() {
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
		// Create
		createNewList() {
			const newList = createList('New List');
			_customListsArr.push(newList);
			setListIds();

			return newList;
		},
		// Add
		addDefaultList(list) {
			_defaultListsArr.push(list);
		},
		addList(list) {
			_customListsArr.push(list);
			setListIds();
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
