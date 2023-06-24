export default function displayList(list) {
	const listDiv = document.createElement('div');

	listDiv.className = 'list';
	listDiv.setAttribute('id', list.name);

	const listName = document.createElement('p');
	listName.className = 'titleList';
	listName.textContent = list.name;

	listDiv.append(listName);

	const listUl = document.createElement('ul');
	listUl.className = `${list.name}Ul`;

	listDiv.append(listUl);

	return { listDiv, listUl };
}
