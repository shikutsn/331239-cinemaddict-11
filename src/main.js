import {createUserRankTemplate} from "./components/user-rank.js";
import {createMainNavigationTemplate} from "./components/main-navigation.js";
import {createFilmsBoardTemplate} from "./components/films-board.js";
import {createFilmsAllMoviesElement} from "./components/films-all-movies.js";
import {createFilmCardElement} from "./components/film-card.js";
import {createFilmsTopRatedElement} from "./components/films-top-rated.js";
import {createShowMoreButtonTemplate} from "./components/button-show-more.js";
import {createFilmsMostCommentedElement} from "./components/films-most-commented.js";
// import {createFilmDetailsTemplate} from "./components/film-details.js";


const FILMS_ALL_COUNT = 5;
const FILMS_EXTRA_COUNT = 2;

const renderTemplate = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};


const siteHeaderElement = document.querySelector(`.header`);
renderTemplate(siteHeaderElement, createUserRankTemplate());

const siteMainElement = document.querySelector(`.main`);
renderTemplate(siteMainElement, createMainNavigationTemplate());
renderTemplate(siteMainElement, createFilmsBoardTemplate());

const siteFilmsContainerElement = siteMainElement.querySelector(`.films`);
renderTemplate(siteFilmsContainerElement, createFilmsAllMoviesElement());

const siteFilmsAllMoviesContainerElement = siteFilmsContainerElement.querySelector(`.films-list__container`);

for (let i = 0; i < FILMS_ALL_COUNT; i++) {
  renderTemplate(siteFilmsAllMoviesContainerElement, createFilmCardElement());
}

const siteFilmsAllMoviesElement = siteFilmsContainerElement.querySelector(`.films-list`);
renderTemplate(siteFilmsAllMoviesElement, createShowMoreButtonTemplate());

renderTemplate(siteFilmsContainerElement, createFilmsTopRatedElement());
// Так как 3 разных блоках (но два из них с одинаковыми именами) с фильмами карточки фильмами кладутся в одинаково названные контейнеры, приходится таким способом искать последний из добавленных
const siteFilmsTopRatedContainerElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list__container`)).pop();

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  renderTemplate(siteFilmsTopRatedContainerElement, createFilmCardElement());
}

renderTemplate(siteFilmsContainerElement, createFilmsMostCommentedElement());
const siteFilmsMostCommentedContainerElement = Array.from(siteFilmsContainerElement.querySelectorAll(`.films-list__container`)).pop();

for (let i = 0; i < FILMS_EXTRA_COUNT; i++) {
  renderTemplate(siteFilmsMostCommentedContainerElement, createFilmCardElement());
}

// renderTemplate(document.querySelector(`body`), createFilmDetailsTemplate());
