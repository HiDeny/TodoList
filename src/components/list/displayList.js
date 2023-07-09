import { displayTodoCard } from '../todo/displayTodo';
import { findList, findSubList, sortList } from './updateList';
import { displayCustomList } from './displayCustomList';

function displayFreshList(list) {
	const displayList = document.createElement('div');
	displayList.className = 'list';
	console.log(list.title);
	displayList.setAttribute('id', list.id);

	// Tasks
	const listDiv = document.createElement('div');
	listDiv.className = 'listTodos';

	const listTitle = document.createElement('p');
	listTitle.className = 'titleList';
	listTitle.textContent = list.title;
	listDiv.append(listTitle);

	const listUl = document.createElement('ul');
	listUl.className = 'listUl';

	listDiv.append(listUl);
	displayList.append(listDiv);

	// Completed
	const listDivCompleted = document.createElement('div');
	listDivCompleted.className = 'listCompleted';

	const listTitleCompleted = document.createElement('p');
	listTitleCompleted.className = 'titleListCompleted';
	listTitleCompleted.textContent = 'Completed';
	listDivCompleted.append(listTitleCompleted);

	const listUlCompleted = document.createElement('ul');
	listUlCompleted.className = 'listUlCompleted';

	listDivCompleted.append(listUlCompleted);

	displayList.append(listDivCompleted);

	return displayList;
}

function refreshList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

	let newList;
	if (list.id <= 2 ) newList = displayFreshList(list);
	if (list.id > 2 ) newList = displayCustomList(list);
	visibleList.replaceWith(newList);
	
	if (list.todosArr.length > 0) refreshSubList(list.todosArr[0]); 
	if (list.completedTodos.length > 0) refreshSubList(list.completedTodos[0]); 
}

function refreshSubList(todo) {
	console.log(todo);
	const list = findList(todo);
	console.log(list);
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) !== list.id) return;

	const subList = findSubList(todo);
	const sortedList = sortList(subList);

	const listClass = !todo.done ? 'listUl' : 'listUlCompleted';
	const newVisual = document.createElement('ul');
	newVisual.className = listClass;

	sortedList.forEach((todo) => {
		newVisual.appendChild(displayTodoCard(todo));
	});

	const oldUl = document.querySelector(`.${listClass}`);
	oldUl.replaceWith(newVisual);
}

// Delete list button, double check if they want to delete the list

// Sorting methods

export { displayFreshList, refreshList,  refreshSubList};
