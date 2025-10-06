import { COMMENT_MESSAGES, NAMES, DESCRIPTIONS } from './constants.js';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMessage() {
  const COUNT_MESSAGE = getRandomNumber(1, 2);
  let message = '';
  for (let i = 0; i < COUNT_MESSAGE; i++) {
    if (i > 0) {
      message += ' ';
    }
    message += COMMENT_MESSAGES[getRandomNumber(0, COMMENT_MESSAGES.length - 1)];
  }
  return message;
}

function generateComment() {
  return {
    id: crypto.randomUUID(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: generateMessage(),
    name: NAMES[getRandomNumber(0, NAMES.length - 1)]
  };
}

function generateComments() {
  const COUNT_COMMENTS = getRandomNumber(0, 30);
  const comments = [];

  for (let i = 0; i < COUNT_COMMENTS; i++) {
    comments.push(generateComment());
  }

  return comments;
}

function getInformationPhotos() {
  const photos = [];

  for (let i = 1; i <= 25; i++) {
    const photo = {
      id: i,
      url: `photos/${i}.jpg`,
      description: DESCRIPTIONS[i - 1],
      likes: getRandomNumber(15, 200),
      comments: generateComments()
    };
    photos.push(photo);
  }

  return photos;
}

console.log(getInformationPhotos());
