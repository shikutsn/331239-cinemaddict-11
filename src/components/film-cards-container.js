export const createFilmCardsContainer = (caption, isHidden, isExtra) => {
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
