import Vue from 'vue'
import Config from '@/vue-web-core/system/config.js'
let mixin = {
  data(){
  },
  methods: {
    getFileServerLink(fileName){
      return Config.FILE_SERVER_URL + '/files/' + fileName
    }
  }
}
Vue.mixin(mixin)
