import { updateCustomList } from './updateList';

function displayCustomList(list) {
	const customList = document.createElement('div');
	customList.className = 'list';
	customList.setAttribute('id', list.id);

	// Tasks
	const listDiv = document.createElement('div');
	listDiv.className = 'listTodos';

	const listTitle = document.createElement('input');
	listTitle.className = 'titleList';
	listTitle.setAttribute('type', 'text');
	listTitle.setAttribute('placeholder', 'New List');
	listTitle.value = list.title;
	listTitle.addEventListener('input', (event) => {
		list.title = event.target.value;
		updateCustomList(list);
		//! POTENTIAL MESS
	});

	listDiv.append(listTitle);

	const listDescription = document.createElement('textarea');
	listDescription.className = 'descriptionList';
	listDescription.setAttribute('type', 'text');
	listDescription.setAttribute('placeholder', 'Description');
	listDescription.textContent = list.description;
	listDescription.addEventListener('input', (event) => {
		list.description = event.target.value;
		updateCustomList(list);
		//! POTENTIAL MESS
	});

	listDiv.append(listDescription);

	const listUl = document.createElement('ul');
	listUl.className = 'listUl';

	listDiv.append(listUl);
	customList.append(listDiv);

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

	customList.append(listDivCompleted);

	return customList;
}

export { displayCustomList };
