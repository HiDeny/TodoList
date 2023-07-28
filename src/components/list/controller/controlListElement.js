import { masterController } from '../../../masterController';

export default function controlListElement(
	list,
	deleteButton,
	title,
	description
) {
	// DeleteButton
	deleteButton.addEventListener('click', () => {
		const listTitle = list.title.toUpperCase();
		const deleteCheck = masterController.deleteCheck(listTitle);
		if (!deleteCheck) return;
		masterController.deleteList(list);
	});

	// Title
	title.addEventListener('input', (event) => {
		list.title = event.target.value;
		masterController.saveList(list);
	});

	// Description
	description.addEventListener('input', (event) => {
		list.description = event.target.value;
		masterController.saveList(list);
	});

	setTimeout(() => {
		if (!title.value) title.focus();
	}, 50);
}
