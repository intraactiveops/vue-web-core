import axios from 'axios'
let mixin = {
  methods: {
    httpRequest(method, link, parameter, callback, errorCallback){
      let options = {
        method: method,
        data: parameter,
        url: link
      }
      return axios(options)
        .then(response => {
          callback(response.data)
        })
        .catch((error, status) => {
          console.log(error, status)
          if(typeof error.response !== 'undefined'){
            if(error.response.status === 401){ // net log in
              alert(401)
              this.$router.push('/')
            }else{
              (typeof errorCallback !== 'undefined') ? errorCallback(error.response.data, error.response.status) : null
            }
          }else{
            console.log(error)
          }
        })
        .finally(() => { this.loading = false })
    }
  }
}
export default mixin.methods
