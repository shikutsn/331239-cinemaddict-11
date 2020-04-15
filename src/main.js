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
import {getFilmsTotalAmount} from "./mock/global.js";
import {ESC_KEYCODE} from "./const.js";
import {render, RenderPosition} from "./utils.js";


const FILMS_ALL_COUNT = 17;
const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;

const renderFilmCard = (filmsContainer, film) => {
  const filmCardComponent = new FilmCardComponent(film);

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
render(siteFilmsContainerElement, new FilmCardsContainerComponent(`All movies. Upcoming`, true, false).getElement());

const siteFilmsAllMoviesContainerElement = siteFilmsContainerElement.querySelector(`.films-list__container`);

renderFilmCardsAllContainer(siteFilmsAllMoviesContainerElement, films);


render(siteFilmsContainerElement, new FilmCardsContainerComponent(`Top rated`, false, true).getElement());
render(siteFilmsContainerElement, new FilmCardsContainerComponent(`Most commented`, false, true).getElement());
const [, siteFilmsTopRatedContainerElement, siteFilmsMostCommentedContainerElement] = siteFilmsContainerElement.querySelectorAll(`.films-list__container`);

renderFilmCardsExtraContainer(siteFilmsTopRatedContainerElement, filmsSortedByRating);
renderFilmCardsExtraContainer(siteFilmsMostCommentedContainerElement, filmsSortedByComments);

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
const filmsTotal = getFilmsTotalAmount();
render(siteFilmsTotalElement, new FilmsTotalComponent(filmsTotal).getElement());




// const siteBodyElement = document.querySelector(`body`);
//
// const closeFilmDetails = () => {
//   siteBodyElement.querySelector(`.film-details__close-btn`).removeEventListener(`click`, onFilmDetailsCloseButtonClick);
//   document.removeEventListener(`keydown`, onFilmDetailsEscPress);
//   siteBodyElement.querySelector(`.film-details`).remove();
// };
//
// const onFilmDetailsCloseButtonClick = () => closeFilmDetails();
// const onFilmDetailsEscPress = (evt) => evt.keyCode === ESC_KEYCODE ? closeFilmDetails() : false;
//
// const onFilmsAllCardClick = (evt) => {
//   const clickedFilmCard = evt.target.closest(`.film-card`);
//
//   if (clickedFilmCard) {
//     const clickedFilmCardIndex = Array.from(siteFilmsAllMoviesContainerElement.querySelectorAll(`.film-card`)).indexOf(clickedFilmCard);
//     renderTemplate(siteBodyElement, createFilmDetailsTemplate(films[clickedFilmCardIndex]));
//     siteBodyElement.querySelector(`.film-details__close-btn`).addEventListener(`click`, onFilmDetailsCloseButtonClick);
//     document.addEventListener(`keydown`, onFilmDetailsEscPress);
//   }
// };
// siteFilmsAllMoviesContainerElement.addEventListener(`click`, onFilmsAllCardClick);
