import Task from './Task.js';
import { checkLocalStorage } from './utilityFunctions.js';

const completed = (item) => {
  const completedId = parseInt(item.getAttribute('data-id'), 10);
  let isChecked = item.children[0].children[0].checked;
  Task.TaskObject[completedId].completed = isChecked;
  isChecked = Task.TaskObject[completedId].completed;
};

export { completed };
