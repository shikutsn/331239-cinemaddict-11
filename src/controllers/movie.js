import FilmCardComponent from "../components/film-card.js";
import FilmDetailsComponent from "../components/film-details.js";
import {addComponent, removeComponent, render, replace} from "../utils/render.js";

export default class MovieController {
  constructor(container, onDataChange) {
    // конструктору на вход дается section films-list, а в this._container записываеися div films-list__container, ведь основная движуха в нем
    this._container = container.getElement().querySelector(`.films-list__container`);
    this._siteBodyElement = document.querySelector(`body`); // для отрисовки попапа

    this._onDataChange = onDataChange;

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

    const currentFilm = this._filmDetailsComponent.getFilm();

    this._filmDetailsComponent.setFavoritesButtonClickHandler(() => {
      this._onDataChange(this, currentFilm, Object.assign({}, currentFilm, {
        isFavorite: !currentFilm.isFavorite,
      }));
    });

    this._filmDetailsComponent.setWatchedButtonClickHandler(() => {
      this._onDataChange(this, currentFilm, Object.assign({}, currentFilm, {
        isWatched: !currentFilm.isWatched,
      }));
    });

    this._filmDetailsComponent.setWatchlistedButtonClickHandler(() => {
      this._onDataChange(this, currentFilm, Object.assign({}, currentFilm, {
        isWatchlisted: !currentFilm.isWatchlisted,
      }));
    });

  }

  _onFilmDetailsCloseButtonClick() {
    // console.log(`--in closing--`);
    // console.log(this._siteBodyElement);
    // console.log(this._filmDetailsComponent);
    // console.log(this._filmDetailsComponent.getElement());
    // console.log(this._siteBodyElement.childNodes);

    // TODO приходится напрямую удалять попап, потому что после каких-то(??) манипуляций this.FilmDetailsComponent.getElement() больше не является потомком body =)
    this._siteBodyElement.removeChild(this._siteBodyElement.querySelector(`.film-details`));

    // removeComponent(this._filmDetailsComponent);
    document.removeEventListener(`keydown`, this._onEscKeyDown);
  }

  _onEscKeyDown(evt) {
    const isEscKey = evt.key === `Escape` || evt.key === `Esc`;

    if (isEscKey) {
      this._onFilmDetailsCloseButtonClick();
    }
  }

  render(film) {
    const oldFlmCardComponent = this._filmCardComponent;
    const oldFilmDetailsComponent = this._filmDetailsComponent;

    this._filmCardComponent = new FilmCardComponent(film);
    this._filmDetailsComponent = new FilmDetailsComponent(film);

    this._filmCardComponent.setFilmCardElementClickHandler(this._onFilmCardElementClick);

    this._filmCardComponent.setFavoritesButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isFavorite: !film.isFavorite,
      }));
    });

    this._filmCardComponent.setWatchedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatched: !film.isWatched,
      }));
    });

    this._filmCardComponent.setWatchlistedButtonClickHandler((evt) => {
      evt.preventDefault();
      this._onDataChange(this, film, Object.assign({}, film, {
        isWatchlisted: !film.isWatchlisted,
      }));
    });


    if (oldFlmCardComponent && oldFilmDetailsComponent) {
      replace(oldFlmCardComponent, this._filmCardComponent);
    } else {
      render(this._container, this._filmCardComponent);
    }
  }
}
