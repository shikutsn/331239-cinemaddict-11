import {createElement} from "../utils.js";

const createFilmsTotalTemplate = (filmsTotal) => {
  // TODO возможно, следует сделать так, чтобы знаки тысяч (и миллионов? или вообще универсально каждые три разряда) отделялись пробелом от знаков миллионов (то есть 233 223 333)
  return (
    `<p>${filmsTotal} movie(s) inside</p>`
  );
};

export default class FilmsTotal {
  constructor(filmsTotal) {
    this._filmsTotal = filmsTotal;

    this._element = null;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._filmsTotal);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
