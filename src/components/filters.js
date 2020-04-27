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
    IS_ACTIVE: false,
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

// TODO передвинуть создание разметки внутрь класса для того, чтобы не пробрасывать по функциям массив фильмов и текущую фильтрацию
const createFiltersMarkup = (films, currentFilterType) => {
  let targetMarkup = ``;

  for (const filterKey in FiltersData) {
    if (FiltersData.hasOwnProperty(filterKey)) {
      // если у текущего из перебираемых фильтров дата-тег фильтрации совпадает с текущим фильтром, то пометить его в разметке как активный
      const newFilter = Object.assign({}, FiltersData[filterKey], {
        IS_ACTIVE: (FiltersData[filterKey].DATA_TAG === currentFilterType),
      });

      targetMarkup = targetMarkup + createFilterMarkup(newFilter, films);
    }
  }
  return targetMarkup;
};

const createFiltersTemplate = (films, currentFilterType) => {
  const filtersMarkup = createFiltersMarkup(films, currentFilterType);

  return (
    `<div class="main-navigation__items">
      ${filtersMarkup}
    </div>`
  );
};

export default class Filters extends AbstractSmartComponent {
  constructor(films) {
    super();

    this._films = films;
    this._currentFilterType = FiltersData[`ALL_MOVIES`].DATA_TAG;
    this._filterTypeChangeHandler = null;
  }

  getTemplate() {
    return createFiltersTemplate(this._films, this._currentFilterType);
  }

  recoverListeners() {
    this.setFilterTypeChangeHandler(this._filterTypeChangeHandler);
  }

  rerender(newFilms) {
    this._films = newFilms;
    super.rerender();
    // this.getElement().querySelector(`.${FilterButtonCls.ACTIVE}`).classList.remove(FilterButtonCls.ACTIVE);
    // this.getElement().querySelector(`.${this._currentFilterType}`).classList.add(FilterButtonCls.ACTIVE);
  }

  getCurrentFilterType() {
    return this._currentFilterType;
  }

  setFilterTypeChangeHandler(handler) {
    this._filterTypeChangeHandler = handler;

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
