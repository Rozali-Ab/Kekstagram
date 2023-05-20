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

const successSection = document.querySelector('#success').content;
const errorSection = document.querySelector('#error').content;

function hideModal () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.body.removeEventListener('keydown', onEscDown);
  document.body.removeEventListener('click', onBodyClick);

}
const showSuccessModal = () => {
  document.body.append(successSection);
  document.body.querySelector('.success__button').addEventListener('click', hideModal);
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
};

const showErrorModal = () => {
  document.body.append(errorSection);
  document.body.querySelector('.error__button').addEventListener('click', hideModal);
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
};

const showMainErrorModal = () => {
  const error = document.createElement('div');
  error.textContent = 'Не удалось обновить ленту фотографий, проверьте интернет соединение';
  error.classList.add('error__msg');
  document.body.insertAdjacentElement('afterbegin', error);
};

function onBodyClick(evt) {
  if (
    evt.target.closest('.success__inner') ||
    evt.target.closest('.error__inner')
  ) {
    return;
  }
  hideModal();
}

function onEscDown(evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    evt.stopPropagation();
    hideModal();
  }
}
export {getPositiveNumber, checkStringLength, getRandomArrayElement, isEscapeKey, showSuccessModal, showErrorModal, showMainErrorModal};
