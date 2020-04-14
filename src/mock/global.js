import {getRandomNumber} from "../utils.js";

const FILMS_IN_DATABASE = 150000;

const getFilmsTotalAmount = () => {
  return getRandomNumber(FILMS_IN_DATABASE / 2, FILMS_IN_DATABASE);
};

export {getFilmsTotalAmount};
