import createTodo from "../todo/createTodo";

export default function createList(name, desc) {
	const todosArr = [
		test1,
		test2,
		test3,
		test4
	];

	return { name, desc, todosArr };
}

const test1 = createTodo('test1');
const test2 = createTodo('test2');
const test3 = createTodo('test3');
const test4 = createTodo('test4');


//* Todo - Incomplete tasks 
//* Complete - Complete tasks 