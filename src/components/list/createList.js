import createTodo from '../todo/createTodo';

export default function createList(title) {
	const todosArr = [];
	const completedTodos = [];


	return { title, todosArr, completedTodos };
}

//* Todo - Incomplete tasks
//* Complete - Complete tasks
