import FilmCardComponent from "../components/film-card.js";
import FilmCardsContainerComponent from "../components/film-cards-container.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmsBoardComponent from "../components/films-board.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import {render, addComponent, removeComponent, remove} from "../utils/render.js";


const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;

const renderFilmCard = (filmsContainer, film) => {
  const onFilmCardElementClick = () => {
    addComponent(siteBodyElement, filmDetailsComponent);
    filmDetailsComponent.closeButtonClickHandler(onFilmDetailsCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onFilmDetailsCloseButtonClick = () => {
    removeComponent(siteBodyElement, filmDetailsComponent);
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onFilmDetailsCloseButtonClick();
    }
  };

  const siteBodyElement = document.querySelector(`body`);
  const filmCardComponent = new FilmCardComponent(film);
  const filmDetailsComponent = new FilmDetailsComponent(film);

  filmCardComponent.filmCardElementClickHandler(onFilmCardElementClick);

  render(filmsContainer, filmCardComponent);
};

const renderFilmCardsAllContainer = (filmsAllComponent, films) => {
  let filmsRenderedCount = FILMS_PER_PAGE;

  const siteFilmsAllMoviesContainerElement = filmsAllComponent.querySelector(`.films-list__container`);
  films.slice(0, filmsRenderedCount).forEach((film) => renderFilmCard(siteFilmsAllMoviesContainerElement, film));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsAllComponent, showMoreButtonComponent);

  showMoreButtonComponent.setClickHandler(() => {
    films.slice(filmsRenderedCount, filmsRenderedCount + FILMS_PER_PAGE).forEach((film) => renderFilmCard(siteFilmsAllMoviesContainerElement, film));

    filmsRenderedCount += FILMS_PER_PAGE;

    if (filmsRenderedCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

const renderFilmCardsExtraContainer = (extraFilmsComponent, extraFilms) => {
  const extraFilmsContainerElement = extraFilmsComponent.getElement().querySelector(`.films-list__container`);
  extraFilms.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderFilmCard(extraFilmsContainerElement, film));
};


export default class PageController {
  constructor(container) {
    this._container = container;
  }


  render(films) {
    const filmsTotal = films.length;
    const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);

    const siteFilmsBoardComponent = new FilmsBoardComponent();
    render(this._container, siteFilmsBoardComponent);

    const siteFilmsContainerElement = siteFilmsBoardComponent.getElement(); // section class=films

    if (!filmsTotal) {
      render(siteFilmsContainerElement, new FilmCardsContainerComponent(`There are no movies in our database`, false, false));
    } else {
      const filmCardsAllContainer = new FilmCardsContainerComponent(`All movies. Upcoming`, true, false);
      render(siteFilmsContainerElement, filmCardsAllContainer);
      renderFilmCardsAllContainer(filmCardsAllContainer.getElement(), films);

      const filmsTopRatedContainerComponent = new FilmCardsContainerComponent(`Top rated`, false, true);
      render(siteFilmsContainerElement, filmsTopRatedContainerComponent);
      renderFilmCardsExtraContainer(filmsTopRatedContainerComponent, filmsSortedByRating);

      const filmsMostCommentedContainerComponent = new FilmCardsContainerComponent(`Most commented`, false, true);
      render(siteFilmsContainerElement, filmsMostCommentedContainerComponent);
      renderFilmCardsExtraContainer(filmsMostCommentedContainerComponent, filmsSortedByComments);
    }
  }
}
