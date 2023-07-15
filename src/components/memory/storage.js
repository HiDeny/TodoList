function saveListsMemory(arr) {
	localStorage.clear();
    console.log(arr);

	for (let i = 0; i < arr.length; i++) {
		const list = JSON.stringify(arr[i]);
		localStorage.setItem(i, list);
	}

	console.log(localStorage);
}

function updateListMemory(list, index) {
	localStorage.setItem(index, JSON.stringify(list));
}

function getLists(arr) {
	const allLists = [];
	for (let i = 0; i < arr.length; i++) {
		const list = arr[i];
		allLists.push(list);
	}
	return allLists;
}

export { saveListsMemory, updateListMemory, getLists };
