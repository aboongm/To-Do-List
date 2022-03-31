import Task from './Task.js';

const completed = (item) => {
  const completedId = parseInt(item.getAttribute('data-id'), 10);
  let isChecked = item.children[0].children[0].checked;
  Task.TaskObject[completedId].completed = isChecked;
  isChecked = Task.TaskObject[completedId].completed;
};

const completedTasks = (target) => {
  if (target) {
    let notCompletedTasks = Task.TaskObject.filter((item, index) => {
      return item.completed === false;
    });

    Task.TaskObject = notCompletedTasks;
    reorderTaskObjectId(Task.TaskObject);
    localStorage.setItem('TASKS_LIST', JSON.stringify(Task.TaskObject));
    displayContent();
  }
};

export { completed };
