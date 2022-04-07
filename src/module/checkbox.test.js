/**
 * @jest-environment jsdom
 */

import Task from './Task.js';
import { displayContent } from './utilityFunctions.js';

const Tasks = new Task();

describe('Test completed, clearCompletedTask and editTask methods', () => {
  window.localStorage = Storage.prototype;

  // mock updatedCompleted function
  const updateCompleted = (index, checkStatus) => {
    Tasks.TaskObject[index].completed = checkStatus;
    localStorage.setItem('TASKS_LIST', JSON.stringify(Tasks.TaskObject));
  };

  // mock editTask function
  const editTask = (value, index) => {
    Tasks.TaskObject[index].description = value;
    localStorage.setItem('TASKS_LIST', JSON.stringify(Tasks.TaskObject));
  };

  // mock DOM
  document.body.innerHTML = `
        <div id="taskList" class="h5 p-0 m-0">
            <div class="taskDynamic border-bottom  m-0 px-3 py-0 d-flex align-items-center justify-content-between" data-id=1>
                <div class="form-check mb-0 d-flex align-items-center justify-content-start">
                    <input class="form-check-input border checkbox1" type="checkbox" value="" id="flexCheckDefault" >
                    <input type='text' class="description1 h5 m-0 p-3" value="task1"></input>
                </div>
                <button class="three-dots h5 btn m-0 icon">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <i class="trash fa-solid fa-trash-can hide"></i>
            </div>
            <div class="taskDynamic border-bottom  m-0 px-3 py-0 d-flex align-items-center justify-content-between" data-id=1>
                <div class="form-check mb-0 d-flex align-items-center justify-content-start">
                    <input class="form-check-input border checkbox2" type="checkbox" checked value="" id="flexCheckDefault" >
                    <input type='text' class="description2 h5 m-0 p-3" value="task2" ></input>
                </div>
                <button class="three-dots h5 btn m-0 icon">
                    <i class="fa-solid fa-ellipsis-vertical"></i>
                </button>
                <i class="trash fa-solid fa-trash-can hide"></i>
            </div>
        </div>
        <button
        type="button"
        id="clear-completed"
        class="clear-completed w-100 bg-grey m-0 p-3 h5 text-muted fw-normal border-0"
        onClick={mockCallBack}
        >
            Clear all completed
        </button>
    `;

  const taskInput1 = document.querySelector('.description1');
  const taskInput2 = document.querySelector('.description2');

  const box1 = document.querySelector('.checkbox1');
  const box2 = document.querySelector('.checkbox2');

  // const clear = document.querySelector('#clear-completed');

  test('add 2 tasks', () => {
    // adding tasks - task1 and task2
    Tasks.add(taskInput1);
    Tasks.add(taskInput2);
    document.body.innerHTML = `
    <div id="taskList" class="h5 p-0 m-0"></div>
    `;
    displayContent();
    expect(Tasks.TaskObject).toHaveLength(2);
  });

  test('update the completed task', () => {
    // setting task1's and task2's completed property to false
    Tasks.TaskObject[0].completed = false;
    Tasks.TaskObject[1].completed = false;

    // update task 1 as completed/checked with function call
    updateCompleted(1, true);
    expect(Tasks.TaskObject[0].completed).toBe(box1.checked);
    expect(Tasks.TaskObject[1].completed).toBe(box2.checked);
  });

  test('test edit task function', () => {
    // mocked value
    const value = 'task 2 edited';
    // edit task1 with function call
    editTask(value, 1);
  });
});
