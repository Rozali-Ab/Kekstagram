const successSection = document.querySelector('#success').content.querySelector('.success');
const errorSection = document.querySelector('#error').content.querySelector('.error');

function hideModal () {
  const messageElement = document.querySelector('.success') || document.querySelector('.error');
  messageElement.remove();
  document.body.removeEventListener('keydown', onEscDown);
  document.body.removeEventListener('click', onBodyClick);

}
const showSuccessModal = () => {
  document.body.append(successSection);
  successSection.querySelector('.success__button').addEventListener('click', hideModal);
  document.body.addEventListener('keydown', onEscDown);
  document.body.addEventListener('click', onBodyClick);
};

const showErrorModal = () => {
  document.body.append(errorSection);
  errorSection.querySelector('.error__button').addEventListener('click', hideModal);
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

export {  showSuccessModal, showErrorModal, showMainErrorModal };
