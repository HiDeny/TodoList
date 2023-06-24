import './style.css';
import 'normalize.css';


import createList from "./components/list/createList";
import displayList from "./components/list/displayList";
import { addTodoToList } from './components/list/updateList';

import createTodo from "./components/todo/createTodo";
import displayTodo from "./components/todo/displayTodo";

const inbox = createList('Inbox', 'default list');
const displayInbox = displayList(inbox);


const title = document.createElement('h1');
      title.textContent = 'TodoList';


function container() {
      const container = document.createElement('div');
      container.classList.add('container');

      return container;
}

const baseContainer = container() 

const taskTitle = document.createElement('input');
      taskTitle.setAttribute('id', 'taskTitleInput');
      taskTitle.setAttribute('type', 'text');
      taskTitle.setAttribute('placeholder', 'Title....');

const addButton = document.createElement('button');
      addButton.classList.add('addBtn');
      addButton.textContent = 'Add';
      addButton.addEventListener('click', () => {
            const newTodo = createTodo(taskTitle.value);
            addTodoToList(newTodo, inbox);
            console.log(newTodo);
            console.log(inbox);
            displayInbox.listUl.appendChild(displayTodo(newTodo));
            taskTitle.value = '';
      })


document.body.appendChild(title);

document.body.appendChild(baseContainer);

baseContainer.appendChild(taskTitle);
baseContainer.append(addButton);
baseContainer.appendChild(displayInbox.listDiv);
