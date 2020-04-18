import AbstractComponent from "./abstract-component.js";

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

export default class FilmCardsContainer extends AbstractComponent {
  constructor(caption, isHidden, isExtra) {
    super();

    this._caption = caption;
    this._isHidden = isHidden;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmCardsContainerTemplate(this._caption, this._isHidden, this._isExtra);
  }
}
