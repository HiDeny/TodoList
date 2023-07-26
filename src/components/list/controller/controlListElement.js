import { masterController } from '../../../masterController';

export default function handleCustomDisplayList(
	list,
	deleteButton,
	title,
	description
) {
	// DeleteButton
	deleteButton.addEventListener('click', () => {
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
}
