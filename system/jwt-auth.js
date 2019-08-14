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
    interval: 59
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
window.onfocus = () => {
  if(store.state.userInformation.id * 1 === localStorage.getItem('user_id')){
    alert('User IDs are not matched')
    location.reload()
  }
}
export default {
}
