const RanksTable = {
  none: {
    NAME: ``,
    MIN: 0,
    MAX: 0,
  },
  novice: {
    NAME: `novice`,
    MIN: 1,
    MAX: 10,
  },
  fan: {
    NAME: `fan`,
    MIN: 11,
    MAX: 20
  },
  buff: {
    NAME: `movie buff`,
    MIN: 21,
    MAX: Infinity,
  },
};

const getUserRank = (filmsWatched = 0) => {
  let targetRank = ``;
  for (const key in RanksTable) {
    if ((filmsWatched >= RanksTable[key].MIN) && (filmsWatched <= RanksTable[key].MAX)) {
      targetRank = RanksTable[key].NAME;
      break;
    }
  }
  return targetRank;
};

export const createUserRankTemplate = (filmsWatched) => {
  const userRank = getUserRank(filmsWatched);

  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${userRank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
