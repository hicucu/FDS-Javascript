function countVowel(str) {
  var vowelList = {};
  for (var i = 0; i < str.length; i++) {
    if (
      str[i].toLowerCase() == "a" ||
      str[i].toLowerCase() == "e" ||
      str[i].toLowerCase() == "i" ||
      str[i].toLowerCase() == "o" ||
      str[i].toLowerCase() == "u"
    ) {
      vowelList[str[i]] == undefined
        ? (vowelList[str[i]] = 0)
        : vowelList[str[i]]++;
    }
  }
  return vowelList;
}
console.log(countVowel("ehdgoanfrhkqorentksdlakfmrhekfgehfhrgksmsladl"));
console.log(+true);
