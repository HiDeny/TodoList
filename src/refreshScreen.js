function createScreenUpdatesController() {
    return {

    }
}

//* Screen

function refreshList(list) {
    replaceOldList(list);
    refreshSubLists(list);
}

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

	const newList = createListElement(list);
	visibleList.replaceWith(newList);
}

function refreshSubLists(list) {
	refreshSubList(list.activeTodos);
	refreshSubList(list.completedTodos, false);
}

function refreshSubList(subList, active = true) {
	let subListClass = active ? 'activeTodos' : 'completedTodos';

	const freshSubList = getFreshSubList(subList);
	freshSubList.className = subListClass;

	const oldUl = document.querySelector(`.${subListClass}`);
	oldUl.replaceWith(freshSubList);
}

function getFreshSubList(subList) {
	const freshSubList = document.createElement('div');

	subList.forEach((todo) => {
		const todoCard = displayCard(todo);
		setTimeout(() => {
			controlCard(todo, todoCard);
		}, 10);
		freshSubList.appendChild(todoCard);
	});

	return freshSubList;
}