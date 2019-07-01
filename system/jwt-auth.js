import Vue from 'vue'
// import VueResource from 'vue-resource'
import CONFIG from './config'
import Axios from 'axios'
import VueAxios from 'vue-axios'
import Router from '@/router'
import store from '@/vue-web-core/system/store'
Vue.router = Router
Vue.use(VueAxios, Axios)
Vue.axios.defaults.baseURL = CONFIG.BASE_URL
// Vue.http.options.root = CONFIG.API_URL
Vue.use(require('@websanova/vue-auth'), {
  auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
  http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
  router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
  loginData: {
    url: 'auth/login',
    // fetchUser: false
  },
  rolesVar: 'user_type_id',
  refreshData: {
    url: 'auth/refresh',
    method: 'POST',
    interval: 1
  },
  fetchData: {
    url: 'auth/user',
    method: 'POST'
  },
  authRedirect: {
    path: '/'
  },
  notFoundRedirect: {
    path: '/404'
  },
  forbiddenRedirect: {
    path: '/404'
  },
  logoutData: {
    url: 'auth/logout',
    method: 'POST',
    redirect: '/',
    makeRequest: false
  },
  tokenExpired: (data) => {
    console.warn('TOKEN EXPIRED', data)
  },
  // check: (param) => {
  //   store.commit('setAuthToken', localStorage.getItem('default_auth_token'))
  //
  //   return localStorage.getItem('default_auth_token') ? true : false
  // }
})
// let timeout = null
window.onfocus = function(){
  if((store.getters.authToken !== localStorage.getItem('default_auth_token'))){
    if(store.getters.authToken && !localStorage.getItem('default_auth_token')){
      // alert('got sht' + !store.getters.authToken+ '||||||||' +  localStorage.getItem('refreshed_once'))
      localStorage.setItem('refreshed_once', true)
      Router.go()
    }
    if((!store.getters.authToken && localStorage.getItem('default_auth_token') && !localStorage.getItem('refreshed_once'))){
      alert('1:' + store.getters.authToken + ' :::::' + localStorage.getItem('refreshed_once') + '=====' + (!store.getters.authToken && localStorage.getItem('default_auth_token') && !localStorage.getItem('refreshed_once')))
      localStorage.setItem('refreshed_once', true)
      Router.go()
    }else if(store.getters.authToken !== localStorage.getItem('default_auth_token') && !localStorage.getItem('refreshed_once')){
      localStorage.setItem('refreshed_once', true)
      // alert('2')
      Router.go()
    }else{
      localStorage.removeItem('refreshed_once')
      store.commit('setAuthToken', localStorage.getItem('default_auth_token'))
      // alert('removed' + store.getters.authToken + ':::' + localStorage.getItem('refreshed_once'))
    }
    // alert('redirect b ' + store.getters.authToken + ' : ' + localStorage.getItem('default_auth_token'))
  }
  //
  // if(timeout == null){
  //   timeout = setTimeout(() => {
  //     if(localStorage.getItem('default_auth_token') !== localStorage.getItem('store_default_auth_token') && !(localStorage.getItem('store_default_auth_token') !== null || localStorage.getItem('store_default_auth_token') != 'null')){
  //       store.commit('setAuthToken', localStorage.getItem('default_auth_token'))
  //       alert('go lang ng go'+ localStorage.getItem('store_default_auth_token')+ ':' + (localStorage.getItem('store_default_auth_token') == 'null') + ':' + (localStorage.getItem('store_default_auth_token') == null))
  //       Router.go()
  //     }else if((localStorage.getItem('default_auth_token') && !store.getters.authToken)){
  //       alert('stay lang besh' + store.getters.authToken)
  //       store.commit('setAuthToken', localStorage.getItem('default_auth_token'))
  //       // Router.go()
  //     }
  //     timeout = null
  //   },500)
  // }
}
export default {
}
