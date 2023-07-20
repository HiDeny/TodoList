import { refreshSideLists } from '../../../sidebar/sidebar';
import { displayTodoCard } from '../../todo/interface/displayCard';
import { inbox } from '../createList';
import {
	deleteList,
	findDateList,
	findList,
	sortList,
	updateCustomList,
} from '../updateList';

function displayList(list) {
	const displayListDiv = createDisplayList(list);

	const listHead = createListHead(list);
	displayListDiv.append(listHead);

	const activeTodos = createActiveTodos();
	displayListDiv.append(activeTodos);

	const completedTodosTitle = createCompletedTodosTitle();
	displayListDiv.append(completedTodosTitle);

	const completedTodos = createCompletedTodos();
	displayListDiv.append(completedTodos);

	return displayListDiv;
}

function createDisplayList(list) {
	const displayList = document.createElement('div');
	displayList.className = 'list';
	displayList.setAttribute('id', list.id);

	return displayList;
}

function createListHead(list) {
	if (list.id <= 2) return createDefaultListHead(list);
	return createCustomListHead(list);
}

//* Default List
function createDefaultListHead(list) {
	const headDiv = document.createElement('div');

	const title = createDefaultListTitle(list);
	title.className = 'listTitle';
	headDiv.append(title);

	const description = createDefaultListDescription(list);
	headDiv.append(description);

	return headDiv;
}

function createDefaultListTitle(list) {
	const listTitle = document.createElement('p');
	listTitle.textContent = list.title;

	return listTitle;
}

function createDefaultListDescription(list) {
	const listDescription = document.createElement('p');
	listDescription.className = 'listDescription';
	listDescription.textContent = list.description;

	return listDescription;
}

//* Custom List
function createCustomListHead(list) {
	const headDiv = document.createElement('div');

	const title = createCustomListTitle(list);
	title.classList.add('listTitle');
	headDiv.append(title);

	const deleteButton = createDeleteButton(list);
	headDiv.append(deleteButton);

	const description = createCustomListDescription(list);
	headDiv.append(description);

	return headDiv;
}

function createCustomListTitle(list) {
	const listTitle = document.createElement('input');
	listTitle.className = 'customTitle';
	listTitle.setAttribute('type', 'text');
	listTitle.setAttribute('placeholder', 'New List');
	listTitle.value = list.title;
	listTitle.addEventListener('input', (event) => {
		list.title = event.target.value;
		updateCustomList(list);
		refreshSideLists();
	});

	return listTitle;
}

function createCustomListDescription(list) {
	const listDescription = document.createElement('textarea');
	listDescription.className = 'listDescription';
	listDescription.classList.add('customDescription');
	listDescription.setAttribute('placeholder', 'Description');
	listDescription.textContent = list.description;
	listDescription.addEventListener('input', (event) => {
		list.description = event.target.value;
		updateCustomList(list);
		refreshSideLists();
	});

	return listDescription;
}

function createDeleteButton(list) {
	const deleteButton = document.createElement('button');
	deleteButton.className = 'deleteListButton';
	deleteButton.textContent = 'Delete';
	deleteButton.addEventListener('click', () => {
		const check = confirm(
			`Do you really want to delete ${list.title.toUpperCase()}?`
		);
		if (check) {
			deleteList(list);
			refreshList(inbox);
			refreshSideLists();
		}
	});

	return deleteButton;
}

function createActiveTodos() {
	const active = document.createElement('ul');
	active.className = 'activeTodos';

	return active;
}

function createCompletedTodosTitle() {
	const completedTodosTitle = document.createElement('p');
	completedTodosTitle.className = 'completedTodosTitle';
	completedTodosTitle.textContent = 'Completed';

	return completedTodosTitle;
}

function createCompletedTodos() {
	const completedTodos = document.createElement('ul');
	completedTodos.className = 'completedTodos';

	return completedTodos;
}

function refreshList(list) {
	replaceOldList(list);
	focusTitle();
	checkSubList(list);
}

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

	const newList = displayList(list);
	visibleList.replaceWith(newList);
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

// Delete list button, double check if they want to delete the list

export { displayList, refreshList, refreshSubList };
