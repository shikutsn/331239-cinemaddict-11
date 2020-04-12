const generateFilm = () => {
  return {
    title: `The Great Flamarion`,
    poster: `the-great-flamarion.jpg`,
    rating: 8.9,
    releaseDate: `30 March 1945`, // TODO в перспективе хранить в объекте Date и преобразовывать - подсмотреть в 3-й лекции
    duration: `1h 18m`, // TODO: в перспективе хранить в минутах и преобразовывать в нужный формат перед рендером?
    genres: [`Drama`, `Film-Noir`, `Mystery`],
    description: `The film opens following a murder at a cabaret in Mexico City in 1936, and then presents the events leading up to it in flashback. The Great Flamarion (Erich von Stroheim) is an arrogant, friendless, and misogynous marksman who displays his trick gunshot act in the vaudeville circuit. His show features a beautiful assistant, Connie (Mary Beth Hughes) and her drunken husband Al (Dan Duryea), Flamarion's other assistant. Flamarion falls in love with Connie, the movie's femme fatale, and is soon manipulated by her into killing her no good husband during one of their acts.`,
    isWatched: false,
    isWatchlisted: true,
    isFavorite: true,
    commentsCount: 8,

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
