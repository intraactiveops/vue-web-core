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
    this.element.style.minHeight = this.element.style.height
    this.element.onkeyup = (e) => {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        this.resize()
      },)
    }
    console.log(this.element)
  }
  resize(){
    this.element.style.height = (this.element.scrollHeight20) + 'px'
  }
}
