import {createElement} from "../utils.js";

const createFilmCardsContainerTemplate = (caption, isHidden, isExtra) => {
  const captionMarkup = `<h2 class="films-list__title${isHidden ? ` visually-hidden` : ``}">${caption}</h2>`;
  const classMarkup = `class="${isExtra ? `films-list--extra` : `films-list`}"`;

  return (
    `<section ${classMarkup}>
      ${captionMarkup}
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmCardsContainer {
  constructor(caption, isHidden, isExtra) {
    this._caption = caption;
    this._isHidden = isHidden;
    this._isExtra = isExtra;

    this._element = null;
  }

  getTemplate() {
    return createFilmCardsContainerTemplate(this._caption, this._isHidden, this._isExtra);
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
