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
  Task.TaskObject = [];
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  checkLocalStorage();
});

Elements.taskList.addEventListener('click', (e) => {
  console.log(e.target.getAttribute('data-id'));

  const taskDynamic = document.querySelectorAll('.taskDynamic');
  // console.log(typeof e.target.getAttribute('data-id'));
  [...taskDynamic].forEach((item, index) => {
    if (item.classList.contains('bg-yellow')) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
    if (index === parseInt(e.target.getAttribute('data-id'))) {
      item.children[1].classList.add('hide');
      item.children[2].classList.remove('hide');
      item.classList.add('bg-yellow');
      // console.log(item.children[2]);
      item.children[2].addEventListener('click', (e) => {
        // console.log(item.children[2].children[0]);
        // console.log(e.target);
        if (item.children[2].children[0] === e.target) {
          removeTask(e.target.parentElement.parentElement);
        } else {
          removeTask(e.target.parentElement);
        }
      });
    }
  });
});

document.addEventListener('DOMContentLoaded', checkLocalStorage);
