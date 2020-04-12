export const createFilmCardElement = (film) => {
  // const {} = film;

  const title = `Santa Claus Conquers the Martians`;
  const poster = `santa-claus-conquers-the-martians.jpg`;
  const rating = 2.3;
  const year = 1964; // получается из releaseDate
  const duration = `1h 21m`; // TODO: в перспективе хранить в минутах и преобразовывать в нужный формат перед рендером?
  const genre = `Comedy`; // для сокращенной карточки возьмем первый жанр из списка жанров
  const description = `The Martians Momar ("Mom Martian") and Kimar ("King Martian") are worried that their children Girmar ("Girl Martian") and Bomar ("Boy Marti…`; // краткое описание - тоже делается из длинного по ТЗ
  const isWatched = false;
  const isWatchlisted = true;
  const isFavorite = true;
  const commentsCount = 465; // Math.floor(Math.random() * 500)





  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${year}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genre}</span>
      </p>
      <img src="./images/posters/${poster}" alt="" class="film-card__poster">
      <p class="film-card__description">${description}</p>
      <a class="film-card__comments">${commentsCount} comment(s)</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist">Add to watchlist</button>
        <button class="film-card__controls-item button film-card__controls-item--mark-as-watched">Mark as watched</button>
        <button class="film-card__controls-item button film-card__controls-item--favorite film-card__controls-item--active">Mark as favorite</button>
      </form>
    </article>`
  );
};
