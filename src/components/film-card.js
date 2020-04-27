import AbstractComponent from "./abstract-component.js";

const Description = {
  MAX_LENGTH: 140,
  TRUNC_SYMBOL: `…`,
};

const createFilmCardControlMarkup = (isWatchlisted, isWatched, isFavorite) => {
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
  const durationFormatted = `${Math.floor(duration / 60)}h ${duration % 60}m`;
  const filmCardControlMarkup = createFilmCardControlMarkup(isWatchlisted, isWatched, isFavorite);
  const descriptionFormatted = description.length > 140 ? `${description.slice(0, Description.MAX_LENGTH - 1)}${Description.TRUNC_SYMBOL}` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${durationFormatted}</span>
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

export default class FilmCard extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmCardElement(this._film);
  }

  setFilmCardElementClickHandler(handler) {
    this.getElement().querySelectorAll(`.film-card__title, .film-card__poster, .film-card__comments`)
      .forEach((it) => it.addEventListener(`click`, handler));
  }

  setFavoritesButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--favorite`)
      .addEventListener(`click`, handler);
  }

  setWatchedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--mark-as-watched`)
      .addEventListener(`click`, handler);
  }

  setWatchlistedButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-card__controls-item--add-to-watchlist`)
      .addEventListener(`click`, handler);
  }
}
