import axios from 'axios'
import Config from '@/vue-web-core/system/config.js'
let mixin = {
  methods: {
    request(parameter, percentageUpdateCallback, callback, errorCallback){
      let requestInstance = $.ajax({
        url: Config.FILE_SERVER_URL + '/v1/upload',
        type: 'POST',
        data: parameter,
        cache: false,
        contentType: false,
        processData: false,
        _method: 'PUT',
        xhr: () => {
          let xhr = new window.XMLHttpRequest()
          xhr.upload.addEventListener('progress', (evt) => {
            if (evt.lengthComputable) {
              let percentComplete = (evt.loaded / evt.total) * 100
              if(percentComplete % 5 === 0 || percentComplete === 100){
                if(typeof percentageUpdateCallback === 'function'){
                  percentageUpdateCallback(percentComplete)
                }
              }
            }
          }, false)
          return xhr
        }
      }).done((response) => {
        if (response.data) {
          callback(response.data)
        } else {
          errorCallback(response.error)
        }
      }).fail((response) => {
        console.error('Request Error', response)
      })


      return requestInstance
    }
  }
}
export default mixin.methods
