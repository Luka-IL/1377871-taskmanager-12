import TaskView from "../view/task.js";
import TaskEditView from "../view/task-edit.js";
import {render, RenderPosition, replace, remove} from "../utils/render.js";

export default class Task {
  constructor(taskListContainer) {
    this._taskListContainer = taskListContainer;

    this._taskComponent = null;
    this._taskEditComponent = null;

    this._editClickHandler = this._editClickHandler.bind(this);
    this._formSubmitHandler = this._formSubmitHandler.bind(this);
    this._onEscKeyDown = this._onEscKeyDown.bind(this);
  }

  init(task) {
    this._task = task;

    const prevTaskComponent = this._taskComponent;
    const prevTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new TaskView(task);
    this._taskEditComponent = new TaskEditView(task);

    this._taskComponent.setEditClickHandler(this._editClickHandler);
    this._taskEditComponent.setFormSubmitHandler(this._formSubmitHandler);

    if (prevTaskComponent === null || prevTaskEditComponent === null) {
      render(this._taskListContainer, this._taskComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this._taskListContainer.getElement().contains(prevTaskComponent.getElement())) {
      replace(this._taskComponent, prevTaskComponent);
    }

    if (this._taskListContainer.getElement().contains(prevTaskEditComponent.getElement())) {
      replace(this._taskEditComponent, prevTaskEditComponent);
    }

    remove(prevTaskComponent);
    remove(prevTaskEditComponent);
  }

  destroy() {
    remove(this._taskComponent);
    remove(this._taskEditComponent);
  }

  _replaceCardToForm() {
    replace(this._taskEditComponent, this._taskComponent);
  }

  _replaceFormToCard() {
    replace(this._taskComponent, this._taskEditComponent);
  }

  _onEscKeyDown(evt) {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      this._replaceFormToCard();
      document.removeEventListener(`keydown`, this._onEscKeyDown);
    }
  }

  _editClickHandler() {
    this._replaceCardToForm();
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _formSubmitHandler() {
    this._replaceFormToCard();
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }
}
