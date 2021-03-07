import axios from 'axios'
let mixin = {
  methods: {
    httpRequest(method, link, parameter, callback, errorCallback){
      let options = {
        headers: {
          'authorization': '',
          'Authorization': ''
        },
        method: method,
        data: parameter,
        url: link
      }
      return axios(options)
        .then(response => {
          callback(response.data)
        })
        .catch((error, status) => {
          console.error(error.response)
          console.log(error.response.status)
          if(typeof error.response !== 'undefined'){
            if(error.response.status === 401){ // net log in
              this.$router.push('/', () => {})
            }else{
              if(typeof errorCallback !== 'undefined'){
                errorCallback(error.response.data, error.response.status)
              }
            }
          }else{
          }
        })
        .finally(() => { this.loading = false })
    },
    ajaxRequest(method, link, parameter, callback, errorCallback){
      let options = {
        headers: {
          'authorization': '',
          'Authorization': ''
        },
        method: method,
        data: parameter,
        url: link
      }
      return axios(options)
        .then(response => {
          callback(response)
        })
        .catch((error, status) => {
          console.error(error.status, status)
          console.log(error.response.status)
          if(typeof error.response !== 'undefined'){
            if(error.response.status === 401){ // net log in
              alert(401)
              this.$router.push('/', () => {})
            }else{
              if(typeof errorCallback !== 'undefined'){
                errorCallback(error.response.data, error.response.status)
              }
            }
          }
        })
        .finally(() => { this.loading = false })
    },
  }
}
export default mixin.methods
