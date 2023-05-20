import  {getData, sendData} from './api.js';
import {setPictureFormSubmit, closeModal} from './upload-picture.js';
import {renderPictures} from './gallery.js';
import {showSuccessModal, showErrorModal, showMainErrorModal} from './util.js';

const onSendDataSuccess = () => {
  closeModal();
  showSuccessModal();
};

const onSendDataError = () => {
  closeModal();
  showErrorModal();
};

getData(renderPictures, showMainErrorModal);

setPictureFormSubmit(async (data) => {
  await sendData(onSendDataSuccess, onSendDataError, data);
});
//npm run start

