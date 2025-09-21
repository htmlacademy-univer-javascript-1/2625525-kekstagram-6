function lengthElement(st, number) {
  return st.length <= number;
}


function palindrome(st){
  const newSt = st.toLowerCase().replaceAll(' ','');
  for(let i = 0; i < Math.floor(newSt.length / 2); i++){
    if (newSt[i] !== newSt[newSt.length-1-i]){
      return false;
    }
  }
  return true;
}


function stringNumber(st){
  let additionNumber = '';
  const str = String(st);
  for(let i = 0; i < str.length; i++){
    if ('0'<=str[i] && str[i]<='9'){
      additionNumber += str[i];
    }
  }
  return additionNumber ? parseInt(additionNumber, 10) : NaN;
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
