/*task 11.13

Отказаться от использования временных данных для разработки и создать модуль для работы с сервером.
Создайте новый модуль и опишите в нём функции взаимодействия c удалённым сервером с помощью fetch для получения и отправки данных. Актуальный адрес сервера вы найдёте в техзадании.
Подключите модуль в проект.

Доработайте модуль для отрисовки фотографий так, чтобы в качестве данных использовались не случайно сгенерированные объекты, а те данные, которые вы загрузите с удалённого сервера.
Добавьте обработку возможных ошибок при загрузке.

Сейчас наша форма работает просто: при нажатии на кнопку «Опубликовать» происходит перенаправление на адрес, указанный в атрибуте action. Это не совсем удобно, и если оставить всё как есть, пользователю придётся самостоятельно возвращаться назад. Стоит ли говорить, что это далеко не оптимальное решение. Поэтому данные из формы мы будем передавать с помощью AJAX.

Добавьте обработчик отправки формы, если ещё этого не сделали, который бы отменял действие формы по умолчанию и отправлял данные формы посредством fetch на сервер.
Реализуйте возвращение формы в исходное состояние при успешной отправке, а также показ сообщения пользователю.
Если при отправке данных произошла ошибка запроса, покажите соответствующее сообщение.
Доработайте обработчик закрытия формы, чтобы кроме закрытия формы он сбрасывал введённые пользователем данные и возвращал форму в исходное состояние. Аналогичным образом обработайте нажатие на кнопку сброса.
*/

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram/data'
    );

    if (!response.ok) {
      throw new Error('Не удалось загрузить фотографии');
    }

    const offers = await response.json();
    onSuccess(offers);
  } catch (error) {
    onFail(error.message);
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(
      'https://25.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body,
      }
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить фото. Попробуйте ещё раз');
    }

    onSuccess();
  } catch (error) {
    onFail(error.message);
  }
};

export { getData, sendData };
