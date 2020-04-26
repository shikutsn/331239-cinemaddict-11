import AbstractComponent from "./abstract-component.js";
import {MONTH_NAMES} from "../const.js";


const EmojiMap = {
  smile: `./images/emoji/smile.png`,
  sleeping: `./images/emoji/sleeping.png`,
  puke: `./images/emoji/puke.png`,
  angry: `./images/emoji/angry.png`,
};

const createGenreMarkup = (genre) => {
  return `<span class="film-details__genre">${genre}</span>`;
};

const createGenresMarkup = (genres) => {
  const genresList = genres.map((it) => createGenreMarkup(it)).join(`\n`);
  const termValue = genres.length === 1 ? `Genre` : `Genres`;

  return (
    `<td class="film-details__term">${termValue}</td>
    <td class="film-details__cell">
    ${genresList}</td>`
  );
};

const createCommentMarkup = (comment) => {
  const {text, emoji, author, date} = comment;
  const year = date.getFullYear();
  const month = String(date.getMonth()).padStart(2, `0`);
  const day = String(date.getDate()).padStart(2, `0`);
  const hours = String(date.getHours()).padStart(2, `0`);
  const minutes = String(date.getMinutes()).padStart(2, `0`);
  const commentDateFormatted = `${year}/${month}/${day} ${hours}:${minutes}`;

  return (
    `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="${EmojiMap[emoji]}" width="55" height="55" alt="emoji-${emoji}">
    </span>
    <div>
      <p class="film-details__comment-text">${text}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${author}</span>
        <span class="film-details__comment-day">${commentDateFormatted}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`
  );
};

const createFilmDetailsControlsMarkup = (isWatchlisted, isWatched, isFavorite) => {
  const isWatchlistedChecked = isWatchlisted ? `checked` : ``;
  const iswatchedChecked = isWatched ? `checked` : ``;
  const isFavoriteChecked = isFavorite ? `checked` : ``;

  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${isWatchlistedChecked}>
    <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${iswatchedChecked}>
    <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

    <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${isFavoriteChecked}>
    <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>`
  );
};

const createCommentsEmojiMarkup = () => {
  let targetEmojiMarkup = ``;

  for (const emoji in EmojiMap) {
    if (EmojiMap.hasOwnProperty(emoji)) {
      targetEmojiMarkup +=
      `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}">
      <label class="film-details__emoji-label" for="emoji-${emoji}">
        <img src="${EmojiMap[emoji]}" width="30" height="30" alt="emoji">
      </label>`;
    }
  }
  return targetEmojiMarkup;
};

const createFilmDetailsTemplate = (film) => {
  const {title, poster, rating, releaseDate, duration, genres, description, isWatchlisted, isWatched, isFavorite, comments, titleOriginal, director, writers, actors, country, age} = film;

  const genresMarkup = createGenresMarkup(genres);
  const durationFormatted = `${Math.floor(duration / 60)}h ${duration % 60}m`;
  // TODO как-то странно, похоже, что все комментарии показываются разом, независимо от их количества
  const commentsMarkup = comments.map(createCommentMarkup).join(`\n`);
  const filmDetailsControlsMarkup = createFilmDetailsControlsMarkup(isWatchlisted, isWatched, isFavorite);
  const releaseDateFormatted = `${String(releaseDate.getDate()).padStart(2, `0`)} ${MONTH_NAMES[releaseDate.getMonth()]} ${releaseDate.getFullYear()}`;
  const emojiMarkup = createCommentsEmojiMarkup();

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${age}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">${titleOriginal}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${releaseDateFormatted}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${durationFormatted}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                    ${genresMarkup}
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            ${filmDetailsControlsMarkup}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label"></div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${emojiMarkup}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class FilmDetails extends AbstractComponent {
  constructor(film) {
    super();

    this._film = film;
  }

  getTemplate() {
    return createFilmDetailsTemplate(this._film);
  }

  closeButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);
  }
}
