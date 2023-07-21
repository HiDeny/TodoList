import createForm from '../../todo/interface/displayForm';
import allListsController from '../../list/controller/controlAllLists';
import createList from '../../list/createList';

export const masterListsArr = allListsController();

const today = createList('🌤️ Today', "Todos with today's date");
const upcoming = createList('📆 Upcoming', 'Todos with future dates');
const inbox = createList('📥 Inbox', 'Default list');

masterListsArr.addList(today);
masterListsArr.addList(upcoming);
masterListsArr.addList(inbox);

export default function generalController() {
	const addTodoBtn = document.querySelector('.addTodoBtn');
	console.log(addTodoBtn);
	addTodoBtn.addEventListener('click', requestForm);
}

function requestForm() {
	const container = document.querySelector('div.container');
	const activeForm = document.querySelector('#todoForm');

	if (!activeForm) {
		const newTaskForm = createForm(masterListsArr);
		container.appendChild(newTaskForm);
		const titleInput = newTaskForm.querySelector('input[name="formTitle"]');
		titleInput.focus();
	}

	// function formReturn(newTodo) {
	// 	addTodo(newTodo);
	// }
}

// Refresh Screen
// Show new list
// Screen controller?
function refreshSubList(todo) {
	const visibleList = document.querySelector('.list');

	const nextStep = refreshConditions(visibleList, todo);

	if (!nextStep) return;

	const subList = nextStep;
	const sortedList = sortList(subList);

	const listClass = !todo.done ? 'activeTodos' : 'completedTodos';
	const newVisual = document.createElement('ul');
	newVisual.className = listClass;

	sortedList.forEach((todo) => {
		newVisual.appendChild(displayTodoCard(todo));
	});

	const oldUl = document.querySelector(`.${listClass}`);
	oldUl.replaceWith(newVisual);
}

function checkSubList(list) {
	if (list.activeTodos.length > 0) refreshSubList(list.activeTodos[0]);
	if (list.completedTodos.length > 0) refreshSubList(list.completedTodos[0]);
}

function refreshConditions(visibleList, todo) {
	if (visibleList.id < 2) {
		if (Number(todo.dateList) !== Number(visibleList.id)) return;
		return findDateList(todo).subList;
	}

	if (Number(todo.listId) !== Number(visibleList.id)) return;
	return findList(todo).subList;
}

// updateCustomList(list);
// refreshSideLists();

function refreshDisplay(list) {
	// replaceOldList(list);
	// focusTitle();
	// checkSubList(list);
}

function replaceOldList(list) {
	const visibleList = document.querySelector('.list');
	if (Number(visibleList.id) === list.id) return;

	const newList = displayList(list);
	visibleList.replaceWith(newList);
}

function refreshSideLists() {
	const currentLists = document.querySelector('.customLists');
	currentLists.replaceWith(createCustomLists(customListsArr));
}

function toggleSidebar() {
	const sidebar = document.querySelector('.sidebar');

	if (sidebar.classList.contains('showSidebar')) {
		sidebar.classList.remove('showSidebar');
	} else {
		sidebar.classList.add('showSidebar');
	}
}

function sidebarButtonHandleClick(list) {
	refreshList(list);
}

// hamburger
// menuButton.addEventListener('click', sidebarComponent.toggleSidebar);
