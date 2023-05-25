/* 7.11. task
Реализовать сценарий просмотра фотографий в полноразмерном режиме. В таком режиме пользователь получает несколько дополнительных возможностей: детально рассмотреть изображение, поставить «лайк», почитать комментарии, оставленные другими пользователями.

Заведите модуль, который будет отвечать за отрисовку окна с полноразмерным изображением.

Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

Количество комментариев comments подставьте как текстовое содержание элемента .comments-count.

Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

<li class="social__comment">
    <img
        class="social__picture"
        src="{{аватар}}"
        alt="{{имя комментатора}}"
        width="35" height="35">
    <p class="social__text">{{текст комментария}}</p>
</li>
Описание фотографии description вставьте строкой в блок .social__caption.

После открытия окна спрячьте блоки счётчика комментариев .social__comment-count и загрузки новых комментариев .comments-loader, добавив им класс hidden, с ними мы разберёмся позже, в другом домашнем задании.

После открытия окна добавьте тегу <body> класс modal-open, чтобы контейнер с фотографиями позади не прокручивался при скролле. При закрытии окна не забудьте удалить этот класс.

Напишите код для закрытия окна по нажатию клавиши Esc и клике по иконке закрытия.

Подключите модуль в проект.

Как связать модули миниатюр и полноразмерного режима?
Задача не имеет одного верного решения, поэтому будет правильным как использование третьего модуля для связки двух других, так и импорт модуля полноразмерных изображений в модуль миниатюр и дальнейшая работа с интерфейсом этого модуля, addEventListener и замыканиями. Последнее решение похоже на демонстрацию по учебному проекту. А первое — с третьим модулем — более сложное из-за отсутствия примера, но самостоятельное. В качестве третьего модуля можно выбрать точку входа, а можно завести отдельный модуль, например «Галерея». Решение за вами.
*/
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const likesCount = bigPicture.querySelector('.likes-count');
const commentsCount = bigPicture.querySelector('.social__comment-count');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentList = document.querySelector('ul.social__comments');
const commentsLoader = document.querySelector('.social__comments-loader');

const COMMENTS_PER_PORTION = 5;
let comments = [];
let commentsShown = 0;

const createComment = ({avatar, name, message}) => {
  const comm = document.createElement('li');
  comm.classList.add('social__comment');

  const commAva = document.createElement('img');
  commAva.classList.add('social__picture');
  commAva.src = avatar;
  commAva.alt = name;

  const commMsg = document.createElement('p');
  commMsg.classList.add('social__text');
  commMsg.textContent = message;

  comm.append(commAva, commMsg);
  return comm;
};

const renderComments = () => {
  commentsShown += COMMENTS_PER_PORTION;

  if (commentsShown >= comments.length) {
    commentsLoader.classList.add('hidden');
    commentsShown = comments.length;
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();
  for (let i = 0; i < commentsShown; i++) {
    const commentElement = createComment(comments[i]);
    fragment.append(commentElement);
  }

  commentList.innerHTML = '';
  commentList.append(fragment);
  commentsCount.innerHTML = `${commentsShown} из <span class="comments-count">${comments.length}</span> комментариев`;
};


const clearComments = () => {
  commentList.innerHTML = '';
  commentsShown = 0;
};
const openPicture = () => {
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

const closePicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  clearComments();
};

function onEscKeyDown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePicture();
  }
}

const onCommentsLoaderClick = () => renderComments();

const renderPicture = (picture) => {
  bigPicture.querySelector('img').src = picture.url;
  bigPicture.querySelector('img').alt = picture.description;
  bigPicture.querySelector('.social__caption').textContent = picture.description;
  likesCount.textContent = picture.likes;
};

const showBigPicture = (data) => {
  clearComments();
  openPicture();
  renderPicture(data);

  comments = data.comments;
  if (comments.length > 0) {
    renderComments(comments);
  }
  document.addEventListener('keydown', onEscKeyDown);
};

closeButton.addEventListener('click', closePicture);
commentsLoader.addEventListener('click', onCommentsLoaderClick);

export { showBigPicture };
