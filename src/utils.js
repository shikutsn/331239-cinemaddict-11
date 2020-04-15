const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};

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

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, element, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
  }
};

export {getRandomNumber, getRandomArrayItem, removeDuplicates, createElement, render, RenderPosition};
