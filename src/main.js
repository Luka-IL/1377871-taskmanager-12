import SiteMenuView from "./view/site-menu.js";
import FilterView from './view/filter-tasks';
import FilterPresenter from "./presenter/filter.js";
import {generateTask} from "./mock/task.js";
import BoardPresenter from "./presenter/board.js";
import TasksModel from "./model/tasks.js";
import FilterModel from "./model/filter.js";
import {render, RenderPosition} from "./utils/render.js";


const TASK_COUNT = 18;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);

const tasksModel = new TasksModel();
tasksModel.setTasks(tasks);

const filterModel = new FilterModel();


const main = document.querySelector(`.main`);
const mainControl = main.querySelector(`.main__control`);

render(mainControl, new SiteMenuView(), RenderPosition.BEFOREEND);
const boardPresenter = new BoardPresenter(main, tasksModel, filterModel);
const filterPresenter = new FilterPresenter(main, filterModel, tasksModel);

filterPresenter.init();
boardPresenter.init();

document.querySelector(`#control__new-task`).addEventListener(`click`, (evt) => {
  evt.preventDefault();
  boardPresenter.createTask();
});