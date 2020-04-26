import FilmCardComponent from "../components/film-card.js";
import FilmDetailsComponent from "../components/film-details.js";
import {addComponent, removeComponent, render} from "../utils/render.js";

export default class MovieController {
  constructor(container) {
    // конструктору на вход дается section films-list, а в this._container записываеися div films-list__container, ведь основная движуха в нем
    this._container = container.getElement().querySelector(`.films-list__container`);
    this._siteBodyElement = document.querySelector(`body`); // для отрисовки попапа

    this._filmCardComponent = null;
    this._filmDetailsComponent = null;

    this._onEscKeyDown = this._onEscKeyDown.bind(this);
    this._onFilmCardElementClick = this._onFilmCardElementClick.bind(this);
    this._onFilmDetailsCloseButtonClick = this._onFilmDetailsCloseButtonClick.bind(this);
  }

  _onFilmCardElementClick() {
    addComponent(this._siteBodyElement, this._filmDetailsComponent);
    this._filmDetailsComponent.closeButtonClickHandler(this._onFilmDetailsCloseButtonClick);
    document.addEventListener(`keydown`, this._onEscKeyDown);
  }

  _onFilmDetailsCloseButtonClick() {
    removeComponent(this._siteBodyElement, this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onFilmDetailsCloseButtonClick();
    }
  }

  render(film) {
    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.filmCardElementClickHandler(this._onFilmCardElementClick);

    render(this._container, this._filmCardComponent);
  }
}
