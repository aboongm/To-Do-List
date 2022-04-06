import Task from './Task.js';
import * as Elements from './constElements.js';

const displayContent = () => {
  Elements.taskList.innerHTML = '';
  Task.TaskObject.forEach((obj) => {
    Elements.taskList.innerHTML += `
      <div class="taskDynamic border-bottom  m-0 px-3 py-0 d-flex align-items-center justify-content-between" data-id=${obj.id}>
              <div class="form-check mb-0 d-flex align-items-center justify-content-start">
                <input class="form-check-input border checkbox" type="checkbox" value="" id="flexCheckDefault" >
                <input type='text' class="description h5 m-0 p-3" value="${obj.description}"></input>
              </div>
              <button class="three-dots h5 btn m-0 icon">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <i class="trash fa-solid fa-trash-can hide"></i>              
            </div>
      `;
  });
};

const checkLocalStorage = () => {
  if (JSON.parse(localStorage.getItem('TASKS_LIST')) != null) {
    Task.TaskObject = JSON.parse(localStorage.getItem('TASKS_LIST'));
    displayContent();
  }
};

const addTask = () => {
  Task.add(Elements.taskInput);
  checkLocalStorage();
};

const reorderTaskObjectId = (obj) => {
  obj.forEach((item, index) => {
    item.id = index;
  });
};

const removeTask = (element) => {
  const i = parseInt(element.getAttribute('data-id'), 10);
  if (element.classList.contains('taskDynamic')) {
    element.remove();
    Task.remove(i);
    reorderTaskObjectId(Task.TaskObject);
    localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
    checkLocalStorage();
  }
};
export {
  Task,
  displayContent,
  addTask,
  reorderTaskObjectId,
  removeTask,
  checkLocalStorage,
};
