const FiltersData = {
  "ALL_MOVIES": {
    CAPTION: `All movies`,
    HAS_COUNTER: false,
    LINK: `#all`,
    IS_ACTIVE: true,
    ACTION: (films) => films,
  },
  "WATCHLIST": {
    CAPTION: `Watchlist`,
    HAS_COUNTER: true,
    LINK: `#watchlist`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isWatchlisted ? ++total : total, 0),
  },
  "HISTORY": {
    CAPTION: `History`,
    HAS_COUNTER: true,
    LINK: `#history`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isWatched ? ++total : total, 0),
  },
  "FAVORITES": {
    CAPTION: `Favorites`,
    HAS_COUNTER: true,
    LINK: `#favorites`,
    IS_ACTIVE: false,
    ACTION: (films) => films.reduce((total, it) => it.isFavorite ? ++total : total, 0),
  },
};

const generateFilter = (filter) => {
  return {
    caption: filter.CAPTION,
    hasCounter: filter.HAS_COUNTER,
    link: filter.LINK,
    isActive: filter.IS_ACTIVE,
    action: filter.ACTION,
  };
};

const generateFilters = () => {
  const targetFilters = [];

  for (const filterKey in FiltersData) {
    if (FiltersData.hasOwnProperty(filterKey)) {
      targetFilters.push(generateFilter(FiltersData[filterKey]));
    }
  }
  return targetFilters;
};

export {generateFilters};
