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

	return { listDiv, listUl };
}
