import AbstractView from "./abstract.js";


const createBoard = () => {
  return `<section class="board container"></section>`;
};

export default class Board extends AbstractView {
  getTemplate() {
    return createBoard();
  }
}
