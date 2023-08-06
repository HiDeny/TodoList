import masterController from "../../../controllers/masterController";

export default function controlCustomListElement(
	list,
	deleteButton,
	title,
	description
) {
	// DeleteButton
	deleteButton.addEventListener('click', () => {
		const checkPrompt = `Do you want to delete ${list.title.toUpperCase()}?`;
		const deleteCheck = masterController.deleteCheck(checkPrompt);
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


}

