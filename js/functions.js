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
