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

const renderFilmCardsAllContainer = (filmsContainer, filmsAllComponent, films) => {
  render(filmsContainer, filmsAllComponent);
  let filmsRenderedCount = FILMS_PER_PAGE;

  const siteFilmsAllMoviesContainerElement = filmsAllComponent.getElement().querySelector(`.films-list__container`);
  films.slice(0, filmsRenderedCount).forEach((film) => renderFilmCard(siteFilmsAllMoviesContainerElement, film));

  const showMoreButtonComponent = new ShowMoreButtonComponent();
  render(filmsAllComponent.getElement(), showMoreButtonComponent);

  showMoreButtonComponent.setClickHandler(() => {
    films.slice(filmsRenderedCount, filmsRenderedCount + FILMS_PER_PAGE).forEach((film) => renderFilmCard(siteFilmsAllMoviesContainerElement, film));

    filmsRenderedCount += FILMS_PER_PAGE;

    if (filmsRenderedCount >= films.length) {
      remove(showMoreButtonComponent);
    }
  });
};

const renderFilmCardsExtraContainer = (filmsContainer, filmsExtraComponent, extraFilms) => {
  render(filmsContainer, filmsExtraComponent);
  const extraFilmsContainerElement = filmsExtraComponent.getElement().querySelector(`.films-list__container`);
  extraFilms.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderFilmCard(extraFilmsContainerElement, film));
};


export default class PageController {
  constructor(container) {
    this._container = container;

    this._noFilmsContainerComponent = new FilmCardsContainerComponent(`There are no movies in our database`, false, false);
    this._siteFilmsBoardComponent = new FilmsBoardComponent();
    this._filmCardsAllContainer = new FilmCardsContainerComponent(`All movies. Upcoming`, true, false);
    this._filmsTopRatedContainerComponent = new FilmCardsContainerComponent(`Top rated`, false, true);
    this._filmsMostCommentedContainerComponent = new FilmCardsContainerComponent(`Most commented`, false, true);
  }


  render(films) {
    const filmsTotal = films.length;
    const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
    const siteFilmsContainerElement = this._siteFilmsBoardComponent.getElement();

    render(this._container, this._siteFilmsBoardComponent);

    if (!filmsTotal) {
      render(siteFilmsContainerElement, this._noFilmsContainerComponent);
    } else {
      renderFilmCardsAllContainer(siteFilmsContainerElement, this._filmCardsAllContainer, films);
      renderFilmCardsExtraContainer(siteFilmsContainerElement, this._filmsTopRatedContainerComponent, filmsSortedByRating);
      renderFilmCardsExtraContainer(siteFilmsContainerElement, this._filmsMostCommentedContainerComponent, filmsSortedByComments);
    }
  }
}
