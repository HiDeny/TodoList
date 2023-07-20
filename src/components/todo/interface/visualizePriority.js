export default function visualizePriority(todo, card) {
	const priorityClassMap = {
		high: 'high',
		medium: 'medium',
		low: 'low',
		none: '',
	};
	card.classList.remove('high', 'medium', 'low');
	const priorityClass = priorityClassMap[todo.priority];
	if (priorityClass && priorityClass !== '') {
		card.classList.add(priorityClass);
	}
}