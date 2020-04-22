import AbstractComponent from "./abstract-component.js";

const getFormattedNumber = (num, digitsInGroup = 3) => {
  const numString = String(num);
  if (digitsInGroup >= num) {
    // если просят разбить на группы длиной больше или равно длине самого числа, то это бессмысленно
    return numString;
  }

  const numLength = numString.length;
  let targetNum = [];
  // остаток от деления покажет сколько цифр в начале образуют неполную группу
  const leadingDigitCount = numLength % digitsInGroup;
  if (leadingDigitCount) {
    // если нацело не делится, то первым элементом запушить первую неполную группу
    targetNum.push(numString.slice(0, leadingDigitCount));
  }

  for (let i = leadingDigitCount; i < numLength; i = i + digitsInGroup) {
    targetNum.push(numString.slice(i, i + digitsInGroup));
  }

  return targetNum.join(` `);
};

const createFilmsTotalTemplate = (filmsTotal) => {
  const filmsTotalFormatted = getFormattedNumber(filmsTotal, 3);

  return (
    `<p>${filmsTotalFormatted} movie(s) inside</p>`
  );
};

export default class FilmsTotal extends AbstractComponent {
  constructor(filmsTotal) {
    super();

    this._filmsTotal = filmsTotal;
  }

  getTemplate() {
    return createFilmsTotalTemplate(this._filmsTotal);
  }
}
