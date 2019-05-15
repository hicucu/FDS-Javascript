function evenOrOdd(num) {
  if (num % 2) return 'Odd';
  return 'Even';
}

console.log(evenOrOdd(2));
console.log(evenOrOdd(3));
console.log(evenOrOdd(1000));
console.log('------------------------------');
function evenOrOdd2(num) {
  return num % 2 ? 'Odd' : 'Even';
}

console.log(evenOrOdd2(2));
console.log(evenOrOdd2(3));
console.log(evenOrOdd2(1000));
console.log('------------------------------');
function getCount8() {
  let count = 0;
  for (let i = 1; i < 10000; i++) {
    const strI = `${i}`;
    for (let j = 0; j < strI.length; j++) {
      if (strI[j] !== '0' && !(strI[j] % 8)) {
        count += 1;
      }
    }
  }
  return count;
}

function getCount8_2() {
  let str = '';
  for (let i = 1; i < 10001; i++) str += i;

  return str.match(/8/g).length;
}
console.log(getCount8()); // 4000
console.log(getCount8_2()); // 4000
console.log('------------------------------');
function alphaString46(s) {
  if (s !== undefined && s.length > 3 && s.length < 7 && parseInt(s)) {
    return true;
  }
  return false;
}
console.log(alphaString46('1234'));
console.log(alphaString46('9014'));
console.log(alphaString46('723'));
console.log(alphaString46('a234'));
console.log(alphaString46(''));
console.log(alphaString46());
