import AbstractComponent from "./abstract-component.js";

const createFilmsTotalTemplate = (filmsTotal) => {
  // TODO возможно, следует сделать так, чтобы знаки тысяч (и миллионов? или вообще универсально каждые три разряда) отделялись пробелом от знаков миллионов (то есть 233 223 333)
  return (
    `<p>${filmsTotal} movie(s) inside</p>`
  );
};

export default class FilmsTotal extends AbstractComponent {
  constructor(filmsTotal) {
    super();

    this._filmsTotal = filmsTotal;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._filmsTotal);
  }
}
