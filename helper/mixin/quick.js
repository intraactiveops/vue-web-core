import Vue from 'vue'
let isset = (object, key) => {
  if(typeof object !== 'undefined' && typeof object[key] !== 'undefined'){
    return object[key]
  }else{
    return false
  }
}
let setDefault = (object, key, defaultValue) => {
  if(isset(object, key) === false){
    Vue.set(object, key, defaultValue)
  }
}
let isNumeric = (variable) => {
  return !isNaN(variable * 1)
}
let padNumber = (num, size, character) => {
  size = typeof size === 'undefined' ? 2 : size
  character = typeof character !== 'undefined' ? character : '0'
  let s = num + ''
  while (s.length < size) s = character + s
  return s
}
let cloneObject = (src) => {
  return JSON.parse(JSON.stringify(src))
}
let numberToMoney = (number) => {
  number = typeof number === 'undefined' || isNaN(number * 1) ? 0 : number * 1
  let isNegative = false
  if(number < 0){
    number *= -1
    isNegative = true
  }
  number = (number.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return isNegative ? `(${number})` : number
}
let generateRandomNumber = (min, max, wholeNumber = true) => {
  if(wholeNumber){
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min + 1)) + min
  }else{
    return min + Math.random() * (max - min)
  }
}
Vue.mixin({
  methods: {
    isset: isset,
    setDefault: setDefault,
    isNumeric: isNumeric,
    padNumber: padNumber,
    cloneObject: cloneObject,
    numberToMoney: numberToMoney,
    generateRandomNumber: generateRandomNumber,
    thread: (functionToRun, delay = 10) => {
      setTimeout(functionToRun, delay)
    },
    blurOnEnter(e){
      if(typeof e.which === 'undefined' || typeof e.target === 'undefined'){ // check if key $event
        return false
      }
      if(e.which === 13){ // 13 is ascii for enter
        e.target.blur()
      }
    }
  },
  filters: {
    numberToMoney: numberToMoney
  }
})
export default{
  setDefault: setDefault,
  isset: isset,
  isNumeric: isNumeric,
  padNumber: padNumber,
  cloneObject: cloneObject,
  numberToMoney: numberToMoney,
  generateRandomNumber: generateRandomNumber
}
