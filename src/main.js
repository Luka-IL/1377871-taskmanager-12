import {createSiteMenu} from './view/site-menu.js';
import {createTasksBoard} from './view/tasks-board';
import {createCardTask} from './view/card-task';
import {createCartEditTask} from './view/card-edit';
import {createFilterTasks} from './view/filter-tasks';
import {createButtonLoadMore} from './view/button-load';
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, createSiteMenu(), `beforeend`);
render(main, createFilterTasks(filters), `beforeend`);
render(main, createTasksBoard(), `beforeend`);

const boardElement = main.querySelector(`.board`);
const taskListElement = main.querySelector(`.board__tasks`);

render(taskListElement, createCartEditTask(tasks[0]), `afterbegin`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListElement, createCardTask(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createButtonLoadMore(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListElement, createCardTask(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
