// Store ID
function setIdStorage(id) {
	localStorage.setItem('id', id);
	console.log(window.localStorage);
}

function getIdStorage() {
	const id = localStorage.getItem('id');
	return id;
}

// Store Lists
function setArrStorage(arr) {
	console.log(arr.length);
	for (let i = 0; i < arr.length; i++) {
		console.log(i);
		localStorage.setItem(arr[i].id, JSON.stringify(arr[i]));
	}
	console.log(window.localStorage);
}

// Get all tasks
function getArrStorage() {
	const allTodosArr = [];
	for (let i = 0; i < localStorage.length - 1; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
		allTodosArr.push(list);
	}

    console.log(localStorage.length);
	return allTodosArr;
}

// set single List
function setListStorage(list) {
	localStorage.setItem(list.id, JSON.stringify(list));
	// console.log(window.localStorage);
}

// get single List
function getListStorage() {
	for (let i = 0; i < localStorage.length - 1; i++) {
		const listJSON = localStorage.getItem(i);
		const list = JSON.parse(listJSON);
		console.log(list);
	}

	console.log(localStorage.length - 1);
}

function removeListStorage(list) {
    localStorage.removeItem(list.id);
    console.log(window.localStorage);
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
