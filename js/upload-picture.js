/* 8.13. task
Добавить в проект валидацию, проверки введённых данных, чтобы подсказать пользователю, какие данные мы от него ждём, а себе и бэкендеру упростить работу с этими данными.
Заведите модуль, который будет отвечать за работу с формой.

Пропишите тегу <form>правильные значения атрибутов method и адрес action для отправки формы на сервер.

Обратите внимание. В разделе про работу с сетью мы доработаем механизм отправки данных, а пока достаточно правильных атрибутов у тега <form>.

Если форма заполнена верно, то после отправки покажется страница сервера (по адресу из атрибута action тега form) с успешно отправленными данными. Если же форма пропустила какие-то некорректные значения, то будет показана страница с допущенными ошибками. В идеале у пользователя не должно быть сценария, при котором он может отправить некорректную форму.

Проверьте разметку вашего проекта и добавьте недостающие атрибуты. Например, всем обязательным полям нужно добавить атрибут required. Затем проверьте, правильные ли типы стоят у нужных полей, если нет — проставьте правильные.

Изучите, что значит загрузка изображения, и как, когда и каким образом показывается форма редактирования изображения. Напишите код и добавьте необходимые обработчики для реализации этого пункта техзадания. В работе вы можете опираться на код показа окна с полноразмерной фотографией, который вы, возможно, уже написали в предыдущей домашней работе.

Важно. Подстановка выбранного изображения в форму — это отдельная домашняя работа. В данном задании этот пункт реализовывать не нужно.

После реализуйте закрытие формы.

Обратите внимание, что при закрытии формы дополнительно необходимо сбрасывать значение поля выбора файла #upload-file. В принципе, всё будет работать, если при повторной попытке загрузить в поле другую фотографию. Но! Событие change не сработает, если пользователь попробует загрузить ту же фотографию, а значит окно с формой не отобразится, что будет нарушением техзадания. Значение других полей формы также нужно сбрасывать.

Напишите код для валидации формы добавления изображения. Список полей для валидации:

Хэш-теги
Комментарий
Реализуйте логику проверки так, чтобы, как минимум, она срабатывала при попытке отправить форму и не давала этого сделать, если форма заполнена не по правилам. При желании, реализуйте проверки сразу при вводе значения в поле.

Как отменить обработчик Esc при фокусе?
Задача не имеет одного верного решения, однако намекнём на самый простой — использовать stopPropagation для события нажатия клавиш в поле при фокусе.

Валидация хеш-тегов?
Для валидации хэш-тегов вам придётся вспомнить, как работать с массивами. Набор хэш-тегов можно превратить в массив, воспользовавшись методом .split(). Он разбивает строки на массивы. После этого, вы можете написать цикл, который будет ходить по полученному массиву и проверять каждый из хэш-тегов на предмет соответствия ограничениям. Если хотя бы один из тегов не проходит нужных проверок, показывать сообщение об ошибке.

Поля, не перечисленные в техзадании, но существующие в разметке, особой валидации не требуют.*/
import {isEscapeKey, showSuccessModal, showErrorModal} from './util.js';
import {scalingPreviewImage, changePreviewImageEffect} from './picture-effects.js';
import {sendData} from './api.js';

const form = document.querySelector('form.img-upload__form');
const overlay = document.querySelector('.img-upload__overlay');
const fileField = document.querySelector('#upload-file');
const cancelButton = document.querySelector('#upload-cancel');
const hashtagField = form.querySelector('.text__hashtags');
const descriptionField = form.querySelector('.text__description');
const submitButton = form.querySelector('.img-upload__submit');

const MAX_HASHTAG_COUNT = 5;
const MIN_HASHTAG_LENGTH = 2;
const MAX_HASHTAG_LENGTH = 20;
const UNVALID_SYMBOLS = /[^a-zA-Z0-9а-яА-ЯёЁ]/g;


const pristine = new Pristine(form, {
  classTo: 'img-upload__element',
  errorTextParent: 'img-upload__element',
  errorTextClass: 'img-upload__error',
});

const showModal = () => {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEscKeyDown);
  cancelButton.addEventListener('click', onCancelButtonClick);
  scalingPreviewImage();
  changePreviewImageEffect();
};

const closeModal = () => {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEscKeyDown);
  form.reset();
  pristine.reset();
};

const isTextFieldFocused = () =>
  document.activeElement === hashtagField || document.activeElement === descriptionField;

function onEscKeyDown (evt) {
  if(isEscapeKey(evt) && !isTextFieldFocused()) {
    evt.preventDefault();
    closeModal();
  }
}

function onCancelButtonClick () {
  closeModal();
}


const startsWithHash = (string) => string[0] === '#';

const hasValidLength = (string) =>
  string.length >= MIN_HASHTAG_LENGTH && string.length <= MAX_HASHTAG_LENGTH;

const hasValidSymbols = (string) => !UNVALID_SYMBOLS.test(string.slice(1));

const isValidTag = (tag) =>
  startsWithHash(tag) && hasValidLength(tag) && hasValidSymbols(tag);

const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const validateTags = (value) => {
  const tags = value
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

pristine.addValidator(
  hashtagField,
  validateTags,
  'Неправильно заполнены хэштеги'
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

const setPictureFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData (
        () => {
          closeModal();
          unblockSubmitButton();
          showSuccessModal();
        },
        () => {
          closeModal();
          showErrorModal();
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};


const onDownloadClick = () => {
  fileField.addEventListener('change', showModal);
};

export{onDownloadClick, setPictureFormSubmit};
