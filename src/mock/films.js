import {getRandomNumber} from "../utils.js";
import {getRandomArrayItem} from "../utils.js";
import {removeDuplicates} from "../utils.js";

const GlobalMockData = {
  TEXT: [
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
  ],
  NAMES: [
    `John`, `Max`, `Peter`, `Donald`, `George`, `Bill`, `Arnold`, `Frank`, `Tim`, `Anthony`, `Anne`, `Richard`, `Dick`
  ],
  SURNAMES: [
    `Doe`, `Macoveev`, `Trump`, `Clinton`, `Bush`, `Schwarzenegger`, `Stallone`, `Rock`, `Kid`, `Mann`, `Wigton`, `Wail`, `Thornberg`
  ],
};

const FilmsData = {
  TITLES: [`The Dance of Life`, `Sagebrush Trail`, `The Man with the Golden Arm`, `Santa Claus Conquers the Martians`, `Popeye the Sailor Meets Sindbad the Sailor`, `Virus`, `Andromeda Strain`, `Mad Max: Fury Road`, `Terminator 2: Judgement Day`, `Game of Thrones`, `The Life of Pi`, `Raid: The Redemption`, `Casino Royale`, `The Saw`],
  POSTER: {
    PATH_BASE: `./images/posters/`,
    FILE_NAMES: [`sagebrush-trail.jpg`, `santa-claus-conquers-the-martians.jpg`, `the-dance-of-life.jpg`, `the-great-flamarion.jpg`, `the-man-with-the-golden-arm.jpg`, `made-for-each-other.png`, `popeye-meets-sinbad.png`],
  },
  RATING: {
    MIN: 3,
    MAX: 9,
    PRECISION: 1, // число точек после запятой
  },
  RELEASE_DATE: {
    BASE: 1950,
    DELTA: 20,
  },
  DURATION: {
    MIN: 80,
    MAX: 180,
  },
  GENRES: {
    MIN: 1,
    MAX: 3,
    ITEMS: [`Noir`, `Action`, `Horror`, `Sci-Fi`, `Biopic`, `Drama`, `Mystery`, `Historical`],
  },
  DESCRIPTION: {
    MIN_LENGTH: 1,
    MAX_LENGTH: 5,
  },
  COMMENTS: {
    MAX_COUNT: 5,
    EMOJI: [`smile`, `sleeping`, `puke`, `angry`],
    DATE: {
      START: `2015`,
      DELTA: `4`,
    },
  },
  WRITERS: {
    MIN: 1,
    MAX: 4,
  },
  ACTORS: {
    MIN: 1,
    MAX: 6,
  },
  COUNTRY: [`USA`, `Mexico`, `France`, `Norway`, `Russia`, `Japan`],
  AGE: [`0+`, `6+`, `12+`, `14+`, `18+`],
};

const getRandomDate = (startYear, deltaYear) => {
  // возвращает случайную дату в интервале (startYear - deltaYear) - (startYear + deltaYear)
  const targetDate = new Date(String(startYear));
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, deltaYear * 365 * 24 * 60 * 60 * 1000);

  targetDate.setTime(targetDate.getTime() + diffValue);

  return targetDate;
};

const getRandomBoolean = () => {
  return Math.random() > 0.5;
};

const getRandomPersonName = () => {
  return `${getRandomArrayItem(GlobalMockData.NAMES)} ${getRandomArrayItem(GlobalMockData.SURNAMES)}`;
};

const getComment = () => {
  return {
    text: getRandomArrayItem(GlobalMockData.TEXT),
    emoji: getRandomArrayItem(FilmsData.COMMENTS.EMOJI),
    author: getRandomPersonName(),
    date: getRandomDate(FilmsData.COMMENTS.DATE.START, FilmsData.COMMENTS.DATE.DELTA),
  };
};

const getComments = (count) => {
  return new Array(count)
    .fill(``)
    .map(getComment);
};

const getRating = (min, max, precision) => {
  // precision - число точек после запятой
  const multiplier = Math.pow(10, precision);
  let targetRating = getRandomNumber(min * multiplier, max * multiplier);
  targetRating /= multiplier;
  return targetRating.toFixed(precision);
};

const getDescription = (min, max) => {
  const count = getRandomNumber(min, max);
  return new Array(count)
    .fill(``)
    .map(() => {
      return getRandomArrayItem(GlobalMockData.TEXT);
    })
    .join(` `);
};

const getGenres = (min, max, genres) => {
  const count = getRandomNumber(min, max + 1);
  const targetGenres = new Array(count)
    .fill(``)
    .map(() => {
      return getRandomArrayItem(genres);
    });

  return removeDuplicates(targetGenres);
};

const getSetOfNames = (min, max) => {
  const count = getRandomNumber(min, max + 1);
  return new Array(count)
    .fill(``)
    .map(() => {
      return getRandomPersonName();
    })
    .join(`, `);
};

const generateFilm = () => {
  return {
    title: getRandomArrayItem(FilmsData.TITLES),
    poster: `${FilmsData.POSTER.PATH_BASE}${getRandomArrayItem(FilmsData.POSTER.FILE_NAMES)}`,
    rating: getRating(FilmsData.RATING.MIN, FilmsData.RATING.MAX, FilmsData.RATING.PRECISION),
    releaseDate: getRandomDate(FilmsData.RELEASE_DATE.BASE, FilmsData.RELEASE_DATE.DELTA),
    duration: getRandomNumber(FilmsData.DURATION.MIN, FilmsData.DURATION.MAX),
    genres: getGenres(FilmsData.GENRES.MIN, FilmsData.GENRES.MAX, FilmsData.GENRES.ITEMS),
    description: getDescription(FilmsData.DESCRIPTION.MIN_LENGTH, FilmsData.DESCRIPTION.MAX_LENGTH),
    isWatched: getRandomBoolean(),
    isWatchlisted: getRandomBoolean(),
    isFavorite: getRandomBoolean(),
    comments: getComments(getRandomNumber(0, FilmsData.COMMENTS.MAX_COUNT)),
    titleOriginal: `Original: ${getRandomArrayItem(FilmsData.TITLES)}`,
    director: getRandomPersonName(),
    writers: getSetOfNames(FilmsData.WRITERS.MIN, FilmsData.WRITERS.MAX),
    actors: getSetOfNames(FilmsData.ACTORS.MIN, FilmsData.ACTORS.MAX),
    country: getRandomArrayItem(FilmsData.COUNTRY),
    age: getRandomArrayItem(FilmsData.AGE),
  };
};

const generateFilms = (count) => {
  return new Array(count)
    .fill(``)
    .map(generateFilm);
};

export {generateFilm, generateFilms};
