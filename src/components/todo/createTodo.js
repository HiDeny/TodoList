export default function createTodo(title, desc, dueDate, priority, list, listIndex) {
	const done = false;

	return { title, desc, dueDate, list, listIndex, priority, done };
}
