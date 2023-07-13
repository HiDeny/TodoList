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
	for (let i = 0; i < arr.length; i++) {
		localStorage.setItem(arr[i].id, JSON.stringify(arr[i]));
	}
}

// Get all tasks
function getArrStorage() {
	const allTodosArr = [];
	for (let i = 0; i < localStorage.length - 1; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
		allTodosArr.push(list);
	}

	return allTodosArr;
}

// set single List
function setListStorage(list) {
	localStorage.setItem(list.id, JSON.stringify(list));
}

// get single List
function getListStorage() {
	for (let i = 0; i < localStorage.length - 1; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
	}
}

function removeListStorage(list) {
	localStorage.removeItem(list.id);
}

export {
	setIdStorage,
	getIdStorage,
	setListStorage,
	getListStorage,
	removeListStorage,
	setArrStorage,
	getArrStorage,
};
