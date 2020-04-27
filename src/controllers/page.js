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

const renderFilmCards = (filmsContainer, filmsToRender, startIndex, count, onDataChange) => {
  // рендерит карточки фильмов (начиная с индекса startIndex count штук) в указанный section films-list, не рендеря сам section
  // на вход дается section films-list или films-list--extra, в нем ищется div
  // возвращает массив контроллеров отрендеренных фильмов
  return filmsToRender.slice(startIndex, startIndex + count).map((film) => {
    const movieController = new MovieController(filmsContainer, onDataChange);

    movieController.render(film);

    return movieController;
  });
};

export default class PageController {
  constructor(container) {
    this._container = container;

    // TODO в конце проверить, есть ли в конструкторах контроллеров неиспользуемые приватные свойства
    this._films = [];
    this._sortedFilms = [];
    this._filmsSortedByComments = [];
    this._showMovieControllers = [];
    this._filmsSortedByRating = [];
    this._filmsRenderedCount = 0;

    this._sortingButtonsComponent = new SortingButtonsComponent();
    this._siteFilmsContainerComponent = new FilmsContainerComponent();
    this._noFilmsContainerComponent = new FilmCardsContainerComponent(`There are no movies in our database`, FilmsContainerOption.CAPTION_SHOWN, FilmsContainerOption.MAIN);
    this._filmCardsAllContainer = new FilmCardsContainerComponent(`All movies. Upcoming`, FilmsContainerOption.CAPTION_SHOWN, FilmsContainerOption.MAIN);
    this._filmsTopRatedContainerComponent = new FilmCardsContainerComponent(`Top rated`, FilmsContainerOption.CAPTION_HIDDEN, FilmsContainerOption.EXTRA);
    this._filmsMostCommentedContainerComponent = new FilmCardsContainerComponent(`Most commented`, FilmsContainerOption.CAPTION_HIDDEN, FilmsContainerOption.EXTRA);
    this._showMoreButtonComponent = new ShowMoreButtonComponent();

    this._onSortTypeChange = this._onSortTypeChange.bind(this);
    this._onDataChange = this._onDataChange.bind(this);

    this._sortingButtonsComponent.setSortTypeChangeHandler(this._onSortTypeChange);
  }

  _renderShowMoreButton(filmsToRender) {
    // возможно, кнопка и не нужна изначально
    if (this._filmsRenderedCount >= filmsToRender.length) {
      return;
    }
    render(this._filmCardsAllContainer.getElement(), this._showMoreButtonComponent);

    this._showMoreButtonComponent.setClickHandler(() => {
      renderFilmCards(this._filmCardsAllContainer, filmsToRender, this._filmsRenderedCount, FILMS_PER_PAGE, this._onDataChange);

      this._filmsRenderedCount += FILMS_PER_PAGE;

      if (this._filmsRenderedCount >= filmsToRender.length) {
        remove(this._showMoreButtonComponent);
      }
    });
  }

  _onSortTypeChange(sortType) {
    // очистим див, в который рисуются карточки фильмов
    this._filmCardsAllContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
    // и кнопку show more если она есть
    remove(this._showMoreButtonComponent);

    this._sortedFilms = getSortedFilms(this._films, sortType);
    this._filmsRenderedCount = (this._sortedFilms.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : this._sortedFilms.length;
    renderFilmCards(this._filmCardsAllContainer, this._sortedFilms, 0, this._filmsRenderedCount, this._onDataChange);
    this._renderShowMoreButton(this._sortedFilms);
  }

  _onDataChange(movieController, oldData, newData) {
    const index = this._films.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._films = [].concat(this._films.slice(0, index), newData, this._films.slice(index + 1));

    movieController.render(this._films[index]);
  }

  render(films) {
    this._films = films;
    this._filmsRenderedCount = (this._films.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : this._films.length;
    this._filmsSortedByComments = this._films.slice().sort((a, b) => b.comments.length - a.comments.length);
    this._filmsSortedByRating = this._films.slice().sort((a, b) => b.rating - a.rating);

    const siteFilmsContainerElement = this._siteFilmsContainerComponent.getElement();

    render(this._container, this._sortingButtonsComponent);
    render(this._container, this._siteFilmsContainerComponent); // общий контейнер для фильмов (section films)

    if (!this._films.length) {
      // если фильмов для отрисовки нет - покажем сообщение об этом и отменим дальнейшую отрисовку
      render(siteFilmsContainerElement, this._noFilmsContainerComponent);
      return;
    }

    // рендер трех section films-list и films-list--extra
    render(siteFilmsContainerElement, this._filmCardsAllContainer);
    render(siteFilmsContainerElement, this._filmsTopRatedContainerComponent);
    render(siteFilmsContainerElement, this._filmsMostCommentedContainerComponent);

    renderFilmCards(this._filmCardsAllContainer, this._films, 0, this._filmsRenderedCount, this._onDataChange); // All
    renderFilmCards(this._filmsTopRatedContainerComponent, this._filmsSortedByRating, 0, FILMS_EXTRA_COUNT, this._onDataChange); // top rated
    renderFilmCards(this._filmsMostCommentedContainerComponent, this._filmsSortedByComments, 0, FILMS_EXTRA_COUNT, this._onDataChange); // top commented

    this._renderShowMoreButton(this._films);
  }
}
