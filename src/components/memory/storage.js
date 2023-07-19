import { defaultListsArr, customListsArr } from '../list/createList';

const combineLists = () => {
	const completeArr = [];

	defaultListsArr.forEach((defaultList) => {
		completeArr.push(defaultList);
	});

	customListsArr.forEach((customList) => {
		if (customList.id === 2) return;
		completeArr.push(customList);
	});

	return completeArr;
};

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
	const storedLists = Object.values(localStorage);
	storedLists.forEach((list) => {
		const listJSON = JSON.parse(list);
		allLists.push(listJSON);
	});

	allLists.sort((a, b) => a.id - b.id);
	return allLists;
}

export { saveAllListsMemory, updateListMemory, getLists };
