/*
 * 문제 1 양수를 입력받아 이 수를 반지름으로 하는 원의 넓이를 반환하는 함수
 */
function circleArea(n) {
  return n * Math.PI;
}
console.log(circleArea(10));
/*
 * 문제 2 두 정수 min, max 를 입력받아, min 이상 max 미만인 임의의 정수를 반환하는 함수
 */
function minToMax(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}
console.log(minToMax(2, 8));

/*
 * 문제 3 정수를 입력받아, 5 단위로 올림한 수를 반환하는 함수
 */
function ceilBy5(n) {
  if (!(n % 10)) return n;

  const div10 = n / 10;
  const mid = parseInt(div10, 10) + 0.5;
  const round = Math.round(div10);
  return Math.max(Math.abs(round - div10) > Math.abs(mid - div10))
    ? round * 10
    : mid * 10;
}

console.log(ceilBy5(30));
console.log(ceilBy5(32));
console.log(ceilBy5(37));

/*
 * 문제4 임의의 HTML 색상 코드를 반환하는 함수
 */
function htmlHexCode() {
  let red = Math.floor(Math.random() * 127 + 1);
  let green = Math.floor(Math.random() * 127 + 1);
  let blue = Math.floor(Math.random() * 127 + 1);

  red = 0 + red.toString(16);
  green = 0 + green.toString(16);
  blue = 0 + blue.toString(16);

  const rgb =    '#'
    + red.toString().slice(-2)
    + green.toString().slice(-2)
    + blue.toString().slice(-2);

  return rgb;
}
console.log(htmlHexCode());
console.log(htmlHexCode());

/*
 * 문제5 임의의 rgb색상코드를 반환하는 함수
 */
function randomRgbCode() {
  const red = Math.floor(Math.random() * 127 + 1);
  const green = Math.floor(Math.random() * 127 + 1);
  const blue = Math.floor(Math.random() * 127 + 1);

  const rgb = `rgb(${red}, ${green}, ${blue})`;

  return rgb;
}
console.log(randomRgbCode());
console.log(randomRgbCode());

/*
 * 문제 6 소수인 숫자와, 자릿수를 받아서 소수를 자리수만큼만 자른 뒤 반환하는 함수
 */
function fixFloat(num, ptr) {
  return Number(num).toFixed(ptr);
  // const dotIndex = num.toString().indexOf('.');
  // return num.toString().slice(0, dotIndex + ptr + 1);
}
console.log(fixFloat(10.12345, 2));
console.log(fixFloat(15.5678, 1));

/*
 * 문제 7 Camel case의 문자열을 입력받아, snake case로 바꾼 새 문자열을 반환하는 함수
 */

function camelToSnake(camelStr) {
  let snakeStr = camelStr;
  const upper = /[A-Z]/g;
  let cnt = 0;
  while (cnt < snakeStr.length) {
    if (upper.test(snakeStr[cnt])) {
      snakeStr = `${snakeStr.slice(0, cnt)}_${snakeStr
        .slice(cnt, cnt + 1)
        .toLowerCase()}${snakeStr.slice(cnt + 1)}`;
    }
    cnt += 1;
  }
  return snakeStr;
}
console.log(camelToSnake('helloWorld'));

/*
 * 문제 8 Snake case의 문자열을 입력받아, camel case로 바꾼 새 문자열을 반환하는 함수
 */

function snakeToCamel(snakeStr) {
  let camelStr = snakeStr;

  while (camelStr.indexOf('_') > -1) {
    const index = camelStr.indexOf('_');
    camelStr =      camelStr.slice(0, index)
      + camelStr.slice(index + 1, index + 2).toUpperCase()
      + camelStr.slice(index + 2);
  }
  return camelStr;
}
console.log(snakeToCamel('hello_world_javascript'));

/*
 * 문제 9 요일 출력
 */
function getDay(MM, DD) {
  const stdDate = new Date(2016, 1);
  const inputDate = new Date(2016, MM, DD);
  const diffDay = (inputDate - stdDate) / 86400000;
  let result;

  // 20160101 FRI FRI = 5
  switch (Math.abs(diffDay + 5) % 7) {
    case 0:
      result = 'SUN';
      break;
    case 1:
      result = 'MON';
      break;
    case 2:
      result = 'TUE';
      break;
    case 3:
      result = 'WED';
      break;
    case 4:
      result = 'THU';
      break;
    case 5:
      result = 'FRI';
      break;
    default:
      result = 'SAT';
  }
  return result;
}

console.log(getDay(5, 24));

/*
 * 문제 10 전화번호
 */
function hidePhoneNumber(phoneNumber) {
  let str = '****************';
  str += phoneNumber.toString().slice(-4);
  return str.slice(-phoneNumber.length);
}

console.log(hidePhoneNumber('01033334444')); // '*******4444'
console.log(hidePhoneNumber('027778888')); // '*****8888'
// //
// // 1.4 new Date(year, month[, day, hour, minute, second, millisecond])
// // 결과값 주석 이상
// const d = new Date(1999);
// console.log(d); // Thu Jan 01 1999 09:00:01 GMT+0900 (KST)
