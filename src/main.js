import {createUserRankTemplate} from "./components/user-rank.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createFilmsBoardTemplate} from "./components/films-board.js";
import {createFilmCardElement} from "./components/film-card.js";
import {createShowMoreButtonTemplate} from "./components/button-show-more.js";
import {createFilmsTotalTemplate} from "./components/films-total.js";
import {getFilmsTotalAmount} from "./mock/global.js";
import {generateFilms} from "./mock/films.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";
import {createFiltersTemplate} from "./components/filters.js";
import {generateFilters} from "./mock/filters.js";
import {createSortingButtonsTemplate} from "./components/sorting-buttons.js";
import {ESC_KEYCODE} from "./const.js";
import {createFilmCardsContainer} from "./components/film-cards-container.js";
import {render, RenderPosition} from "./utils.js";


const FILMS_ALL_COUNT = 17;
const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;
const films = generateFilms(FILMS_ALL_COUNT);
const filmsSortedByComments = films.slice().sort((a, b) => b.comments.length - a.comments.length);
const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
const filters = generateFilters();


const userFilmsWatched = films.reduce((total, it) => it.isWatchlisted ? ++total : total, 0);
const siteHeaderElement = document.querySelector(`.header`);
renderTemplate(siteHeaderElement, createUserRankTemplate(userFilmsWatched));

const siteMainElement = document.querySelector(`.main`);
renderTemplate(siteMainElement, createMainNavigationTemplate());

const siteNavigationElement = siteMainElement.querySelector(`.main-navigation`);
renderTemplate(siteNavigationElement, createFiltersTemplate(filters, films), `afterbegin`);

renderTemplate(siteMainElement, createSortingButtonsTemplate());
renderTemplate(siteMainElement, createFilmsBoardTemplate());

const siteFilmsContainerElement = siteMainElement.querySelector(`.films`);
renderTemplate(siteFilmsContainerElement, createFilmCardsContainer(`All movies. Upcoming`, true, false));


const siteFilmsAllMoviesContainerElement = siteFilmsContainerElement.querySelector(`.films-list__container`);

let filmsRenderedCount = FILMS_PER_PAGE;

films.slice(0, filmsRenderedCount).forEach((film) => renderTemplate(siteFilmsAllMoviesContainerElement, createFilmCardElement(film)));

const siteFilmsAllMoviesElement = siteFilmsContainerElement.querySelector(`.films-list`);

renderTemplate(siteFilmsAllMoviesElement, createShowMoreButtonTemplate());

const loadMoreButtonElement = siteFilmsContainerElement.querySelector(`.films-list__show-more`);

loadMoreButtonElement.addEventListener(`click`, () => {
  films.slice(filmsRenderedCount, filmsRenderedCount + FILMS_PER_PAGE).forEach((film) => renderTemplate(siteFilmsAllMoviesContainerElement, createFilmCardElement(film)));

  filmsRenderedCount += FILMS_PER_PAGE;

  if (filmsRenderedCount >= films.length) {
    loadMoreButtonElement.remove();
  }
});


renderTemplate(siteFilmsContainerElement, createFilmCardsContainer(`Top rated`, false, true));
const siteFilmsTopRatedContainerElement = siteFilmsContainerElement.querySelectorAll(`.films-list__container`)[1];
renderTemplate(siteFilmsContainerElement, createFilmCardsContainer(`Most commented`, false, true));
const siteFilmsMostCommentedContainerElement = siteFilmsContainerElement.querySelectorAll(`.films-list__container`)[2];

filmsSortedByRating.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderTemplate(siteFilmsTopRatedContainerElement, createFilmCardElement(film)));


filmsSortedByComments.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderTemplate(siteFilmsMostCommentedContainerElement, createFilmCardElement(film)));

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
const filmsTotal = getFilmsTotalAmount();
renderTemplate(siteFilmsTotalElement, createFilmsTotalTemplate(filmsTotal));

// тест
// siteFilmsAllMoviesContainerElement.querySelectorAll(`.film-card`).forEach((it) => it.remove());

const siteBodyElement = document.querySelector(`body`);

const closeFilmDetails = () => {
  siteBodyElement.querySelector(`.film-details__close-btn`).removeEventListener(`click`, onFilmDetailsCloseButtonClick);
  document.removeEventListener(`keydown`, onFilmDetailsEscPress);
  siteBodyElement.querySelector(`.film-details`).remove();
};

const onFilmDetailsCloseButtonClick = () => closeFilmDetails();
const onFilmDetailsEscPress = (evt) => evt.keyCode === ESC_KEYCODE ? closeFilmDetails() : false;

const onFilmsAllCardClick = (evt) => {
  const clickedFilmCard = evt.target.closest(`.film-card`);

  if (clickedFilmCard) {
    const clickedFilmCardIndex = Array.from(siteFilmsAllMoviesContainerElement.querySelectorAll(`.film-card`)).indexOf(clickedFilmCard);
    renderTemplate(siteBodyElement, createFilmDetailsTemplate(films[clickedFilmCardIndex]));
    siteBodyElement.querySelector(`.film-details__close-btn`).addEventListener(`click`, onFilmDetailsCloseButtonClick);
    document.addEventListener(`keydown`, onFilmDetailsEscPress);
  }
};
siteFilmsAllMoviesContainerElement.addEventListener(`click`, onFilmsAllCardClick);
