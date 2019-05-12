function leftPad(str, num) {
  if (str.length >= num) {
    return str;
  }
  let newString = '';
  for (let i = 0; i < num - str.length; i++) {
    newString += ' ';
  }
  newString += str;
  return newString;
}
console.log(leftPad('hello', 4));
