function addTodoList(todo, list) {
	list.todosArr.unshift(todo);

	return list;
}

function removeTodoList(todo, list) {
    list.todosArr.splice(todo, 1);
}

function moveTodoToDiffList(todo, orgList, newList) {
    // console.log(todo);
    // console.log(orgList.todosArr.length);
    // console.log(newList.todosArr.length);

    addTodoList(todo, newList);
    removeTodoList(todo, orgList)

    // console.log(orgList.todosArr.length);
    // console.log(newList.todosArr.length);
    

}

export { addTodoList, removeTodoList, moveTodoToDiffList };
