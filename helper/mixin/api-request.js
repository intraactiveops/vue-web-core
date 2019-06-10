import Vue from 'vue'
import apiRequest from '@/vue-web-core/system/httpRequestHandling/apiRequest.js'
import request from '@/vue-web-core/system/httpRequestHandling/request.js'
let mixin = {
  methods: {
    apiRequest: apiRequest.request,
    httpRequest: request.httpRequest
  }
}
Vue.mixin(mixin)
