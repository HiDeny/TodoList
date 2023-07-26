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
	masterController.listsControl.customLists.forEach((option) => {
		const optionElement = new Option(option.title, option.id);
		optionElement.selected = option.id === selectedId ? true : false;
		div.append(optionElement);
	});
}

// Priority Selector
export function createPrioritySelector(
	withPlaceholder = true,
	currentPriority = false
) {
	// Div
	const prioritySelector = document.createElement('select');

	// Placeholder
	const placeholderPriority = new Option('Priority', '');
	placeholderPriority.className = 'placeholderPri';
	placeholderPriority.selected = withPlaceholder;
	placeholderPriority.disabled = true;
	placeholderPriority.hidden = true;
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

		if (currentPriority) {
			optionElement.selected = option.value === currentPriority ? true : false;
		}

		prioritySelector.append(optionElement);
	});

	return prioritySelector;
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
