let mixin = {
  methods: {
    request(link, parameter, percentageUpdateCallback, callback, errorCallback){
      let requestInstance = $.ajax({
        url: link,
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
        switch(response.status * 1){
          case 404:
            console.error('Upload location not found')
            errorCallback(response.responseText)
            break
          default:
            errorCallback(response.responseText)
        }
        if(typeof errorCallback === 'function'){
          errorCallback()
        }
        console.error('Request Error', response)
      })

      return requestInstance
    }
  }
}
export default mixin.methods
