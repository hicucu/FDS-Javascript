console.log(
  '-------------------10. 배열의 최대/최소값 구하기-------------------'
);
function getMaxValueFromArray(array) {
  return Math.max.apply(null, array);
}

console.log(getMaxValueFromArray([3, 6, -2, -5, 7, 3])); // 7

function getMinValueFromArray(array) {
  return Math.min(...array);
}
console.log(getMinValueFromArray([3, 6, -2, -5, 7, 3])); // -5

/*
4. 문자열 내 p와 y의 개수
numPY함수는 대문자와 소문자가 섞여있는 문자열 s를 인수로 전달받는다. s에 존재하는 'p'의 개수와 'y'의 갯수를 비교해 같으면 true, 다르면 false를 리턴하도록 함수를 완성하라. 대소문자를 구별하지 않으며 'p', 'y' 모두 하나도 없는 경우는 항상 true를 리턴한다.

예를 들어 s가 'pPoooyY'면 true를 리턴하고 'Pyy'라면 false를 리턴한다.
*/
console.log('-------------------4. 문자열 내 p와 y의 개수-------------------');

function numPY(s) {
  if (!s) return true;

  const upperS = s.toUpperCase();

  const splitP = upperS.split('P');
  const splitY = upperS.split('Y');

  return splitP.length === splitY.length;
}

console.log(numPY('pPoooyY')); // true
console.log(numPY('Pyy')); // false
console.log(numPY('ab')); // true
console.log(numPY('')); // true
console.log(numPY()); // true

console.log('-------------------5. 이상한 문자만들기-------------------');

function toWeirdCase(s) {
  if (!s) return '';
  let result = '';

  let wordIndexCnt = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ' ') {
      result += ' ';
      wordIndexCnt = 0;
    } else if (wordIndexCnt % 2) result += s[i].toLowerCase();
    else result += s[i].toUpperCase();
    wordIndexCnt += 1;
  }
  return result;
}
console.log(toWeirdCase('hello world'));
console.log(toWeirdCase('my name is lee'));
console.log(toWeirdCase(''));
console.log(toWeirdCase());

console.log('-------------------6. 핸드폰번호 가리기-------------------');

function hideNumbers(str) {
  if (str === undefined) return '';
  if (!str || str.length < 4) return str;

  let hideS = '*'.repeat(str.length - 4);

  hideS += str.slice(-4);

  return hideS;
}

console.log(hideNumbers('01033334444')); // *******4444
console.log(hideNumbers('027778888')); // *****8888
console.log(hideNumbers('')); //
console.log(hideNumbers()); //

console.log('-------------------7. 문자열을 숫자로 바꾸기-------------------');

function strToInt(str) {
  // return parseInt(str, 10);
  // return Number(str);
  // return +str;
  return str * 1;
}

console.log(strToInt('1234'));
console.log(strToInt('-1234'));

console.log('-------------------8. 수박수박수박수박수박수?-------------------');

function waterMelon(n) {
  const wordWaterMelon = '수박';

  if (n % 2) return `${wordWaterMelon.repeat((n - 1) / 2)}수`;
  return wordWaterMelon.repeat(n / 2);
}

console.log('n이 3인 경우: ' + waterMelon(3));
console.log('n이 4인 경우: ' + waterMelon(4));

console.log('-------------------9. 정수제곱근 판별하기-------------------');

function nextSqaure(n) {
  if (isNaN(n)) return 'no';

  return Number.isInteger(Math.sqrt(n)) ? Math.pow(Math.sqrt(n) + 1, 2) : 'no';
}

console.log(nextSqaure()); // no
console.log(nextSqaure(0)); // 1
console.log(nextSqaure(1)); // 4
console.log(nextSqaure(2)); // no
console.log(nextSqaure(3)); // no
console.log(nextSqaure(121)); // 144
console.log(nextSqaure(165)); // no
console.log(nextSqaure(400)); // 441
