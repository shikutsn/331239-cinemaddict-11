import FilmCardComponent from "../components/film-card.js";
import FilmCardsContainerComponent from "../components/film-cards-container.js";
import FilmDetailsComponent from "../components/film-details.js";
import FilmsContainerComponent from "../components/films-container.js";
import ShowMoreButtonComponent from "../components/show-more-button.js";
import SortingButtonsComponent from "../components/sorting-buttons.js";
import {render, addComponent, removeComponent, remove} from "../utils/render.js";
import {SortType} from "../components/sorting-buttons.js";
import {FilmsContainerOption} from "../components/film-cards-component.js";


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

// рендерит карточки фильмов (начиная с индекса startIndex count штук) в указанный section films-list, не рендеря сам section
// на вход дается section films-list или films-list--extra, в нем ищется div
const renderFilmCards = (filmsContainer, films, startIndex, count) => {
  const filmsContainerElement = filmsContainer.getElement().querySelector(`.films-list__container`);
  films.slice(startIndex, startIndex + count).forEach((film) => renderFilmCard(filmsContainerElement, film));
};


export default class PageController {
  constructor(container) {
    this._container = container;

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
    const filmsSortedByDate = films.slice().sort((a, b) => b.releaseDate - a.releaseDate);
    const siteFilmsContainerElement = this._siteFilmsContainerComponent.getElement();


    render(this._container, this._sortingButtonsComponent);
    render(this._container, this._siteFilmsContainerComponent); // общий контейнер для фильмов (section films)

    // siteFilmsContainerElement - section films
    // this.__filmCardsAllContainer - section films-list, внутри которого div films-list__container, в который накидываются карточки фильмов
    // кнопка пририсовывается в конец section films-list

    // как должно быть: сначала рисуем три section'a с фильмами, запоминая дивы в которые накидываются карточки фильмов?
    // так же запомнить секшен в конец которого рисуется кнопка шоу мо
    // и по клику по фильтру пере/дорисовывать карточки в запомненный див
    // глобально (в пределах функции рендер хранить сколько отрисовано)
    // и удалять, как и раньше, кнопку по достижении конца

    if (!filmsTotal) {
      render(siteFilmsContainerElement, this._noFilmsContainerComponent);
    } else {
      // рендер трех section films-list и films-list--extra
      render(siteFilmsContainerElement, this._filmCardsAllContainer);
      render(siteFilmsContainerElement, this._filmsTopRatedContainerComponent);
      render(siteFilmsContainerElement, this._filmsMostCommentedContainerComponent);

      renderFilmCards(this._filmCardsAllContainer, films, 0, filmsRenderedCount); // All
      renderFilmCards(this._filmsTopRatedContainerComponent, filmsSortedByRating, 0, FILMS_EXTRA_COUNT); // top rated
      renderFilmCards(this._filmsMostCommentedContainerComponent, filmsSortedByComments, 0, FILMS_EXTRA_COUNT); // top rated

      renderShowMoreButton(films);


      this._sortingButtonsComponent.setSortTypeChangeHandler((sortType) => {
        // очистим див, в который накидываются карточки фильмов
        this._filmCardsAllContainer.getElement().querySelector(`.films-list__container`).innerHTML = ``;
        // и кнопку show more если она есть
        remove(this._showMoreButtonComponent);


        // TODO переписать этот if либо на свитч либо на энум
        if (sortType === SortType.DEFAULT) {
          filmsRenderedCount = (films.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : films.length;
          renderFilmCards(this._filmCardsAllContainer, films, 0, filmsRenderedCount); // All
          renderShowMoreButton(films);
        } else if (sortType === SortType.DATE) {
          filmsRenderedCount = (filmsSortedByDate.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : filmsSortedByDate.length;
          renderFilmCards(this._filmCardsAllContainer, filmsSortedByDate, 0, filmsRenderedCount); // All
          renderShowMoreButton(filmsSortedByDate);
        } else if (sortType === SortType.RATING) {
          filmsRenderedCount = (filmsSortedByRating.length > FILMS_PER_PAGE) ? FILMS_PER_PAGE : filmsSortedByRating.length;
          renderFilmCards(this._filmCardsAllContainer, filmsSortedByRating, 0, filmsRenderedCount); // All
          renderShowMoreButton(filmsSortedByRating);
        }

      });
    }
  }
}
