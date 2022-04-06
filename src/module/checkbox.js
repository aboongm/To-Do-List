import Task from './Task.js';
import { reorderTaskObjectId } from './utilityFunctions.js';

const completed = (index, checkStatus) => {
  Task.TaskObject[index].completed = checkStatus;
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
};

const clearCompletedTasks = (target) => {
  if (target) {
    const notCompletedTasks = Task.TaskObject.filter(
      (item) => item.completed === false,
    );
    Task.TaskObject = notCompletedTasks;
    reorderTaskObjectId(Task.TaskObject);
    localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
  }
};

const editTask = (value, index) => {
  Task.TaskObject[index].description = value;
  localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
};

export { completed, clearCompletedTasks, editTask };
