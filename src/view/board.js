import {createElement} from "../utils.js";


const createBoard = () => {
  return `<section class="board container"></section>`;
};

export default class Board {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBoard();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
