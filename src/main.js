
import FilmsTotalComponent from "./components/films-total.js";
import FiltersComponent from "./components/filters.js";
import MainNavigationComponent from "./components/main-navigation.js";
import PageController from "./controllers/page.js";

import SortingButtonsComponent from "./components/sorting-buttons.js";
import UserRankComponent from "./components/user-rank.js";
import {generateFilms} from "./mock/films.js";
import {generateFilters} from "./mock/filters.js";
import {render, RenderPosition} from "./utils/render.js";


const FILMS_ALL_COUNT = 17;


const films = generateFilms(FILMS_ALL_COUNT);
const filmsTotal = films.length;
const userFilmsWatched = films.reduce((total, it) => it.isWatchlisted ? ++total : total, 0);
const filters = generateFilters();

const siteHeaderElement = document.querySelector(`.header`);
render(siteHeaderElement, new UserRankComponent(userFilmsWatched));

const siteMainElement = document.querySelector(`.main`);
const siteMainNavigationComponent = new MainNavigationComponent();
render(siteMainElement, siteMainNavigationComponent);

const siteNavigationElement = siteMainNavigationComponent.getElement();
render(siteNavigationElement, new FiltersComponent(filters, films), RenderPosition.AFTERBEGIN);
render(siteMainElement, new SortingButtonsComponent());

const siteFilmsTotalElement = document.querySelector(`.footer__statistics`);
render(siteFilmsTotalElement, new FilmsTotalComponent(filmsTotal));

const pageController = new PageController(siteMainElement);
pageController.render(films);
