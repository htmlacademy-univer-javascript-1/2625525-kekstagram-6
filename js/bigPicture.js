const bigPictureModal = document.querySelector('.big-picture');
const closeModalButton = bigPictureModal.querySelector('.big-picture__cancel');
const commentsContainer = bigPictureModal.querySelector('.social__comments');
const likesCounter = bigPictureModal.querySelector('.likes-count');
const commentsCounter = bigPictureModal.querySelector('.comments-count');
const captionElement = bigPictureModal.querySelector('.social__caption');
const commentCountElement = bigPictureModal.querySelector('.social__comment-count');
const commentLoaderElement = bigPictureModal.querySelector('.comments-loader');
const imgElement = bigPictureModal.querySelector('.big-picture__img img');

const createComment = ({ avatar, name, message }) => {
  const comment = document.createElement('li');
  comment.className = 'social__comment';

  comment.innerHTML = `
        <img class="social__picture"
             src="${avatar}"
             alt="${name}"
             width="35" height="35">
        <p class="social__text">${message}</p>
    `;
  return comment;
};

const closeFullSizeImage = () => {
  bigPictureModal.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

function onDocumentKeydown(event) {
  if (event.key === 'Escape') {
    closeFullSizeImage();
  }
}

const openFullSizeImage = (photo) => {
  imgElement.src = photo.url;
  imgElement.alt = photo.description;
  likesCounter.textContent = photo.likes;
  commentsCounter.textContent = photo.comments.length;
  captionElement.textContent = photo.description;

  commentsContainer.innerHTML = '';
  photo.comments.forEach((comment) => {
    commentsContainer.append(createComment(comment));
  });

  commentCountElement.classList.add('hidden');
  commentLoaderElement.classList.add('hidden');

  bigPictureModal.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
};

closeModalButton.addEventListener('click', closeFullSizeImage);

export { openFullSizeImage as openBigPicture };
