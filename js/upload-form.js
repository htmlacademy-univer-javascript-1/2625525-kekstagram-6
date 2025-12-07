const filePicker = document.getElementById('upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const documentBody = document.body;
const cancelButton = document.querySelector('.img-upload__cancel');
const hashtagsField = document.querySelector('.text__hashtags');
const commentField = document.querySelector('.text__description');
const uploadForm = document.querySelector('.img-upload__form');

const validation = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const openUploadModal = () => {
  uploadOverlay.classList.remove('hidden');
  documentBody.classList.add('modal-open');
  document.addEventListener('keydown', escapeKeyHandler);
};

filePicker.addEventListener('change', () => {
  if (filePicker.files.length) {
    openUploadModal();
  }
});

const resetUploadForm = () => {
  uploadForm.reset();
  validation.reset();
  filePicker.value = '';
  hashtagsField.value = '';
  commentField.value = '';
};

const closeUploadModal = () => {
  uploadOverlay.classList.add('hidden');
  documentBody.classList.remove('modal-open');
  document.removeEventListener('keydown', escapeKeyHandler);
  resetUploadForm();
};

cancelButton.addEventListener('click', (event) => {
  event.preventDefault();
  closeUploadModal();
});

function escapeKeyHandler(event) {
  if (event.key === 'Escape') {
    const focusedElement = document.activeElement;
    const isTextInput = focusedElement === hashtagsField || focusedElement === commentField;

    if (!isTextInput) {
      closeUploadModal();
    }
  }
}

uploadForm.addEventListener('submit', (event) => {
  const isValid = validation.validate();

  if (!isValid) {
    event.preventDefault();
  }
});


const checkCommentLength = (text) => text.length <= 140;

validation.addValidator(
  commentField,
  checkCommentLength,
  'Длина комментария не должна превышать 140 символов'
);

const checkHashtagsFormat = (hashtagsText) => {
  const pattern = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  const trimmedText = hashtagsText.trim();
  if (trimmedText.length === 0) {
    return true;
  }

  const hashtagArray = trimmedText.split(/\s+/);
  if (hashtagArray.length > 5) {
    return false;
  }

  const lowerCaseHashtags = hashtagArray.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseHashtags).size !== hashtagArray.length) {
    return false;
  }

  return hashtagArray.every((tag) => pattern.test(tag));
};

const generateHashtagErrorMessage = (hashtagsText) => {
  const pattern = /^#[a-zA-Zа-яА-Я0-9]{1,19}$/;

  const trimmedText = hashtagsText.trim();
  if (trimmedText.length === 0) {
    return '';
  }

  const hashtagArray = trimmedText.split(/\s+/);
  if (hashtagArray.length > 5) {
    return 'Разрешено не более 5 хэштегов';
  }

  const lowerCaseHashtags = hashtagArray.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseHashtags).size !== lowerCaseHashtags.length) {
    return 'Хэштеги не могут повторяться';
  }

  if (!hashtagArray.every((tag) => pattern.test(tag))) {
    return 'Хэштег должен начинаться с # и содержать только буквы и цифры (макс. 20 символов)';
  }

  return '';
};

validation.addValidator(
  hashtagsField,
  checkHashtagsFormat,
  generateHashtagErrorMessage
);
