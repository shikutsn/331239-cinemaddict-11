import AbstractSmartComponent from "./abstract-smart-component.js";

const FilterButtonCls = {
  DEFAULT: ``,
  ACTIVE: `main-navigation__item--active`,
};

const FiltersData = {
  "ALL_MOVIES": {
    DATA_TAG: `all-movies`,
    CAPTION: `All movies`,
    HAS_COUNTER: false,
    LINK: `#all`,
    IS_ACTIVE: true,
    ACTION: (films) => films,
  },
  "WATCHLIST": {
    DATA_TAG: `watchlisted`,
    CAPTION: `Watchlist`,
    HAS_COUNTER: true,
    LINK: `#watchlist`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isWatchlisted ? total + 1 : total, 0),
  },
  "HISTORY": {
    DATA_TAG: `watched`,
    CAPTION: `History`,
    HAS_COUNTER: true,
    LINK: `#history`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isWatched ? total + 1 : total, 0),
  },
  "FAVORITES": {
    DATA_TAG: `favorites`,
    CAPTION: `Favorites`,
    HAS_COUNTER: true,
    LINK: `#favorites`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isFavorite ? total + 1 : total, 0),
  },
};


const createFilterMarkup = (filter, films) => {
  const counterMarkup = filter.HAS_COUNTER ? ` <span class="main-navigation__item-count">${filter[`ACTION`](films)}</span>` : ``;
  const isFilterActive = filter.IS_ACTIVE ? `main-navigation__item--active` : ``;

  return `<a href="${filter.LINK}" data-filter-type=${filter.DATA_TAG} class="main-navigation__item ${isFilterActive}">${filter.CAPTION}${counterMarkup}</a>`;
};

const createFiltersMarkup = (films) => {
  let targetMarkup = ``;

  for (const filterKey in FiltersData) {
    if (FiltersData.hasOwnProperty(filterKey)) {
      targetMarkup = targetMarkup + createFilterMarkup(FiltersData[filterKey], films);
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

export default class Filters extends AbstractSmartComponent {
  constructor(filters, films) {
    super();

    this._films = films;
    this._currentFilterType = FiltersData[`ALL_MOVIES`].DATA_TAG;
  }

  getTemplate() {
    return createFiltersTemplate(this._films);
  }

  recoverListeners() {
    // TODO placeholder
  }

  rerender(newFilms) {
    this._films = newFilms;
    super.rerender();
  }

  setFilterTypeChangeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();

      if (evt.target.tagName !== `A`) {
        return;
      }

      const filterType = evt.target.dataset.filterType;

      if (this._currentFilterType === filterType) {
        return;
      }

      this._currentFilterType = filterType;
      this.getElement().querySelector(`.${FilterButtonCls.ACTIVE}`).classList.remove(FilterButtonCls.ACTIVE);
      evt.target.classList.add(FilterButtonCls.ACTIVE);

      handler(this._currentFilterType);
    });
  }
}

export {FiltersData};
