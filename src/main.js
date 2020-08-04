import {createSiteMenu} from './view/site-menu.js';
import {createTasksBoard} from './view/tasks-board';
import {createCardTask} from './view/card-task';
import {createCartEditTask} from './view/card-edit';
import {createFilterTasks} from './view/filter-tasks';
import {createButtonLoadMore} from './view/button-load';

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
render(taskListElement, createCardTask(), `beforeend`);
render(taskListElement, createCardTask(), `beforeend`);
render(taskListElement, createCardTask(), `beforeend`);
render(boardElement, createButtonLoadMore(), `beforeend`);
