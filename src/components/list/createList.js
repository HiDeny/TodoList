import createTodo from '../todo/createTodo';

export default function createList(title, desc) {
	const todosArr = [];

	return { title, desc, todosArr };
}

const test1 = createTodo('test1');
const test2 = createTodo('test2');
const test3 = createTodo('test3');
const test4 = createTodo('test4');

//* Todo - Incomplete tasks
//* Complete - Complete tasks
