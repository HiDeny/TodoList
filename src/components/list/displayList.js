import { displayTodoCard } from '../todo/displayTodo';

function displayFreshList(list) {
	const completeList = document.createElement('div');
	completeList.className = 'list';
	completeList.setAttribute('id', list.title);

	// Tasks
	const listDiv = document.createElement('div');
	listDiv.className = 'listTodos';

	const listTitle = document.createElement('p');
	listTitle.className = 'titleList';
	listTitle.textContent = list.title;
	listDiv.append(listTitle);

	const listUl = document.createElement('ul');
	listUl.className = `${list.title}Ul`;

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
	listUlCompleted.className = `${list.title}UlCompleted`;

	listDivCompleted.append(listUlCompleted);

	completeList.append(listDivCompleted);

	return { completeList, listUl, listUlCompleted, list };
}

function refreshList(list) {
	const newListUl = displayFreshList(list).listUl;
	list.todosArr.forEach((todo) => {
		newListUl.appendChild(displayTodoCard(todo));
	});

	const oldUl = document.querySelector(`.${list.title}Ul`);
	oldUl.replaceWith(newListUl);
}

function refreshCompleted(list) {
	const newCompletedListUl = displayFreshList(list).listUlCompleted;
	list.completedTodos.forEach((todo) => {
		newCompletedListUl.appendChild(displayTodoCard(todo));
	});
	const oldUlCompleted = document.querySelector(`.${list.title}UlCompleted`);
	oldUlCompleted.replaceWith(newCompletedListUl);
}

export { displayFreshList, refreshList, refreshCompleted };
