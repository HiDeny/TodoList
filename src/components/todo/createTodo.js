export default function createTodo(
	title,
	notes,
	dueDate,
	priority,
	list,
	listIndex
) {
	const done = false;

	return { title, notes, dueDate, priority, list, listIndex, done };
}


