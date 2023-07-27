import { masterController } from '../../masterController';

export const testingMemoryController = memoryController();

export default function memoryController() {
	return {
		uploadList(list) {
			const listToJSON = JSON.stringify(list);
			localStorage.setItem(list.id, listToJSON);
		},
		uploadAllLists() {
			const allLists = masterController.listsControl.allLists;
			freshStorage();
			allLists.forEach((list) => this.uploadList(list));
		},
		downloadAllLists() {
			const allLists = [];
			localStorage.removeItem(localStorage.length)
			const storedLists = Object.values(localStorage);
			console.log(storedLists);
			storedLists.forEach((list) => {
				console.log(list === Number);
				const listJSON = JSON.parse(list);
				allLists.push(listJSON);
			});

			allLists.sort((a, b) => a.id - b.id);

			console.log(allLists);
			// return allLists;
		},
	};
}

function freshStorage() {
	const todoId = parseInt(localStorage.getItem('todoId'));
	localStorage.clear();
	localStorage.setItem('todoId', todoId.toString());
}
