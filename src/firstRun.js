import createList from './components/list/createList';
import displayList from './components/list/interface/displayList';

export default function firstSetup(masterListsArr) {
	const today = createList('🌤️ Today', "Todos with today's date");
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	const inbox = createList('📥 Inbox', 'Default list');

	masterListsArr.addList(today);
	masterListsArr.addList(upcoming);
	masterListsArr.addList(inbox);
}
