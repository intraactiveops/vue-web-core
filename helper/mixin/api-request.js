import Vue from 'vue'
import apiRequest from '@/vue-web-core/system/httpRequestHandling/apiRequest.js'
let mixin = {
  methods: {
    apiRequest: apiRequest.request
  }
}
Vue.mixin(mixin)