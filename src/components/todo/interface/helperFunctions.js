import { masterListsArr } from '../../../masterController';

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
	const inbox = masterListsArr.defaultLists[2];
	div.append(new Option(inbox.title, inbox.id));
}

function populateListSelector(div, selectedId) {
	masterListsArr.customLists.forEach((option) => {
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

	// const withPlaceholder = !todo.priority ? true : false;
	//* Card
	// placeholderPriority.selected = !todo.priority ? true : false;
	//* Form
	// placeholderPriority.selected = true;
	//* Solution

	// Options
	const priorityOptions = [
		{ value: 'high', text: 'High' },
		{ value: 'medium', text: 'Medium' },
		{ value: 'low', text: 'Low' },
		{ value: '', text: 'None' },
	];

	// Append Options

	priorityOptions.forEach((option) => {
		const optionElement = new Option(option.text, option.value);

		//* Card

		// optionElement.selected = option.value === todo.priority ? true : false;
		if (currentPriority) {
			optionElement.selected = option.value === currentPriority ? true : false;
		}

		prioritySelector.append(optionElement);
	});

	return prioritySelector;
}

// Display Priority
export function visualizePriority(priority = '', card) {
	const priorityValue = priority.toLowerCase();
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
		none: '',
	};
	card.classList.remove('high', 'medium', 'low');
	const priorityClass = priorityClassMap[priorityValue];
	if (priorityClass && priorityClass !== '') {
		card.classList.add(priorityClass);
	}
}
