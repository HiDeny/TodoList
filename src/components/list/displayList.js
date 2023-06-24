export default function displayList(list) {
	const listDiv = document.createElement('div');
	
    listDiv.className = 'list';
    listDiv.setAttribute('id', list.name);

	const listName = document.createElement('h2');
	listName.textContent = list.name;

	listDiv.append(listName);

	const listUl = document.createElement('ul');

	listDiv.append(listUl);

	return { listDiv, listUl };
}
