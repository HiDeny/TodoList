import { isFuture, isToday } from 'date-fns';
import { displayTodoCard } from '../todo/displayTodo';
import {
	findDateSubList,
	findList,
	findSubList,
	sortList,
	updateCustomList,
} from './updateList';

function displayList(list) {
	const displayListDiv = createDisplayList(list);

	const listTitle = createListTitle(list);
	displayListDiv.append(listTitle);

	const listDescription = createListDescription(list);
	displayListDiv.append(listDescription);

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

function createListTitle(list) {
	let listTitle = createCustomListTitle(list);
	if (list.id <= 2) listTitle = createDefaultListTitle(list);
	listTitle.classList.add('listTitle');

	return listTitle;
}

function createDefaultListTitle(list) {
	const listTitle = document.createElement('p');
	listTitle.textContent = list.title;

	return listTitle;
}

function createCustomListTitle(list) {
	const listTitle = document.createElement('input');
	listTitle.classList.add('customTitle');
	listTitle.setAttribute('type', 'text');
	listTitle.setAttribute('placeholder', 'New List');
	listTitle.value = list.title;
	listTitle.addEventListener('input', (event) => {
		list.title = event.target.value;
		updateCustomList(list);
	});

	return listTitle;
}

function createListDescription(list) {
	let listDescription = createCustomListDescription(list);
	if (list.id <= 2) listDescription = createDefaultListDescription(list);

	return listDescription;
}

function createDefaultListDescription(list) {
	const listDescription = document.createElement('p');
	listDescription.className = 'listDescription';
	listDescription.textContent = list.description;

	return listDescription;
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
	});

	return listDescription;
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
	// const list = findList(todo);
	const visibleList = document.querySelector('.list');

	const nextStep = refreshConditions(visibleList, todo);
	console.log(nextStep);

	// if (Number(visibleList.id) !== list.id) return;
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
		console.log(todo.dateList !== Number(visibleList.id));
		if (todo.dateList !== Number(visibleList.id)) return;
		console.log(todo);
		return findDateSubList(todo);
	}

	if (todo.listId !== Number(visibleList.id)) return;
	return findSubList(todo);
}

// Delete list button, double check if they want to delete the list

export { displayList, refreshList, refreshSubList };
