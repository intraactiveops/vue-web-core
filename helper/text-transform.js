/* Convert given text to Phrase */
const toPhrase = (text) => {
  var splitStr = underscoreToSpace(text).toLowerCase().split(' ')
  for (var i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1)
  }
  // Directly return the joined string
  return splitStr.join(' ')
}
const underscoreToSpace = (text) => {
  return text.replace(/_/g, ' ')
}

export default {
  underscoreToSpace: underscoreToSpace,
  toPhrase: toPhrase
}
