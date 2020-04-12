import {getRandomNumber} from "../utils.js";

const getRandomDate = (startYear, deltaYear) => {
  // возвращает случайную дату в интервале (startYear - deltaYear) - (startYear + deltaYear)
  const targetDate = new Date(String(startYear));
  const sign = Math.random() > 0.5 ? 1 : -1;
  const diffValue = sign * getRandomNumber(0, deltaYear * 365 * 24 * 60 * 60 * 1000);

  targetDate.setTime(targetDate.getTime() + diffValue);

  return targetDate;
};

const generateFilm = () => {
  return {
    title: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`,
    rating: 8.9,
    releaseDate: getRandomDate(1950, 20),
    duration: `1h 18m`, // TODO: в перспективе хранить в минутах и преобразовывать в нужный формат перед рендером?
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.`,
    isWatched: Math.random() > 0.5,
    isWatchlisted: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    comments: [
      {
        text: `Interesting setting and a good cast`,
        emoji: `smile`,
        author: `Tim Macoveev`,
        date: getRandomDate(2015, 4),
      }, {
        text: `Booooooooooring`,
        emoji: `sleeping`,
        author: `John Doe`,
        date: getRandomDate(2015, 4),
      }, {
        text: `Very very old. Meh`,
        emoji: `puke`,
        author: `John Doe`,
        date: getRandomDate(2015, 4),
      }, {
        text: `Almost two hours? Seriously?`,
        emoji: `angry`,
        author: `John Doe`,
        date: getRandomDate(2015, 4),
      },
    ],

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
