const Description = {
  MAX_LENGTH: 140,
  TRUNC_SYMBOL: `…`,
};

const getFilmCardControlMarkup = (isWatchlisted, isWatched, isFavorite) => {
  const isWatchlistedChecked = isWatchlisted ? `film-card__controls-item--active` : ``;
  const iswatchedChecked = isWatched ? `film-card__controls-item--active` : ``;
  const isFavoriteChecked = isFavorite ? `film-card__controls-item--active` : ``;

  return (
    `<button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${isWatchlistedChecked}">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${iswatchedChecked}">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${isFavoriteChecked}">Mark as favorite</button>`
  );
};

const createFilmCardElement = (film) => {
  const {title, poster, rating, releaseDate, duration, genres, description, isWatchlisted, isWatched, isFavorite, comments} = film;
  const year = releaseDate.getFullYear();
  const filmCardControlMarkup = getFilmCardControlMarkup(isWatchlisted, isWatched, isFavorite);
  const descriptionFormatted = description.length > 140 ? `${description.slice(0, Description.MAX_LENGTH - 1)}${Description.TRUNC_SYMBOL}` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src="${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${descriptionFormatted}</p>
      <a class="film-card__comments">${comments.length} comment(s)</a>
      <form class="film-card__controls">
        ${filmCardControlMarkup}
      </form>
    </article>`
  );
};

export {createFilmCardElement};
