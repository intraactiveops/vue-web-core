import apiRequest from '@/vue-web-core/system/http-request-handling/apiRequest.js'
export default class Select2InputHelper{
  options
  optionLookUp
  descriptionColumn
  isProcessing
  processList
  constructor(descriptionColumn){
    this.options = []
    this.optionLookUp = {}
    this.descriptionColumn = descriptionColumn
    this.isProcessing = false
    this.processList = []
  }
  fetchOption(search, id, done){
    this.processList.push({
      search: search,
      id: id,
      done: done
    })
    if(!this.isProcessing){
      this.isProcessing = true
      this.recursiveProcess()
    }else{
    }
  }
  recursiveProcess(){
    let processParameter = this.processList.shift()
    this.process(processParameter.search, processParameter.id, processParameter.done).then(() => {
      if(this.processList.length){
        this.recursiveProcess()
      }else{
        this.isProcessing = false
      }
    })
  }
  process(search, id, done){
    return new Promise((resolve, reject) => {
      if(id === null){
        this.requestNewOptions(search, done).then(() => {
          resolve(true)
        })
      }else{
        if(typeof this.optionLookUp[id] !== 'undefined'){
          done({ text: this.options[id]['text'], value: this.options[id]['value'] })
          resolve(true)
        }else{
          apiRequest.request('service-action/retrieve', { select: ['id', this.descriptionColumn], id: id }, (response) => {
            let text = response['data'][this.descriptionColumn]
            let option = { text: text, value: id }
            this.options.push(option)
            this.optionLookUp[this.options.length - 1] = option
            done(option)
            resolve(true)
          })
        }
      }
    })
  }
  requestNewOptions(search, done){
    let ids = []
    console.log('ops', this.options)
    for(let x = 0; x < this.options.length; x++){
      ids.push(this.options[x]['value'])
    }
    let param = {
      select: ['id', this.descriptionColumn],
      limit: 7,
      condition: [{
        column: this.descriptionColumn,
        clause: 'like',
        value: '%' + search + '%'
      }, {
        column: 'id',
        clause: 'not_in',
        value: ids
      }]
    }
    return new Promise((resolve, reject) => {
      apiRequest.request('service-action/retrieve', param, (response) => {
        if(response['data']){
          for(let x = 0; x < response['data'].length; x++){
            let option = {
              text: response['data'][x][this.descriptionColumn],
              value: response['data'][x]['id']
            }
            this.options.push(option)
            this.optionLookUp[this.options.length - 1] = option
          }
        }
        done(this.options)
        resolve('true')
      })
    })
  }
}
