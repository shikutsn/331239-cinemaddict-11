const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
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

const appendChild = (parent, element) => {
  parent.appendChild(element);
};

const removeChild = (parent, element) => {
  parent.removeChild(element);
};

const remove = (element) => {
  element.remove();
};

export {RenderPosition, createElement, render, appendChild, removeChild, remove};
