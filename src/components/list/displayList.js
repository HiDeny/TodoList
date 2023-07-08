import { displayTodoCard } from '../todo/displayTodo';
import { sortList } from './updateList';

function displayFreshList(list) {
	const completeList = document.createElement('div');
	completeList.className = 'list';
	completeList.setAttribute('id', list.title);

	// Tasks
	const listDiv = document.createElement('div');
	listDiv.className = 'listTodos';

	const listTitle = document.createElement('p');
	listTitle.className = 'titleList';
	listTitle.textContent = list.title ? list.title : 'List Name';
	listDiv.append(listTitle);

	const listUl = document.createElement('ul');
	listUl.className = 'listUl';

	listDiv.append(listUl);
	completeList.append(listDiv);

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

	completeList.append(listDivCompleted);

	return { completeList, listUl, listUlCompleted, list };
}

function refreshList(list) {
	list = sortList(list.todosArr);
	console.log(list);
	const newListUl = displayFreshList(list).listUl;
	list.forEach((todo) => {
		newListUl.appendChild(displayTodoCard(todo));
	});

	const oldUl = document.querySelector('.listUl');
	oldUl.replaceWith(newListUl);
}

function refreshCompleted(list) {
	list = sortList(list.completedTodos);
	const newCompletedListUl = displayFreshList(list).listUlCompleted;
	list.forEach((todo) => {
		newCompletedListUl.appendChild(displayTodoCard(todo));
	});
	const oldUlCompleted = document.querySelector('.listUlCompleted');
	oldUlCompleted.replaceWith(newCompletedListUl);
}

// Delete list button, double check if they want to delete the list

// Sorting methods

export { displayFreshList, refreshList, refreshCompleted };
