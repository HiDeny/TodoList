import { combineLists } from '../list/createList';

function saveAllListsMemory() {
	localStorage.clear();
	const allLists = combineLists();

	for (let i = 0; i < allLists.length; i++) {
		const list = JSON.stringify(allLists[i]);
		localStorage.setItem(i, list);
	}
}

function updateListMemory(list) {
	const allLists = combineLists();
	const index = allLists.indexOf(list);
	if (localStorage.length < 3) {
		localStorage.setItem(0, JSON.stringify(allLists[0]));
		localStorage.setItem(1, JSON.stringify(allLists[1]));
		localStorage.setItem(2, JSON.stringify(allLists[2]));
	}
	if (index >= 0) localStorage.setItem(index, JSON.stringify(list));
}

function getLists() {
	const allLists = [];
	Object.values(localStorage).forEach((list) => {
		const listJSON = JSON.parse(list);
		console.log(listJSON);
		allLists.push(listJSON);
	});

	return allLists;
}

export { saveAllListsMemory, updateListMemory, getLists };
