import AbstractComponent from "./abstract-component.js";

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

export default class Filters extends AbstractComponent {
  constructor(filters, films) {
    super();

    this._filters = filters;
    this._films = films;
  }

  getTemplate() {
    return createFiltersTemplate(this._filters, this._films);
  }
}
