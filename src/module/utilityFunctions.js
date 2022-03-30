import Task from './Task';
import * as Elements from './constElements';

const displayContent = () => {
  Elements.taskList.innerHTML = '';
  Task.TaskObject.forEach((obj) => {
    Elements.taskList.innerHTML += `
      <div class="taskDynamic border-bottom  m-0 px-3 py-0 d-flex align-items-center justify-content-between" data-id=${obj.id}>
              <div class="form-check mb-0 d-flex align-items-center justify-content-start">
                <input class="checkBox form-check-input border" type="checkbox" value="" id="">
                <label class="form-check-label p-3 m-0" for="">
                  <span class="h5 m-0 p-0">${obj.description}</span>
                </label>
              </div>
              <button class="three-dots h5 btn m-0 icon">
                <i class="fa-solid fa-ellipsis-vertical"></i>
              </button>
              <button class="trash h5 btn m-0 icon hide">
                <i class="fa-solid fa-trash-can"></i>
              </button>
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

const removeTask = (element) => {
  Task.remove(element);
  reorderTaskObjectId(Task.TaskObject);
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  checkLocalStorage();
};

const reorderTaskObjectId = (obj) => {
  obj.forEach((item, index) => {
    item.id = index;
  });
};

export { Task, addTask, removeTask, checkLocalStorage };
