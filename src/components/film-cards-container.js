import AbstractComponent from "./abstract-component.js";

const FilmsContainerOption = {
  CAPTION_HIDDEN: true,
  CAPTION_SHOWN: false,
  MAIN: false,
  EXTRA: true,
};

const createFilmCardsContainerTemplate = (caption, isCaptionHidden, isExtra) => {
  const classMarkup = `class="${isExtra ? `films-list--extra` : `films-list`}"`;
  const captionMarkup = `<h2 class="films-list__title${isCaptionHidden ? ` visually-hidden` : ``}">${caption}</h2>`;

  return (
    `<section ${classMarkup}>
      ${captionMarkup}
      <div class="films-list__container">
      </div>
    </section>`
  );
};

export default class FilmCardsContainer extends AbstractComponent {
  constructor(caption, isCaptionHidden, isExtra) {
    super();

    this._caption = caption;
    this._isHidden = isCaptionHidden;
    this._isExtra = isExtra;
  }

  getTemplate() {
    return createFilmCardsContainerTemplate(this._caption, this._isHidden, this._isExtra);
  }
}

export {FilmsContainerOption};
