import {getRandomNumber} from "../utils.js";
import {getRandomArrayItem} from "../utils.js";

const TEXT_DATA_MOCK = [
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
  `Cras aliquet varius magna, non porta ligula feugiat eget.`,
  `Fusce tristique felis at fermentum pharetra.`,
  `Aliquam id orci ut lectus varius viverra.`,
  `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
  `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
  `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
  `Sed sed nisi sed augue convallis suscipit in sed felis.`,
  `Aliquam erat volutpat.`,
  `Nunc fermentum tortor ac porta dapibus.`,
  `In rutrum ac purus sit amet tempus.`,
];
const CommentsData = {
  MAX_COUNT: 5,
  EMOJI: [`smile`, `sleeping`, `puke`, `angry`],
  AUTHOR: {
    NAMES: [`John`, `Max`, `Peter`, `Donald`, `George`, `Bill`, `Arnold`, `Frank`, `Tim`],
    SURNAMES: [`Doe`, `Macoveev`, `Trump`, `Clinton`, `Bush`, `Schwarzenegger`, `Stallone`, `Rock`, `Kid`],
  },
  DATE: {
    START: `2015`,
    DELTA: `4`,
  }
};
const FilmsData = {
  TITLES: [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `Virus`, `Andromeda Strain`, `Mad Max: Fury Road`, `Terminator 2: Judgement Day`, `Game of Thrones`, `The Life of Pi`, `Raid: The Redemption`, `Casino Royale`, `The Saw`],
  POSTER: {
    PATH_BASE: `./images/posters/`,
    FILE_NAMES: [`sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`, `made-for-each-other.png`, `popeye-meets-sinbad.png`],
  },
  RATING: {
    MIN: 30,
    MAX: 90,
    PRECISION: 1, // число точек после запятой
  },
  DURATION: {
    MIN: 80,
    MAX: 180,
  },
  DESCRIPTION: {
    MAX_LENGTH: 5,
  },
};

const getRandomDate = (startYear, deltaYear) => {
  // возвращает случайную дату в интервале (startYear - deltaYear) - (startYear + deltaYear)
  const targetDate = new Date(String(startYear));
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, deltaYear * 365 * 24 * 60 * 60 * 1000);

  targetDate.setTime(targetDate.getTime() + diffValue);

  return targetDate;
};

const getComment = () => {
  return {
    text: getRandomArrayItem(TEXT_DATA_MOCK),
    emoji: getRandomArrayItem(CommentsData.EMOJI),
    author: `${getRandomArrayItem(CommentsData.AUTHOR.NAMES)} ${getRandomArrayItem(CommentsData.AUTHOR.SURNAMES)}`,
    date: getRandomDate(CommentsData.DATE.START, CommentsData.DATE.DELTA),
  };
};

const getComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(getComment);
};

const getRating = (min, max, precision) => {
  // precision - число точек после запятой
  let targetRating = getRandomNumber(min, max);
  targetRating /= precision * 10;
  return targetRating.toFixed(precision);
};

const getDuration = (min, max) => {
  const targetDuration = getRandomNumber(min, max);
  return `${Math.floor(targetDuration / 60)}h ${targetDuration % 60}m`;
};

const getDescription = (length) => {
  return new Array(length)
  .fill(``)
  .map(() => {
    return getRandomArrayItem(TEXT_DATA_MOCK);
  })
  .join(` `);
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(FilmsData.TITLES),
    poster: `${FilmsData.POSTER.PATH_BASE}${getRandomArrayItem(FilmsData.POSTER.FILE_NAMES)}`,
    rating: getRating(FilmsData.RATING.MIN, FilmsData.RATING.MAX, FilmsData.RATING.PRECISION),
    releaseDate: getRandomDate(1950, 20),
    duration: getDuration(FilmsData.DURATION.MIN, FilmsData.DURATION.MAX),
    genres: [`Drama`, `Film-Noir`, `Mystery`], // TODO
    description: getDescription(FilmsData.DESCRIPTION.MAX_LENGTH),
    isWatched: Math.random() > 0.5,
    isWatchlisted: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: getComments(getRandomNumber(0, CommentsData.MAX_COUNT)),
    titleOriginal: `Original: The Great Flamarion`,
    director: `Anthony Mann`,
    writers: `Anne Wigton, Heinz Herald, Richard Weil`,
    actors: `Erich von Stroheim, Mary Beth Hughes, Dan Duryea`,
    country: `USA`,
    age: `18+`,
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
