import {createSiteMenu} from './view/site-menu.js';
import {createTasksBoard} from './view/tasks-board';
import {createCardTask} from './view/card-task';
import {createCartEditTask} from './view/card-edit';
import {createFilterTasks} from './view/filter-tasks';
import {createButtonLoadMore} from './view/button-load';
import {generateTask} from "./mock/task.js";

const TASK_COUNT = 3;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, createSiteMenu(), `beforeend`);
render(main, createFilterTasks(), `beforeend`);
render(main, createTasksBoard(), `beforeend`);

const boardElement = main.querySelector(`.board`);
const taskListElement = main.querySelector(`.board__tasks`);

render(taskListElement, createCartEditTask(), `afterbegin`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createCardTask(tasks[i]), `beforeend`);
}

render(boardElement, createButtonLoadMore(), `beforeend`);
