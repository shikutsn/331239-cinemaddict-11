import {createUserRankTemplate} from "./components/user-rank.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createFilmsBoardTemplate} from "./components/films-board.js";
import {createFilmsAllMoviesElement} from "./components/films-all-movies.js";
import {createFilmCardElement} from "./components/film-card.js";
import {createFilmsTopRatedElement} from "./components/films-top-rated.js";
import {createShowMoreButtonTemplate} from "./components/button-show-more.js";
import {createFilmsMostCommentedElement} from "./components/films-most-commented.js";
import {createFilmsTotalTemplate} from "./components/films-total.js";
import {getFilmsWatchedAmount} from "./mock/global.js";
import {getFilmsTotalAmount} from "./mock/global.js";
import {generateFilms} from "./mock/films.js";
import {createFilmDetailsTemplate} from "./components/film-details.js";


const FILMS_ALL_COUNT = 17;
const FILMS_EXTRA_COUNT = 2;
const FILMS_PER_PAGE = 5;
const films = generateFilms(FILMS_ALL_COUNT);
const filmsSortedByCommentsCount = films.slice().sort((a, b) => b.comments.length - a.comments.length);
const filmsSortedByRating = films.slice().sort((a, b) => b.rating - a.rating);
// TODO возможно, чтобы не хранить три копии массива с фильмами (а если их 150к?) следует хранить отсортированные индексы изначального массива

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const userFilmsWatched = getFilmsWatchedAmount();
const siteHeaderElement = document.querySelector(`.header`);
renderTemplate(siteHeaderElement, createUserRankTemplate(userFilmsWatched));

const siteMainElement = document.querySelector(`.main`);
renderTemplate(siteMainElement, createMainNavigationTemplate());
renderTemplate(siteMainElement, createFilmsBoardTemplate());

const siteFilmsContainerElement = siteMainElement.querySelector(`.films`);
renderTemplate(siteFilmsContainerElement, createFilmsAllMoviesElement());

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


renderTemplate(siteFilmsContainerElement, createFilmsTopRatedElement());
// Так как в три разных блока (два из них с одинаковыми именами) с фильмами карточки фильмов кладутся в одинаково названные контейнеры, приходится таким способом искать последний из добавленных контейнеров
const siteFilmsTopRatedContainerElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list__container`)).pop();

filmsSortedByRating.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderTemplate(siteFilmsTopRatedContainerElement, createFilmCardElement(film)));

renderTemplate(siteFilmsContainerElement, createFilmsMostCommentedElement());
const siteFilmsMostCommentedContainerElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list__container`)).pop();

filmsSortedByCommentsCount.slice(0, FILMS_EXTRA_COUNT).forEach((film) => renderTemplate(siteFilmsMostCommentedContainerElement, createFilmCardElement(film)));

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
const filmsTotal = getFilmsTotalAmount();
renderTemplate(siteFilmsTotalElement, createFilmsTotalTemplate(filmsTotal));

// renderTemplate(document.querySelector(`body`), createFilmDetailsTemplate(films[0]));
