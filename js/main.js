import  {getData} from './api.js';
import {onDownloadClick, setPictureFormSubmit} from './upload-picture.js';
import {renderPictures} from './gallery.js';
import {showMainErrorModal} from './util.js';
onDownloadClick();

getData(renderPictures, showMainErrorModal);

setPictureFormSubmit();
//npm run start

