/* 2.15 task
Функция, возвращающая случайное целое число из переданного диапазона включительно. Пример использования функции:
имя_функции(от, до); // Результат: целое число из диапазона "от...до"
Учтите, что диапазон может быть только положительный, включая ноль. А также придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
*/

const getPositiveNumber = (min, max) => {
  if(min < 0 || max < 0) {
    return 0;
  } else if(min >= max) {
    return Math.floor(Math.random() * (min - max)) + max;
  } else if(min === max) {
    return min;
  }
  return Math.floor(Math.random() * (max - min)) + min;
};


const checkStringLength = (str, leng) => {
  // return str.length <= leng ? 1 : 0;
  if (str.length > leng) { return false; }
  return true;
};


// функция для выбора рандомного элемента из массива
const getRandomArrayElement = (names) =>  names[getPositiveNumber(0, names.length-1)];


// нажата ли Esc для EventListener
const isEscapeKey = (evt) => evt.key === 'Escape';


export {getPositiveNumber, checkStringLength, getRandomArrayElement, isEscapeKey};
