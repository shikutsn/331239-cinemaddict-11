import {createElement} from "../utils.js";

const createFilterMarkup = (filter, films) => {
  const {caption, hasCounter, link, isActive, action} = filter;
  const counterMarkup = hasCounter ? ` <span class="main-navigation__item-count">${action(films)}</span>` : ``;

  return `<a href="${link}" class="main-navigation__item ${isActive ? `main-navigation__item--active` : ``}">${caption}${counterMarkup}</a>`;
};

const createFiltersMarkup = (filters, films) => {
  let targetMarkup = ``;

  for (const filterKey in filters) {
    if (filters.hasOwnProperty(filterKey)) {
      targetMarkup = targetMarkup + createFilterMarkup(filters[filterKey], films);
    }
  }
  return targetMarkup;
};

const createFiltersTemplate = (filters, films) => {
  const filtersMarkup = createFiltersMarkup(filters, films);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filters {
  constructor(filters, films) {
    this._filters = filters;
    this._films = films;

    this._element = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._films);
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
