import { format, isThisYear, isToday, isTomorrow } from 'date-fns';

import { visualizePriority } from './helperFunctions';

export default function displayCard(todo) {
	const todoCard = createCard();
	todoCard.classList.add(`card${todo.id}`);

	const checkBox = createCheckBox();
	todoCard.append(checkBox);
	if (todo.done) {
		checkBox.setAttribute('checked', true);
		todoCard.classList.add('done');
	}

	const dueDate = createDueDate(todo);
	todoCard.append(dueDate);

	const title = createTitle(todo);
	todoCard.append(title);

	const removeButton = createRemoveButton();
	todoCard.append(removeButton);

	visualizePriority(todoCard, todo.priority);

	return todoCard;
}

function createCard() {
	const todoCard = document.createElement('div');
	todoCard.setAttribute('tabindex', '0');
	todoCard.className = 'todoCard';

	return todoCard;
}

function createRemoveButton() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodo';
	// cancelButton.textContent = 'x';

	return cancelButton;
}

function createCheckBox() {
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheck';

	return checkBox;
}

function createTitle(todo) {
	const title = document.createElement('p');
	title.textContent = todo.title ? todo.title : 'New Task ...';
	title.className = 'todoTitle';

	return title;
}

function createDueDate(todo) {
	const dueDate = document.createElement('p');
	dueDate.className = 'todoDate';
	dueDate.textContent = todo.dueDate ? selectDateName(todo.dueDate) : '';

	return dueDate;
}

function selectDateName(dueDate) {
	const dateToCheck = new Date(dueDate);

	if (isToday(dateToCheck)) return 'Today';
	if (isTomorrow(dateToCheck)) return 'Tomorrow';

	const formattedDate = format(dateToCheck, 'dd MMM');
	if (isThisYear(dateToCheck)) return formattedDate;

	return dueDate;
}
