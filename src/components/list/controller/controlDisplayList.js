import listController from './controlLists';

export default function controlDisplayList(list) {
	// const originalList = { ...list };
	const updatedList = { ...list };

	(() => {
		const deleteButton = document.querySelector('#deleteListButton');

		deleteButton.addEventListener('click', () => {
			const check = confirm(
				`Do you really want to delete ${list.title.toUpperCase()}?`
			);
			if (check) {
				listController.deleteList(list, check);
			}
		});
	})();

	(() => {
		const descriptionList = document.querySelector('.customDescription');

		descriptionList.addEventListener('input', (event) => {
			updatedList.description = event.target.value;
            // Master List?
            listController.updateList(updatedList);
		});
	})();

	(() => {
		const titleList = document.querySelector('.customTitle');

		titleList.addEventListener('input', (event) => {
			updatedList.title = event.target.value;
            // Master List?
            listController.updateList(updatedList);
		});
	})();
}

function focusTitle() {
	const titleName = document.querySelector('.customTitle');
	const titleValue = titleName ? titleName.value : null;
	if (titleValue === '') titleName.focus();
}

function checkSubList(list) {
	if (list.activeTodos.length > 0) refreshSubList(list.activeTodos[0]);
	if (list.completedTodos.length > 0) refreshSubList(list.completedTodos[0]);
}

function refreshSubList(todo) {
	const visibleList = document.querySelector('.list');

	const nextStep = refreshConditions(visibleList, todo);

	if (!nextStep) return;

	const subList = nextStep;
	const sortedList = sortList(subList);

	const listClass = !todo.done ? 'activeTodos' : 'completedTodos';
	const newVisual = document.createElement('ul');
	newVisual.className = listClass;

	sortedList.forEach((todo) => {
		newVisual.appendChild(displayTodoCard(todo));
	});

	const oldUl = document.querySelector(`.${listClass}`);
	oldUl.replaceWith(newVisual);
}

function refreshConditions(visibleList, todo) {
	if (visibleList.id < 2) {
		if (Number(todo.dateList) !== Number(visibleList.id)) return;
		return findDateList(todo).subList;
	}

	if (Number(todo.listId) !== Number(visibleList.id)) return;
	return findList(todo).subList;
}

// updateCustomList(list);
// refreshSideLists();

// function refreshDisplay(list) {
// 	replaceOldList(list);
// 	focusTitle();
// 	checkSubList(list);
// }

// function replaceOldList(list) {
// 	const visibleList = document.querySelector('.list');
// 	if (Number(visibleList.id) === list.id) return;

// 	const newList = displayList(list);
// 	visibleList.replaceWith(newList);
// }
