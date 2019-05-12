function insensitiveEqual(str1, str2) {
  if (str1.toUpperCase() === str2.toUpperCase()) {
    return true;
  }
  return false;
}

console.log(insensitiveEqual('hello', 'world'));
