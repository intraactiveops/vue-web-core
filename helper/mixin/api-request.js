import Vue from 'vue'
import VueCoreStore from '@/vue-web-core/system/store'
import apiRequest from '@/vue-web-core/system/http-request-handling/apiRequest.js'
import fileServerRequest from '@/vue-web-core/system/http-request-handling/fileServerRequest.js'
import request from '@/vue-web-core/system/http-request-handling/request.js'
let mixin = {
  methods: {
    apiRequest: apiRequest.request,
    fileServerRequest: fileServerRequest.request,
    httpRequest: request.httpRequest,
    ajaxRequest: request.ajaxRequest,
    checkConnectivity: () => {
      if(VueCoreStore.getters.devConfig){
        let devConfig = VueCoreStore.getters.devConfig
        if(devConfig.connection * 1 === 0){
          reject(404)
          return false
        }
      }
      return new Promise((resolve, reject) => {
        let testStart = (new Date()).getTime()
        apiRequest.request('test-connection', { limit: 1 }, response => {
          resolve((new Date()).getTime() - testStart)
        }, (errorResponse, status) => {
          console.log('connection error')
          reject(status)
        })
      })
    },

  }
}
Vue.mixin(mixin)
