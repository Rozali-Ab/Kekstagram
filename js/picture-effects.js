/* 9.6 task
В этом задании мы продолжим реализацию сценария загрузки изображения и его редактирования на примере заглушки.
Напишите код, который позволит пользователю редактировать масштаб изображения.Кроме визуального применения эффекта необходимо записывать значение в поле формы с масштабом, доступное только для чтения, для дальнейшей отправки на сервер.

С помощью полученных обновлений (стили и скрипты, необходимые для noUiSlider) от Кексобота реализуйте применение эффекта для изображения. Кроме визуального применения эффекта необходимо записывать значение в скрытое поле для дальнейшей отправки на сервер.

Обратите внимание, что при переключении фильтра, уровень эффекта должен сразу сбрасываться до начального состояния, т. е. логика по определению уровня насыщенности должна срабатывать не только при «перемещении» слайдера, но и при переключении фильтров.

2.1. Масштаб:
При нажатии на кнопки .scale__control--smaller и .scale__control--bigger должно изменяться значение поля .scale__control--value;
Значение должно изменяться с шагом в 25. Например, если значение поля установлено в 50%, после нажатия на «+», значение должно стать равным 75%. Максимальное значение — 100%, минимальное — 25%. Значение по умолчанию — 100%;
При изменении значения поля .scale__control--value изображению внутри .img-upload__preview должен добавляться соответствующий стиль CSS, который с помощью трансформации scale задаёт масштаб. Например, если в поле стоит значение 75%, то в стиле изображения должно быть написано transform: scale(0.75).
2.2. Наложение эффекта на изображение:

По умолчанию должен быть выбран эффект «Оригинал».
На изображение может накладываться только один эффект.
При смене эффекта, выбором одного из значений среди радиокнопок .effects__radio, добавить картинке внутри .img-upload__preview CSS-класс, соответствующий эффекту. Например, если выбран эффект .effect-chrome, изображению нужно добавить класс effects__preview--chrome.
Интенсивность эффекта регулируется перемещением ползунка в слайдере. Слайдер реализуется сторонней библиотекой для реализации слайдеров noUiSlider. Уровень эффекта записывается в поле .effect-level__value. При изменении уровня интенсивности эффекта (предоставляется API слайдера), CSS-стили картинки внутри .img-upload__preview обновляются следующим образом:
Для эффекта «Хром» — filter: grayscale(0..1) с шагом 0.1;
Для эффекта «Сепия» — filter: sepia(0..1) с шагом 0.1;
Для эффекта «Марвин» — filter: invert(0..100%) с шагом 1%;
Для эффекта «Фобос» — filter: blur(0..3px) с шагом 0.1px;
Для эффекта «Зной» — filter: brightness(1..3) с шагом 0.1;
Для эффекта «Оригинал» CSS-стили filter удаляются.
При выборе эффекта «Оригинал» слайдер скрывается.
При переключении эффектов, уровень насыщенности сбрасывается до начального значения (100%): слайдер, CSS-стиль изображения и значение поля должны обновляться.
*/
const previewImage = document.querySelector('.img-upload__preview img');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsList = document.querySelector('.effects__list');
const effectLevel = document.querySelector('.effect-level__value');

const EFFECTS = [
  {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
  },
  {
    name: 'chrome',
    min: 0,
    max: 1,
    style: 'grayscale',
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    min: 0,
    max: 1,
    style: 'sepia',
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    min: 0,
    max: 100,
    style: 'invert',
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    min: 0,
    max: 3,
    style: 'blur',
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    min: 1,
    max: 3,
    style: 'brightness',
    step: 0.1,
    unit: '',
  },
];
const DEFAULT_EFFECT = EFFECTS[0];

function changePreviewImageEffect () {
  let chosenEffect = DEFAULT_EFFECT;
  sliderElement.classList.add('hidden');
  previewImage.style = '';
  previewImage.className = '';

  noUiSlider.create(sliderElement, {
    range: {
      min: DEFAULT_EFFECT.min,
      max: DEFAULT_EFFECT.max,
    },
    start: DEFAULT_EFFECT.max,
    step: 1,
    connect: 'lower',
  });

  const isDefault = () => chosenEffect === DEFAULT_EFFECT;

  const updateSlider = () => {
    sliderElement.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions({
      range: {
        min: chosenEffect.min,
        max: chosenEffect.max,
      },
      step: chosenEffect.step,
      start: chosenEffect.max,
    });

    if (isDefault()) {
      sliderElement.classList.add('hidden');
    }
  };

  const onEffectsListChange = (evt) => {
    if (!evt.target.classList.contains('effects__radio')) {
      return;
    }
    chosenEffect = EFFECTS.find((effect) => effect.name === evt.target.value);
    updateSlider();
  };
  effectsList.addEventListener('change', onEffectsListChange);

  sliderElement.noUiSlider.on('update', () => {
    effectLevel.value = sliderElement.noUiSlider.get();
  });

  const onSliderUpdate = () => {
    previewImage.style.filter = 'none';
    previewImage.className = '';
    effectLevel.value = '';
    if (isDefault()) {
      return;
    }
    const sliderValue = sliderElement.noUiSlider.get();
    previewImage.style.filter = `${chosenEffect.style}(${sliderValue}${chosenEffect.unit})`;
    previewImage.classList.add(`effects__preview--${chosenEffect.name}`);
    effectLevel.value = sliderValue;
  };

  sliderElement.noUiSlider.on('update', onSliderUpdate);
}

function scalingPreviewImage () {
  const scaleBigger = document.querySelector('.scale__control--bigger');
  const scaleSmaller = document.querySelector('.scale__control--smaller');
  const scaleValue = document.querySelector('.scale__control--value');

  const SCALE_MAX = 100;
  const SCALE_MIN = 25;
  const SCALE_STEP = 25;

  let scale = 100;

  function setScaleValue () {
    scaleValue.value = `${scale}%`;
    previewImage.style.transform = `scale(${scale/100})`;
  }
  setScaleValue();
  const onBiggerScaleClick = () => {
    if(scale < SCALE_MAX) {
      scale += SCALE_STEP;
      setScaleValue();
    }
  };

  const onSmallerScaleClick = () => {
    if(scale > SCALE_MIN) {
      scale -= SCALE_STEP;
      setScaleValue();
    }
  };
  scaleBigger.addEventListener('click', onBiggerScaleClick);
  scaleSmaller.addEventListener('click', onSmallerScaleClick);
}

export { scalingPreviewImage, changePreviewImageEffect };
