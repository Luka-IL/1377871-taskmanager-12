import AbstractView from "./abstract.js";


const createFilterTask = (filter, isChecked) => {
  const {name, count} = filter;
  return `<input
            type="radio"
            id="filter__${name}"
            class="filter__input visually-hidden"
            name="filter"
            ${isChecked ? `checked` : ``}
            ${count === 0 ? `disabled` : ``}
          />
          <label for="filter__${name}" class="filter__label">
      ${name} <span class="filter__${name}-count">${count}</span></label>`;
};

const createFilterTasks = (filterItems) => {
  const filterItemsTemplate = filterItems
    .map((filter, index) => createFilterTask(filter, index === 0))
    .join(``);

  return `<section class="main__filter filter container">${filterItemsTemplate}</section>`;
};

export default class Filter extends AbstractView {
  constructor(filters) {
    super();
    this._filters = filters;
  }

  getTemplate() {
    return createFilterTasks(this._filters);
  }
}
