import Vue from 'vue'
import Config from '@/vue-web-core/system/config.js'
let mixin = {
  data(){
  },
  methods: {
    getFileServerLink(fileName, user = 'any'){
      return fileName ? Config.FILE_SERVER_URL + '/files/' + fileName : (user === 'any' ? require('@/vue-web-core/assets/img/broken-photo.jpg') : require('@/vue-web-core/assets/img/no-profile-pic.jpg'))
    }
  }
}
Vue.mixin(mixin)
