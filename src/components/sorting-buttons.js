import AbstractComponent from "./abstract-component.js";

const SortButtonCls = {
  DEFAULT: `sort__button`,
  ACTIVE: `sort__button--active`,
};

const SortType = {
  DEFAULT: `default`,
  DATE: `date`,
  RATING: `rating`,
};

const createSortingButtonsTemplate = () => {
  return (
    `<ul class="sort">
      <li><a href="#" data-sort-type=${SortType.DEFAULT} class="${SortButtonCls.DEFAULT} ${SortButtonCls.ACTIVE}">Sort by default</a></li>
      <li><a href="#" data-sort-type=${SortType.DATE} class="${SortButtonCls.DEFAULT}">Sort by date</a></li>
      <li><a href="#" data-sort-type=${SortType.RATING} class="${SortButtonCls.DEFAULT}">Sort by rating</a></li>
    </ul>`
  );
};

export default class SortingButtons extends AbstractComponent {
  constructor() {
    super();

    this._currentSortType = SortType.DEFAULT;
  }

  getTemplate() {
    return createSortingButtonsTemplate();
  }

  getSortType() {
    return this._currentSortType;
  }

  setSortTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const sortType = evt.target.dataset.sortType;

      if (this._currentSortType === sortType) {
        return;
      }

      this._currentSortType = sortType;
      this.getElement().querySelector(`.${SortButtonCls.ACTIVE}`).classList.remove(SortButtonCls.ACTIVE);
      evt.target.classList.add(SortButtonCls.ACTIVE);

      handler(this._currentSortType);
    });
  }
}

export {SortType};
