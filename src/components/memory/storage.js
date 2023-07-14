import { ListsArr } from '../list/createList';

// Get all tasks
function getArrStorage() {
	const allListsArr = [];
	for (let i = 0; i < localStorage.length; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
		console.log(list);
		allListsArr.push(list);
	}

	console.log(allListsArr);
	return allListsArr;
}

// Store Lists
function setListsStorage(arr) {
	localStorage.clear();
	for (let i = 0; i < arr.length; i++) {
		localStorage.setItem(arr.indexOf(arr[i]), JSON.stringify(arr[i]));
	}
}

// set single List
function setListStorage(list) {
	localStorage.setItem(ListsArr.indexOf(list), JSON.stringify(list));
}

export { setListStorage, setListsStorage, getArrStorage };
