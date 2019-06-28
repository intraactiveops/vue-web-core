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
          'Content-Type': 'text/json'
        }
      }
      let requestInstance = axios(options)
        .then(response => {
          callback(response.data)
        })
        .catch((error, status) => {
          console.error(error, status)
          if(typeof error.response !== 'undefined'){
            if(error.response.status === 401){ // net log in
              alert(401)
              this.$router.push('/')
            }else{
              if(typeof errorCallback !== 'undefined') {
                errorCallback(error.response.data, error.response.status)
              }
            }
          }else{
            console.error(error)
          }
        })
        .finally(() => { this.loading = false })

      return requestInstance
    }
  }
}
export default mixin.methods
