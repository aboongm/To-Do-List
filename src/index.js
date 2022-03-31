import './styles/style.css';
import {
  Task,
  addTask,
  reorderTaskObjectId,
  removeTask,
  checkLocalStorage,
  editTask,
  displayContent,
} from './module/utilityFunctions.js';
import * as Elements from './module/constElements.js';
import { completed } from './module/checkbox.js';

// add task from submit
Elements.submitInput.addEventListener('click', addTask);

// add task by pressing Enter Key
Elements.taskInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

// clear all task
Elements.refreshTask.addEventListener('click', (e) => {
  e.preventDefault();
  Task.TaskObject = [];
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  checkLocalStorage();
});

// tasklist functionalities
Elements.taskList.addEventListener('click', (e) => {
  e.stopPropagation();

  [...Elements.taskList.children].forEach((item, index) => {
    // all tasks to default ui
    if (item.classList.contains('bg-yellow')) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
    // selected task applied styles
    if (index === parseInt(e.target.getAttribute('data-id'), 10)) {
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

    // click on description applies styles on the task ui
    const descriptionItem = item.children[0].children[1].children[0];
    const targetItem = e.target.parentElement.parentElement.parentElement;

    if (
      !targetItem.classList.contains('bg-yellow') &&
      descriptionItem === e.target
    ) {
      item.children[1].classList.add('hide');
      item.children[2].classList.remove('hide');
      item.classList.add('bg-yellow');
    }

    // update the check checkbox to local storage
    completed(item);
  });

  editTask(e.target);
});

document.addEventListener('click', (e) => {
  [...Elements.taskList.children].forEach((item) => {
    const isClickInsideTaskList = Elements.taskList.contains(e.target);
    if (!isClickInsideTaskList) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
  });

  // clear all checked checkboxes
  if (e.target) {
    let notCompletedTasks = Task.TaskObject.filter((item, index) => {
      return item.completed === false;
    });

    Task.TaskObject = notCompletedTasks;
    reorderTaskObjectId(Task.TaskObject);
    localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
    displayContent();
  }
});

document.addEventListener('DOMContentLoaded', checkLocalStorage);
