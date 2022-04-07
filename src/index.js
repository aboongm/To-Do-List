import './styles/style.css';
import {
  Tasks,
  addTask,
  removeTask,
  displayContent,
} from './module/utilityFunctions.js';

import {
  refreshTask,
  taskInput,
  submitInput,
  taskList,
  clear,
} from './module/constElements.js';

import {
  updateCompleted,
  clearCompletedTasks,
  editTask,
} from './module/checkbox.js';

submitInput.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addTask();
  }
});

refreshTask.addEventListener('click', (e) => {
  e.preventDefault();
  Tasks.TaskObject = [];
  localStorage.setItem('TASKS_LIST', JSON.stringify(Tasks.TaskObject));
  displayContent();
});

taskList.addEventListener('click', (e) => {
  [...taskList.children].forEach((item, index) => {
    if (item.classList.contains('bg-yellow')) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }

    if (index === parseInt(e.target.getAttribute('data-id'), 10)) {
      item.children[1].classList.add('hide');
      item.children[2].classList.remove('hide');
      item.classList.add('bg-yellow');
    }

    const descriptionItem = item.children[0].children[1];
    const targetItem = e.target.parentElement.parentElement.parentElement;

    if (targetItem) {
      if (
        !targetItem.classList.contains('bg-yellow')
        && descriptionItem === e.target
      ) {
        item.children[1].classList.add('hide');
        item.children[2].classList.remove('hide');
        item.classList.add('bg-yellow');
        descriptionItem.classList.add('bg-yellow');
      }
    }
  });

  const checkboxes = document.querySelectorAll('.checkbox');
  checkboxes.forEach((box, index) => {
    box.addEventListener('change', () => {
      const checkStatus = box.checked;
      updateCompleted(index, checkStatus);
    });
  });

  const trash = document.querySelectorAll('.trash');
  trash.forEach((deleteBtn, trashInd) => {
    deleteBtn.addEventListener('click', (e1) => {
      e1.stopPropagation();
      const targetId = e1.target.parentElement;
      if (parseInt(targetId.getAttribute('data-id'), 10) === trashInd) {
        removeTask(e1.target.parentElement);
      }
    });
  });

  const taskDescription = document.querySelectorAll('.description');
  taskDescription.forEach((description, index) => {
    if (
      index
      === parseInt(
        description.parentElement.parentElement.getAttribute('data-id'),
        10,
      )
    ) {
      description.addEventListener('input', (e) => {
        editTask(e.target.value, index);
      });
    }
  });
});

document.addEventListener('click', (e) => {
  [...taskList.children].forEach((item) => {
    const isClickInsideTaskList = taskList.contains(e.target);
    if (!isClickInsideTaskList) {
      item.children[1].classList.remove('hide');
      item.children[2].classList.add('hide');
      item.classList.remove('bg-yellow');
    }
  });

  clear.addEventListener('click', () => {
    clearCompletedTasks();
    window.location.reload();
  });
});

document.addEventListener('DOMContentLoaded', displayContent);
