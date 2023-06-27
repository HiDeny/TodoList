export default function displayList(list) {
	
	const listDiv = document.createElement('div');
	listDiv.className = 'list';
	listDiv.setAttribute('id', list.title);

	const listTitle = document.createElement('p');
	listTitle.className = 'titleList';
	listTitle.textContent = list.title;
	listDiv.append(listTitle);

	const listUl = document.createElement('ul');
	listUl.className = `${list.title}Ul`;

	listDiv.append(listUl);

	// Completed
	const listDivCompleted = document.createElement('div');
	listDivCompleted.className = 'listCompleted';
	listDivCompleted.setAttribute('id', `${list.title}Completed`);

	const listUlCompleted = document.createElement('ul');
	listUlCompleted.className = `${list.title}UlCompleted`;

	listDivCompleted.append(listUlCompleted)


	listDiv.append(listDivCompleted)

	return { listDiv, listUl, listDivCompleted, listUlCompleted };
}
