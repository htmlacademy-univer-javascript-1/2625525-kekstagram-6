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


function canScheduleMeeting(workBegin, workFinish, meetingBegin, meetingLength) {
  function convertToMinutes(clockTime) {
    const [hourPart, minutePart] = clockTime.split(':');
    return Number(hourPart) * 60 + Number(minutePart);
  }

  const workStart = convertToMinutes(workBegin);
  const workEnd = convertToMinutes(workFinish);
  const meetingStart = convertToMinutes(meetingBegin);
  const meetingEnd = meetingStart + meetingLength;
  const startsInTime = meetingStart >= workStart;
  const endsInTime = meetingEnd <= workEnd;

  return startsInTime && endsInTime;
}
