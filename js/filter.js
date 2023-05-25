/* 12.9 task
После завершения загрузки изображений с сервера покажите блок .img-filters, убрав у него скрывающий класс.
Добавьте обработчики изменения фильтров, которые будут управлять порядком отрисовки элементов на странице:
По умолчанию — фотографии в изначальном порядке с сервера.
Случайные — 10 случайных, не повторяющихся фотографий.
Обсуждаемые — фотографии, отсортированные в порядке убывания количества комментариев.
При переключении фильтра все фотографии, отрисованные ранее, нужно убрать и вместо них показать те, которые подходят под новые условия.
Воспользуйтесь приёмом «устранение дребезга», чтобы при переключении фильтра обновление списка элементов, подходящих под фильтры, происходило не чаще, чем один раз в полсекунды.
*/

import { debounce } from './util.js';

const PICTURES_COUNT = 12;
const Filter = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const filtersElement = document.querySelector('.img-filters');

const randomSort = () => Math.random() - 0.5;
const discussedSort = (pictureA, pictureB) =>
  pictureB.comments.length - pictureA.comments.length;

let currentFilter = '';
let pictures = [];


const filterPictures = () => {
  switch (currentFilter) {
    case Filter.RANDOM:
      return [...pictures].sort(randomSort).slice(0, PICTURES_COUNT);
    case Filter.DISCUSSED:
      return [...pictures].sort(discussedSort);
    default:
      return [...pictures];
  }
};

const turnFilterOn = (loadedPictures) => {
  filtersElement.classList.remove('img-filters--inactive');
  pictures = [...loadedPictures];
  currentFilter = Filter.DEFAULT;
};

const setOnFilterClick = (cb) => {
  const debouncedCallback = debounce(cb);

  filtersElement.addEventListener('click', (evt) => {
    if (!evt.target.classList.contains('img-filters__button')) {
      return;
    }

    const clickedButton = evt.target;
    if (clickedButton.id === currentFilter) {
      return;
    }

    filtersElement
      .querySelector('.img-filters__button--active')
      .classList.remove('img-filters__button--active');
    clickedButton.classList.add('img-filters__button--active');
    currentFilter = clickedButton.id;
    debouncedCallback(filterPictures());
  });
};

export { setOnFilterClick, turnFilterOn, filterPictures };
