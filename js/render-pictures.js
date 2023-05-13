/* 7.10. task
Отобразить фотографии других пользователей.

Заведите модуль, который будет отвечать за отрисовку миниатюр.

На основе временных данных для разработки и шаблона #picture создайте DOM-элементы, соответствующие фотографиям, и заполните их данными:

Адрес изображения url подставьте как атрибут src изображения.
Количество лайков likes выведите в блок .picture__likes.
Количество комментариев comments выведите в блок .picture__comments.
Отрисуйте сгенерированные DOM-элементы в блок .pictures. Для вставки элементов используйте DocumentFragment.

Подключите модуль в проект.*/
import {getPictures} from './data.js';
import {showBigPicture} from './big-picture.js';

const renderPictures = () => {
  const template = document.querySelector('#picture').content.querySelector('.picture');

  const picturesSection = document.querySelector('.pictures');

  const pictureList = getPictures();

  const pictureListFragment = document.createDocumentFragment();

  pictureList.forEach(({url, likes, description, comments}) => {
    const picture = template.cloneNode(true);
    picture.querySelector('.picture__img').src = url;
    picture.querySelector('.picture__likes').textContent = likes;
    picture.querySelector('.picture__comments').textContent = comments.length;

    picture.addEventListener('click', (evt) => {
      evt.preventDefault();

      showBigPicture({url, likes, description, comments});
    });
    pictureListFragment.appendChild(picture);
  });

  picturesSection.appendChild(pictureListFragment);
};


export {renderPictures};
