/**
 * @jest-environment jsdom
 */

import Task from './Task.js';
import { displayContent } from './utilityFunctions.js';

const Tasks = new Task();

describe('Test add and displayContent method, and local storage', () => {
  window.localStorage = Storage.prototype;

  test('Add task', () => {
    Tasks.add('Test');
    document.body.innerHTML = `
    <div id="taskList" class="h5 p-0 m-0"></div>
    `;
    displayContent();
    expect(Tasks.TaskObject).toHaveLength(1);
  });

  test('test for local storage', () => {
    JSON.parse(localStorage.getItem('TASKS_LIST'));
    expect(localStorage).toHaveLength(1);
  });
});
