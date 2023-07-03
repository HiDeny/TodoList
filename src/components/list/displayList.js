import { displayTodo } from "../todo/displayTodo";

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
	listTitleCompleted.className = 'titleList';
	listTitleCompleted.textContent = 'Completed';
	listDivCompleted.append(listTitleCompleted);

	const listUlCompleted = document.createElement('ul');
	listUlCompleted.className = `${list.title}UlCompleted`;

	listDivCompleted.append(listUlCompleted);

	completeList.append(listDivCompleted);

	return { completeList, listUl, listUlCompleted, list };
}

function refreshList(list) {
	console.log(list);
	const newListUl = displayFreshList(list).listUl;
	list.todosArr.forEach((todo) => {
		console.log(todo);
		//? todo.listIndex = list.todosArr.indexOf(todo);
		const currentTodo = displayTodo(todo);
		console.log('test1');
		newListUl.appendChild(currentTodo.todoLi);
	});

	const oldUl = document.querySelector('.inboxUl');
	oldUl.replaceWith(newListUl);
}


function refreshCompleted(list) {
	console.log(list);
	const newCompletedListUl = displayFreshList(list).listUlCompleted;
	list.completedTodos.forEach((todo) => {
		console.log(todo);
		const currentTodo = displayTodo(todo);
		currentTodo.todoLi.classList.add('done');
		currentTodo.checkBox.setAttribute('checked', true);
		console.log('test2');
		newCompletedListUl.appendChild(currentTodo.todoLi);
	});
	const oldUlCompleted = document.querySelector('.inboxUlCompleted');
	oldUlCompleted.replaceWith(newCompletedListUl);
}


export { displayFreshList, refreshList, refreshCompleted };
