import controlEditCard from '../controller/controlEditCard.js';
import {
	createListSelector as listSelector,
	createPrioritySelector as prioritySelector,
	visualizePriority,
} from './helperFunctions.js';

export default function displayEditCard(todo, masterListsArr) {
	const todoCardEdit = createTodoCardEdit(todo);

	const cancelButton = createCancelButton();
	todoCardEdit.append(cancelButton);

	const checkBox = createCheckBox(todo);
	todoCardEdit.append(checkBox);
	if (todo.done) {
		checkBox.setAttribute('checked', true);
		todoCardEdit.classList.add('done');
	}

	const editTitle = createTitle(todo);
	todoCardEdit.append(editTitle);

	const editNotes = createNotes(todo);
	todoCardEdit.append(editNotes);

	const editDate = createDueDate(todo);
	todoCardEdit.append(editDate);

	const editList = createListSelector(todo, masterListsArr);
	todoCardEdit.append(editList);

	const editPriority = createPrioritySelector(todo, todoCardEdit);
	todoCardEdit.append(editPriority);

	setTimeout(() => {
		controlEditCard(todo, todoCardEdit);
	}, 50);

	return todoCardEdit;
}

function createTodoCardEdit(todo) {
	const todoCardEdit = document.createElement('div');
	todoCardEdit.setAttribute('tabindex', '1');
	todoCardEdit.className = 'editCard';

	visualizePriority(todoCardEdit, todo.priority);

	return todoCardEdit;
}

function createCancelButton() {
	const cancelButton = document.createElement('button');
	cancelButton.classList = 'deleteTodoEdit';
	cancelButton.textContent = 'x';

	return cancelButton;
}

function createCheckBox(todo) {
	const checkBox = document.createElement('input');
	checkBox.setAttribute('type', 'checkbox');
	checkBox.className = 'todoCheckEdit';

	return checkBox;
}

function createTitle(todo) {
	const editTitle = document.createElement('input');
	editTitle.className = 'todoTitleEdit';
	editTitle.setAttribute('type', 'text');
	editTitle.setAttribute('placeholder', 'New Task ...');
	editTitle.value = todo.title;

	return editTitle;
}

function createNotes(todo) {
	const editNotes = document.createElement('textarea');
	editNotes.className = 'todoNotesEdit';
	editNotes.textContent = todo.notes;
	editNotes.setAttribute('placeholder', 'Notes');

	return editNotes;
}

function createDueDate(todo) {
	const editDate = document.createElement('input');
	editDate.className = 'todoDueDateEdit';
	editDate.setAttribute('type', 'text');
	editDate.setAttribute('placeholder', 'Date');
	editDate.value = todo.dueDate;
	flatpickr(editDate, {
		minDate: 'today',
		dateFormat: 'j M Y',
	});

	return editDate;
}

function createListSelector(todo) {
	const editList = listSelector(todo.listId);
	editList.className = 'todoListEdit';

	return editList;
}

function createPrioritySelector(todo) {
	const editPriority = prioritySelector(!todo.priority, todo.priority);
	editPriority.className = 'todoPriorityEdit';

	return editPriority;
}

// function createListSelector(todo, masterListsArr) {
// 	const editList = document.createElement('select');
// 	editList.className = 'todoListEdit';
// 	const inbox = createInboxOption(masterListsArr);
// 	editList.append(inbox);

// 	masterListsArr.customLists.forEach((option) => {
// 		const optionElement = new Option(option.title, option.id);
// 		optionElement.selected = option.id === todo.listId ? true : false;
// 		editList.append(optionElement);
// 	});

// 	return editList;
// }

// function createInboxOption(masterListsArr) {
// 	const inbox = masterListsArr.defaultLists[2];
// 	const inboxOption = new Option(inbox.title, inbox.id);
// 	return inboxOption;
// }

// function createPrioritySelector(todo) {
// 	const editPriority = document.createElement('select');
// 	editPriority.className = 'todoPriorityEdit';

// 	const priorityOptions = [
// 		{ value: 'high', text: 'High' },
// 		{ value: 'medium', text: 'Medium' },
// 		{ value: 'low', text: 'Low' },
// 		{ value: '', text: 'None' },
// 	];

// 	priorityOptions.forEach((option) => {
// 		const optionElement = new Option(option.text, option.value);
// 		optionElement.selected = option.value === todo.priority ? true : false;
// 		editPriority.append(optionElement);
// 	});

// 	const placeholderPriority = new Option('Priority', '');
// 	placeholderPriority.className = 'placeholderPri';
// 	placeholderPriority.selected = !todo.priority ? true : false;
// 	placeholderPriority.disabled = true;
// 	placeholderPriority.hidden = true;
// 	editPriority.append(placeholderPriority);

// 	return editPriority;
// }
