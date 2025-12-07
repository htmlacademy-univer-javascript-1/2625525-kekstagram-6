const scaleDownBtn = document.querySelector('.scale__control--smaller');
const scaleUpBtn = document.querySelector('.scale__control--bigger');
const scaleValueInput = document.querySelector('.scale__control--value');
const previewImg = document.querySelector('.img-upload__preview img');
const filterRadios = document.querySelectorAll('.effects__radio');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const effectSlider = document.querySelector('.effect-level__slider');
const effectValueInput = document.querySelector('.effect-level__value');

const filters = {
  none: {filter: '', min: 0, max: 100, step: 1, unit: '', start: 100, hasSlider: false },
  chrome: { filter: 'grayscale', min: 0, max: 1, step: 0.1, unit: '', start: 1, hasSlider: true },
  sepia: { filter: 'sepia', min: 0, max: 1, step: 0.1, unit: '', start: 1, hasSlider: true },
  marvin: { filter: 'invert', min: 0, max: 100, step: 1, unit: '%', start: 100, hasSlider: true },
  phobos: { filter: 'blur', min: 0, max: 3, step: 0.1, unit: 'px', start: 3, hasSlider: true },
  heat: { filter: 'brightness', min: 1, max: 3, step: 0.1, unit: '', start: 3, hasSlider: true }
};

let activeFilter = 'none';


scaleValueInput.value = '100%';
previewImg.style.transform = 'scale(1)';


const changeScale = (percent) => {
  previewImg.style.transform = `scale(${percent / 100})`;
  scaleValueInput.value = `${percent}%`;
};


scaleDownBtn.addEventListener('click', () => {
  const current = parseInt(scaleValueInput.value, 10);
  const newValue = Math.max(current - 25, 25);
  changeScale(newValue);
});


scaleUpBtn.addEventListener('click', () => {
  const current = parseInt(scaleValueInput.value, 10);
  const newValue = Math.min(current + 25, 100);
  changeScale(newValue);
});


noUiSlider.create(effectSlider, {
  start: filters.none.start,
  range: { min: filters.none.min, max: filters.none.max },
  step: filters.none.step,
  connect: 'lower'
});


sliderContainer.classList.add('hidden');


const updateFilter = (filterName, intensity) => {
  const currentFilter = filters[filterName];

  if (currentFilter.filter) {
    previewImg.style.filter = `${currentFilter.filter}(${intensity}${currentFilter.unit})`;
  } else {
    previewImg.style.filter = 'none';
  }

  effectValueInput.value = intensity;
};


filterRadios.forEach((radio) => {
  radio.addEventListener('change', () => {
    activeFilter = radio.value;
    const currentFilter = filters[activeFilter];

    if (currentFilter.hasSlider) {
      sliderContainer.classList.remove('hidden');
    } else {
      sliderContainer.classList.add('hidden');
    }

    effectSlider.noUiSlider.updateOptions({
      start: currentFilter.start,
      range: { min: currentFilter.min, max: currentFilter.max },
      step: currentFilter.step
    });

    updateFilter(activeFilter, currentFilter.start);
  });
});


effectSlider.noUiSlider.on('update', (values) => {
  updateFilter(activeFilter, values[0]);
});


export const resetImageSettings = () => {
  scaleValueInput.value = '100%';
  previewImg.style.transform = 'scale(1)';

  previewImg.style.filter = 'none';
  sliderContainer.classList.add('hidden');
  effectValueInput.value = '';

  const defaultFilter = document.querySelector('#effect-none');
  if (defaultFilter) {
    defaultFilter.checked = true;
  }
  activeFilter = 'none';

  effectSlider.noUiSlider.set(filters.none.start);
};


