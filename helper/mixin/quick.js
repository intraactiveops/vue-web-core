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
  number = typeof number === 'undefined' ? 0 : number * 1
  return (number.toFixed(2)).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
Vue.mixin({
  methods: {
    isset: isset,
    setDefault: setDefault,
    isNumeric: isNumeric,
    padNumber: padNumber,
    cloneObject: cloneObject
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
  numberToMoney: numberToMoney
}
