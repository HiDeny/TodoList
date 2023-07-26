import createList from './components/list/createList';

export function setupDefaultLists(listsControl) {
	const today = createList('🌤️ Today', "Todos with today's date");
	today.id = 0;
	const upcoming = createList('📆 Upcoming', 'Todos with future dates');
	upcoming.id = 1;
	const inbox = createList('📥 Inbox', 'Default list');
	inbox.id = 2;

	listsControl.addDefaultList(inbox);
	listsControl.addDefaultList(today);
	listsControl.addDefaultList(upcoming);
}
