import { getData, sendData } from './api.js';
import { setPictureFormSubmit, closeModal } from './upload-picture.js';
import { renderPictures } from './gallery.js';
import { showSuccessModal, showErrorModal, showMainErrorModal } from './message.js';
import { setOnFilterClick, turnFilterOn, filterPictures } from './filter.js';

const onGetDataSuccess = (data) => {
  turnFilterOn(data);
  renderPictures(filterPictures());
  setOnFilterClick(renderPictures);
};

const onSendDataSuccess = () => {
  closeModal();
  showSuccessModal();
};

const onSendDataError = () => {
  closeModal();
  showErrorModal();
};

setPictureFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});

getData(onGetDataSuccess, showMainErrorModal);

