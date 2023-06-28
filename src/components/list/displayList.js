export default function displayList(list) {
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

	listDivCompleted.append(listUlCompleted)


	completeList.append(listDivCompleted)

	return { completeList, listUl, listUlCompleted, list};
}
