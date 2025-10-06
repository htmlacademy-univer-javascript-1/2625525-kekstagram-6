function isStringLengthValid(str, maxLength) {
  return str.length <= maxLength;
}

function isPalindrome(str) {
  const normalizedStr = str.toLowerCase().replaceAll(' ', '');
  for (let i = 0; i < Math.floor(normalizedStr.length / 2); i++) {
    if (normalizedStr[i] !== normalizedStr[normalizedStr.length - 1 - i]) {
      return false;
    }
  }
  return true;
}


function extractNumbers(strOrNum) {
  let numberStr = '';
  const str = String(strOrNum);
  for (let i = 0; i < str.length; i++) {
    if (str[i] >= '0' && str[i] <= '9') {
      numberStr += str[i];
    }
  }
  return numberStr ? parseInt(numberStr, 10) : NaN;
}



/Тесты на длину строки/
(lengthElement('проверяемая строка', 20));
(lengthElement('проверяемая строка', 18));
(lengthElement('проверяемая строка', 10));

/Тесты на палиндром/
(palindrome('топот'));
(palindrome('ДовОд'));
(palindrome('ШАЛАШ'));
(palindrome('Кекс'));
(palindrome('Лёша на полке клопа нашёл '));

/Тесты Извлечения числа из строки/
(stringNumber('2023 год'));
(stringNumber('ECMAScript 2022'));
(stringNumber('1 кефир, 0.5 батона'));
(stringNumber('агент 007'));
(stringNumber('а я томат'));
(stringNumber(-1));
(stringNumber(1.5));
(stringNumber(-12.5));
