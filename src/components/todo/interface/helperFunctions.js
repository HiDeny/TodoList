import { masterController } from '../../../masterController';

// List Selector
// selectedId - displayed List ID / todo List ID
export function createListSelector(selectedId = 2) {
	// Div
	const listSelector = document.createElement('select');

	createInboxOption(listSelector);
	populateListSelector(listSelector, selectedId);

	return listSelector;
}

function createInboxOption(div) {
	const inbox = masterController.inbox;
	div.append(new Option(inbox.title, inbox.id));
}

function populateListSelector(div, selectedId) {
	const customLists = masterController.listsControl.customLists;

	customLists.forEach((option) => {
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === selectedId ? true : false;
		div.append(optionElement);
	});
}

// Priority Selector
export function createPrioritySelector(currentPriority) {
	// Div
	const prioritySelector = document.createElement('select');

	// Placeholder
	const withPlaceholder = currentPriority === 'none' || !currentPriority;
	const placeholderPriority = createPriorityPlaceholder(withPlaceholder);
	prioritySelector.append(placeholderPriority);

	// Options
	const priorityOptions = [
		{ text: 'High', value: 'high' },
		{ text: 'Medium', value: 'medium' },
		{ text: 'Low', value: 'low' },
		{ text: 'None', value: 'none' },
	];

	// Append Options
	priorityOptions.forEach((option) => {
		const optionElement = new Option(option.text, option.value);
		if (!withPlaceholder) {
			const isSelected = option.value === currentPriority;
			optionElement.selected = isSelected;
		}
		prioritySelector.append(optionElement);
	});

	return prioritySelector;
}

function createPriorityPlaceholder(withPlaceholder) {
	const placeholderPriority = new Option('Priority', 'none');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.selected = withPlaceholder;
	placeholderPriority.disabled = true;

	return placeholderPriority;
}

// Display Priority
export function visualizePriority(card, priority = 'none') {
	const priorityValue = priority.toLowerCase();
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
		none: 'none',
	};
	card.classList.remove('high', 'medium', 'low', 'none');
	const priorityClass = priorityClassMap[priorityValue];
	if (priorityClass && priorityClass !== '') {
		card.classList.add(priorityClass);
	}
}

// export function createDarkBackground() {
// 	const darkBackground = document.createElement('div');
// 	darkBackground.className = 'modal';
// 	return darkBackground;
// }
