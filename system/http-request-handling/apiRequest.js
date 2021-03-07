import axios from 'axios'
import Config from '@/vue-web-core/system/config.js'
let mixin = {
  methods: {
    request(link, parameter, callback, errorCallback){
      let options = {
        method: 'POST',
        data: parameter,
        url: Config.API_URL + '/' + link,
        Authorization: localStorage.getItem('default_auth_token'),
        headers: {
          // 'Content-Type': 'text/json'
        }
      }
      let requestInstance = axios(options)
        .then(response => {
          callback(response.data)
        }).catch((error) => {
          if(typeof error.response !== 'undefined'){
            if(typeof errorCallback === 'function') {
              errorCallback(error.response.data, error.response.status)
            }else{
              if(error.response.status === 401){ // net log in
                window.location = '/'
              }
            }
          }else{
            if(typeof errorCallback === 'function') {
              errorCallback(error)
            }
          }
        }).finally(() => { this.loading = false })
      return requestInstance
    }
  }
}
export default mixin.methods
