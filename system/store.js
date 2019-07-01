import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/vue-web-core/system/config'

import apiRequest from '@/vue-web-core/system/http-request-handling/apiRequest'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isModuleLoading: false,
    authToken: null,
    companyInformation: {
      id: null,
      name: null
    },
    userInformation: {
      id: null,
      profilePictureLink: null
    }
  },
  mutations: {
    setModuleLoading(state, isLoading){
      Vue.set(state, 'isModuleLoading', isLoading)
    },
    setAuthToken(state, token){
      Vue.set(state, 'authToken', token)
      // return token
      // state.authToken = token
    },
    setCompanyInformation(state, companyInformation){
      Vue.set(state.companyInformation, 'id', companyInformation.id)
      Vue.set(state.companyInformation, 'name', companyInformation.name)
    },
    setUserInformation(state, userInformation){
      Vue.set(state.userInformation, 'id', userInformation.id)
      Vue.set(state.userInformation, 'profilePictureLink', userInformation.profilePictureLink)
    }
  },
  getters: {
    authToken: (state) => {
      return state.authToken
    }
  },
  actions: {
    setCompanyInformation({ commit }){
      if(!localStorage.getItem('default_auth_token')){
        localStorage.removeItem('company_id')
        localStorage.removeItem('roles')
      }
      let companyID = localStorage.getItem('company_id')
      if(companyID){
        let param = {
          id: companyID,
          select: ['name']
        }
        apiRequest.request('company/retrieve', param, (response) => {
          commit('setCompanyInformation', {id: companyID, name: response.data.name})
        }, (errorResponse) => {
          console.error('Error in store company information', errorResponse)
        })

      }
    },
    setUserInformation({ commit }){
      if(!localStorage.getItem('default_auth_token')){
        localStorage.removeItem('user_id')
      }
      let userID = localStorage.getItem('user_id')
      if(userID){
        let param = {
          id: userID,
          select: {
            0: 'username',
            user_profile_picture: {
              select: ['thumbnail_file_name']
            }
          }
        }
        apiRequest.request('user/retrieve', param, (response) => {
          // console.log(response)
          let userInformation = {id: userID}
          userInformation.profilePictureLink = response.data.user_profile_picture ? Config.FILE_SERVER_URL + '/files/' + response.data.user_profile_picture.thumbnail_file_name : require('@/vue-web-core/assets/img/no-profile-pic.jpg')
          commit('setUserInformation', userInformation)
        }, (errorResponse) => {
          console.error('Error in store company information', errorResponse)
        })

      }
    },
  }
})
export default store
