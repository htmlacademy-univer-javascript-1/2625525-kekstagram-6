import { comment_messages, names, descriptions } from './constants.js';

function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateMessage() {
  const count_message = getRandomNumber(1, 2);
  let message = '';
  for (let i = 0; i < count_message; i++) {
    if (i > 0) {
      message += ' ';
    }
    message += comment_messages[getRandomNumber(0, comment_messages.length - 1)];
  }
  return message;
}

function generateComment() {
  return {
    id: crypto.randomUUID(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    message: generateMessage(),
    name: names[getRandomNumber(0, names.length - 1)]
  };
}

function generateComments() {
  const count_comments = getRandomNumber(0, 30);
  const comments = [];

  for (let i = 0; i < count_comments; i++) {
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
      description: descriptions[i - 1],
      likes: getRandomNumber(15, 200),
      comments: generateComments()
    };
    photos.push(photo);
  }

  return photos;
}

console.log(getInformationPhotos());
