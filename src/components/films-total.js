export const createFilmsTotalTemplate = (filmsTotal) => {
  // TODO возможно, следует сделать так, чтобы знаки тысяч (и миллионов? или вообще универсально каждые три разряда) отделялись пробелом от знаков миллионов (то есть 233 223 333)
  return (
    `<p>${filmsTotal} movie(s) inside</p>`
  );
};
