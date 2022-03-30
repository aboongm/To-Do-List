import './styles/style.css';

import { Task, addTask, removeTask, checkLocalStorage } from './module/utilityFunctions.js';
import * as Elements from './module/constElements.js';

Elements.submitInput.addEventListener('click', addTask);

Elements.taskInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

Elements.refreshTask.addEventListener('click', (e) => {
  e.preventDefault();
  Task.TaskObject = [];
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  checkLocalStorage();
});

Elements.taskList.addEventListener('click', (e) => {
  e.preventDefault();

  [...Elements.taskList.children].forEach((item, index) => {
    if (item.classList.contains('bg-yellow')) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
    if (index === parseInt(e.target.getAttribute('data-id'))) {
      item.children[1].classList.add('hide');
      item.children[2].classList.remove('hide');
      item.classList.add('bg-yellow');
      item.children[2].addEventListener('click', (e) => {
        e.preventDefault();
        if (item.children[2].children[0] === e.target) {
          removeTask(e.target.parentElement.parentElement);
        } else {
          removeTask(e.target.parentElement);
        }
      });
    }

    if (
      item.children[0].children[1].children[0] === e.target &&
      !e.target.parentElement.parentElement.parentElement.classList.contains('bg-yellow')
    ) {
      item.children[1].classList.add('hide');
      item.children[2].classList.remove('hide');
      item.classList.add('bg-yellow');
    }
  });

  const taskItem = e.target.parentElement.parentElement.parentElement;
  let editDescription = e.target.innerText;
  Task.TaskObject.forEach((obj) => {
    if (obj.id === parseInt(taskItem.getAttribute('data-id'))) {
      obj.description = editDescription;
    }
    localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  });
});

document.addEventListener('click', (e) => {
  e.preventDefault();
  [...Elements.taskList.children].forEach((item, index) => {
    const isClickInsideTaskList = taskList.contains(e.target);
    if (!isClickInsideTaskList) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
  });
});

document.addEventListener('DOMContentLoaded', checkLocalStorage);
