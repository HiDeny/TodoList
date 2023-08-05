import controlCustomListElement from '../controller/controlListElement';

export default function createListElement(list) {
	const listElement = createListDiv(list);

	const listHead = createListHead(list);
	listElement.append(listHead);

	const activeTodos = createActiveTodos();
	listElement.append(activeTodos);

	const completedTodosTitle = createCompletedTodosTitle();
	listElement.append(completedTodosTitle);

	const completedTodos = createCompletedTodos();
	listElement.append(completedTodos);

	return listElement;
}

function createListDiv(list) {
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
	headDiv.className = 'listHead';

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
	headDiv.className = 'listHead';

	const title = createCustomListTitle(list);
	title.classList.add('listTitle');
	headDiv.append(title);

	const description = createCustomListDescription(list);
	headDiv.append(description);

	const deleteButton = createDeleteButton(list);
	headDiv.append(deleteButton);

	controlCustomListElement(list, deleteButton, title, description);

	return headDiv;
}

function createCustomListTitle(list) {
	const listTitle = document.createElement('input');
	listTitle.className = 'customTitle';
	listTitle.setAttribute('type', 'text');
	listTitle.setAttribute('placeholder', 'New List');
	listTitle.value = list.title === 'New List' ? '' : list.title;

	return listTitle;
}

function createCustomListDescription(list) {
	const listDescription = document.createElement('textarea');
	listDescription.className = 'listDescription';
	listDescription.classList.add('customDescription');
	listDescription.setAttribute('placeholder', 'Description');
	listDescription.textContent = list.description;

	return listDescription;
}

function createDeleteButton() {
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('deleteList');

	return deleteButton;
}

function createActiveTodos() {
	const active = document.createElement('div');
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
	const completedTodos = document.createElement('div');
	completedTodos.className = 'completedTodos';

	return completedTodos;
}

// function createEmptyCompleted(list) {
// 	const emptyCompletedTodos = document.createElement('button');
// 	emptyCompletedTodos.classList.add('emptyCompletedButton');
// 	emptyCompletedTodos.textContent = 'Empty Completed';

// 	controlEmptyComplete(list, emptyCompletedTodos);

// 	return emptyCompletedTodos;
// }
