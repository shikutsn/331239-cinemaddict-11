import FilmCardsContainerComponent from "../components/film-cards-container.js";
import FilmsContainerComponent from "../components/films-container.js";
import MovieController from "./movie.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortingButtonsComponent from "../components/sorting-buttons.js";
import {render, remove} from "../utils/render.js";
import {SortType} from "../components/sorting-buttons.js";
import {FilmsContainerOption} from "../components/film-cards-container.js";


const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;

const Sorting = {
  [SortType.DEFAULT]: (filmsToSort) => filmsToSort,
  [SortType.DATE]: (filmsToSort) => filmsToSort.slice().sort((a, b) => b.releaseDate - a.releaseDate),
  [SortType.RATING]: (filmsToSort) => filmsToSort.slice().sort((a, b) => b.rating - a.rating),
};

const getSortedFilms = (filmsToSort, sortType) => {
  return Sorting[sortType](filmsToSort);
};

const renderFilmCards = (filmsContainer, filmsToRender, startIndex, count) => {
  // рендерит карточки фильмов (начиная с индекса startIndex count штук) в указанный section films-list, не рендеря сам section
  // на вход дается section films-list или films-list--extra, в нем ищется div
  // возвращает массив контроллеров отрендеренных фильмов
  return filmsToRender.slice(startIndex, startIndex + count).map((film) => {
    const movieController = new MovieController(filmsContainer);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    this._films = [];
    this._showMovieControllers = [];

    this._sortingButtonsComponent = new SortingButtonsComponent();
    this._siteFilmsContainerComponent = new FilmsContainerComponent();
    this._noFilmsContainerComponent = new FilmCardsContainerComponent(`There are no movies in our database`, FilmsContainerOption.CAPTION_SHOWN, FilmsContainerOption.MAIN);
    this._filmCardsAllContainer = new FilmCardsContainerComponent(`All movies. Upcoming`, FilmsContainerOption.CAPTION_SHOWN, FilmsContainerOption.MAIN);
    this._filmsTopRatedContainerComponent = new FilmCardsContainerComponent(`Top rated`, FilmsContainerOption.CAPTION_HIDDEN, FilmsContainerOption.EXTRA);
    this._filmsMostCommentedContainerComponent = new FilmCardsContainerComponent(`Most commented`, FilmsContainerOption.CAPTION_HIDDEN, FilmsContainerOption.EXTRA);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();
  }

  render(films) {
    const renderShowMoreButton = (filmsToRender) => {
      // возможно, кнопка и не нужна изначально
      if (filmsRenderedCount >= filmsToRender.length) {
        return;
      }
      render(this._filmCardsAllContainer.getElement(), this._showMoreButtonComponent);

      this._showMoreButtonComponent.setClickHandler(() => {
        renderFilmCards(this._filmCardsAllContainer, filmsToRender, filmsRenderedCount, FILMS_PER_PAGE);

        filmsRenderedCount += FILMS_PER_PAGE;

        if (filmsRenderedCount >= filmsToRender.length) {
          remove(this._showMoreButtonComponent);
        }
      });
    };

    const filmsTotal = films.length;
    let filmsRenderedCount = (films.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : films.length;
    const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
    const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
    const siteFilmsContainerElement = this._siteFilmsContainerComponent.getElement();

    render(this._container, this._sortingButtonsComponent);
    render(this._container, this._siteFilmsContainerComponent); // общий контейнер для фильмов (section films)

    this._sortingButtonsComponent.setSortTypeChangeHandler((sortType) => {
      // очистим див, в который рисуются карточки фильмов
      this._filmCardsAllContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
      // и кнопку show more если она есть
      remove(this._showMoreButtonComponent);

      const sortedFilms = getSortedFilms(films, sortType);
      filmsRenderedCount = (sortedFilms.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : sortedFilms.length;
      renderFilmCards(this._filmCardsAllContainer, sortedFilms, 0, filmsRenderedCount);
      renderShowMoreButton(sortedFilms);
    });

    if (!filmsTotal) {
      render(siteFilmsContainerElement, this._noFilmsContainerComponent);
      return;
    }

    // рендер трех section films-list и films-list--extra
    render(siteFilmsContainerElement, this._filmCardsAllContainer);
    render(siteFilmsContainerElement, this._filmsTopRatedContainerComponent);
    render(siteFilmsContainerElement, this._filmsMostCommentedContainerComponent);

    renderFilmCards(this._filmCardsAllContainer, films, 0, filmsRenderedCount); // All
    renderFilmCards(this._filmsTopRatedContainerComponent, filmsSortedByRating, 0, FILMS_EXTRA_COUNT); // top rated
    renderFilmCards(this._filmsMostCommentedContainerComponent, filmsSortedByComments, 0, FILMS_EXTRA_COUNT); // top commented

    renderShowMoreButton(films);
  }
}
