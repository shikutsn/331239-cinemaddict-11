const getRandomNumber = (min, max) => {
  // случайное целое число из полуинтервала [min, max)
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomArrayItem = (array) => {
  return array[getRandomNumber(0, array.length)];
};

const removeDuplicates = (array) => {
  return array.filter((item, position) => array.indexOf(item) === position);
};


export {getRandomNumber, getRandomArrayItem, removeDuplicates};
