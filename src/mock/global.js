import {getRandomNumber} from "../utils.js";

const FILMS_WATCHED_MAX = 25;
const FILMS_IN_DATABASE = 150000;

const getFilmsWatchedAmount = () => {
  return getRandomNumber(0, FILMS_WATCHED_MAX);
  // return 0;
};

const getFilmsTotalAmount = () => {
  return getRandomNumber(FILMS_IN_DATABASE / 2, FILMS_IN_DATABASE);
};

export {getFilmsWatchedAmount, getFilmsTotalAmount};
