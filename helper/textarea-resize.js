// function init(element){
//
// }
export default class TextAreaResize{
  element = null
  defaultRow = 3
  timeout = null
  timerCount = 1500 // delay when to change the size
  constructor(element, defaultRow = 3){
    this.element = element
    this.defaultRow = defaultRow
    console.log(this.element.height, 'height')
    this.element.style.minHeight = this.element.style.height
    this.element.onkeyup = (e) => {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.resize()
      },)
      console.log('keyup')
    }
    console.log(this.element)
  }
  resize(){
    console.log(this.element.style, this.element.style.height, this.element.rows)
    this.element.style.height = (this.element.scrollHeight20) + 'px'
  }
}
