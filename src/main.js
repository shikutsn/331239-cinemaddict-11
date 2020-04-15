import FilmCardComponent from "./components/film-card.js";
import FilmCardsContainerComponent from "./components/film-cards-container.js";
import FilmDetailsComponent from "./components/film-details.js";
import FilmsBoardComponent from "./components/films-board.js";
import FilmsTotalComponent from "./components/films-total.js";
import FiltersComponent from "./components/filters.js";
import MainNavigationComponent from "./components/main-navigation.js";
import ShowMoreButtonComponent from "./components/show-more-button.js";
import SortingButtonsComponent from "./components/sorting-buttons.js";
import UserRankComponent from "./components/user-rank.js";
import {generateFilms} from "./mock/films.js";
import {generateFilters} from "./mock/filters.js";
import {render, RenderPosition} from "./utils.js";


const FILMS_ALL_COUNT = 17;
const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;

const renderFilmCard = (filmsContainer, film) => {
  const onFilmCardElementClick = () => {
    siteBodyElement.appendChild(filmDetailsComponent.getElement());
    filmDetailsComponentCloseButton.addEventListener(`click`, onFilmDetailsCloseButtonClick);
    document.addEventListener(`keydown`, onEscKeyDown);
  };

  const onFilmDetailsCloseButtonClick = () => {
    siteBodyElement.removeChild(filmDetailsComponent.getElement());
    document.removeEventListener(`keydown`, onEscKeyDown);
  };

  const onEscKeyDown = (evt) => {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      onFilmDetailsCloseButtonClick();
    }
  };

  const filmCardComponent = new FilmCardComponent(film);

  const siteBodyElement = document.querySelector(`body`);

  const filmCardComponentTitle = filmCardComponent.getElement().querySelector(`.film-card__title`);
  const filmCardComponentPoster = filmCardComponent.getElement().querySelector(`.film-card__poster`);
  const filmCardComponentComments = filmCardComponent.getElement().querySelector(`.film-card__comments`);
  filmCardComponentTitle.addEventListener(`click`, onFilmCardElementClick);
  filmCardComponentPoster.addEventListener(`click`, onFilmCardElementClick);
  filmCardComponentComments.addEventListener(`click`, onFilmCardElementClick);

  const filmDetailsComponent = new FilmDetailsComponent(film);
  const filmDetailsComponentCloseButton = filmDetailsComponent.getElement().querySelector(`.film-details__close-btn`);


  render(filmsContainer, filmCardComponent.getElement());
};


const renderFilmCardsAllContainer = (filmsContainer, films) => {
  let filmsRenderedCount = FILMS_PER_PAGE;

  films.slice(0, filmsRenderedCount).forEach((film) => renderFilmCard(filmsContainer, film));

  const siteFilmsAllMoviesElement = siteFilmsContainerElement.querySelector(`.films-list`);
  const showMoreButtonComponent = new ShowMoreButtonComponent();

  render(siteFilmsAllMoviesElement, showMoreButtonComponent.getElement());

  showMoreButtonComponent.getElement().addEventListener(`click`, () => {
    films.slice(filmsRenderedCount, filmsRenderedCount + FILMS_PER_PAGE).forEach((film) => renderFilmCard(filmsContainer, film));

    filmsRenderedCount += FILMS_PER_PAGE;

    if (filmsRenderedCount >= films.length) {
      showMoreButtonComponent.getElement().remove();
      showMoreButtonComponent.removeElement();
    }
  });
};

const renderFilmCardsExtraContainer = (extraFilmsContainer, extraFilms) => {
  extraFilms.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderFilmCard(extraFilmsContainer, film));
};


const films = generateFilms(FILMS_ALL_COUNT);
const filmsTotal = films.length;
const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
const userFilmsWatched = films.reduce((total, it) => it.isWatchlisted ? ++total : total, 0);
const filters = generateFilters();

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRankComponent(userFilmsWatched).getElement());


const siteMainElement = document.querySelector(`.main`);
render(siteMainElement, new MainNavigationComponent().getElement());

const siteNavigationElement = siteMainElement.querySelector(`.main-navigation`);
render(siteNavigationElement, new FiltersComponent(filters, films).getElement(), RenderPosition.AFTERBEGIN);

render(siteMainElement, new SortingButtonsComponent().getElement());
render(siteMainElement, new FilmsBoardComponent().getElement());


const siteFilmsContainerElement = siteMainElement.querySelector(`.films`);
const noMovies = !films.length;
if (noMovies) {
  render(siteFilmsContainerElement, new FilmCardsContainerComponent(`There are no movies in our database`, false, false).getElement());
} else {
  render(siteFilmsContainerElement, new FilmCardsContainerComponent(`All movies. Upcoming`, true, false).getElement());

  const siteFilmsAllMoviesContainerElement = siteFilmsContainerElement.querySelector(`.films-list__container`);
  renderFilmCardsAllContainer(siteFilmsAllMoviesContainerElement, films);

  const filmsTopRatedContainerComponent = new FilmCardsContainerComponent(`Top rated`, false, true);
  const siteFilmsTopRatedContainerElement = filmsTopRatedContainerComponent.getElement().querySelector(`.films-list__container`);
  render(siteFilmsContainerElement, filmsTopRatedContainerComponent.getElement());

  const filmsMostCommentedContainerComponent = new FilmCardsContainerComponent(`Most commented`, false, true);
  const siteFilmsMostCommentedContainerElement = filmsMostCommentedContainerComponent.getElement().querySelector(`.films-list__container`);
  render(siteFilmsContainerElement, filmsMostCommentedContainerComponent.getElement());


  renderFilmCardsExtraContainer(siteFilmsTopRatedContainerElement, filmsSortedByRating);
  renderFilmCardsExtraContainer(siteFilmsMostCommentedContainerElement, filmsSortedByComments);
}

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
render(siteFilmsTotalElement, new FilmsTotalComponent(filmsTotal).getElement());
