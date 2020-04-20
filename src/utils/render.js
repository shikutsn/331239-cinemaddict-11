const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};


const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;
  }
};

const addComponent = (parent, component) => {
  parent.appendChild(component.getElement());
};

const removeComponent = (parent, component) => {
  parent.removeChild(component.getElement());
};

const remove = (component) => {
  // TODO нужна ли проверка на существование?
  component.getElement().remove();
  component.removeElement();
};

export {RenderPosition, createElement, render, addComponent, removeComponent, remove};
