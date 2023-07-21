// export default function handleDisplayList(list, masterListsController) {
// 	const updatedList = { ...list };

// 	(() => {
// 		const deleteButton = document.querySelector('#deleteListButton');

// 		deleteButton.addEventListener('click', () => {
// 			const check = confirm(
// 				`Do you really want to delete ${list.title.toUpperCase()}?`
// 			);
// 			if (check) {
// 				masterListsController.deleteList(list, check);
// 			}
// 		});
// 	})();

// 	(() => {
// 		const descriptionList = document.querySelector('.customDescription');

// 		descriptionList.addEventListener('input', (event) => {
// 			updatedList.description = event.target.value;
// 			// Master List?
// 			masterListsController.updateList(updatedList);
// 		});
// 	})();

// 	(() => {
// 		const titleList = document.querySelector('.customTitle');

// 		titleList.addEventListener('input', (event) => {
// 			updatedList.title = event.target.value;
// 			// Master List?
// 			masterListsController.updateList(updatedList);
// 		});
// 	})();

// 	(() => {
// 		const titleName = document.querySelector('.customTitle');
// 		const titleValue = titleName ? titleName.value : null;
// 		if (titleValue === '') titleName.focus();
// 	})();

// 	(() => {
// 		const titleList = document.querySelector('.customTitle');

// 		titleList.addEventListener('input', (event) => {
// 			updatedList.title = event.target.value;
// 			// Master List?
// 			masterListsController.updateList(updatedList);
// 		});
// 	})();
// }
