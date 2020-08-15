import AbstractView from "./abstract.js";


const createTasksBoard = () => {
  return `<div class="board__tasks"></div>`;
};

export default class TasksBoard extends AbstractView {
  getTemplate() {
    return createTasksBoard();
  }
}
