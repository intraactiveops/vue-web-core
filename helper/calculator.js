let numberFormat = (number) => { // format the number to 2 decimal places
  return Math.round(number * 100) / 100
}
export default{
  numberFormat: numberFormat
}