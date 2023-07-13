import { ListsArr, id } from '../list/createList';
// Store ID
function setIdStorage(id) {
	localStorage.setItem('id', id);
}

function getIdStorage() {
	const id = localStorage.getItem('id');
	return id;
}

// Store Lists
function setArrStorage(arr) {
	localStorage.clear();
	setIdStorage(id);
	for (let i = 0; i < arr.length; i++) {
		// localStorage.setItem(arr[i].id, JSON.stringify(arr[i]));
		localStorage.setItem(arr.indexOf(arr[i]), JSON.stringify(arr[i]));
	}
}

// Get all tasks
function getArrStorage() {
	const allListsArr = [];
	for (let i = 0; i < localStorage.length - 1; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
		console.log(list);
		allListsArr.push(list);
	}

	console.log(allListsArr);
	return allListsArr;
}

// set single List
function setListStorage(list) {
	console.log(ListsArr.indexOf(list));
	localStorage.setItem(ListsArr.indexOf(list), JSON.stringify(list));
}

// remove single list
function removeListStorage(list) {
	localStorage.removeItem(list.id);
}

export {
	setIdStorage,
	getIdStorage,
	setListStorage,
	// getListStorage,
	removeListStorage,
	setArrStorage,
	getArrStorage,
};
