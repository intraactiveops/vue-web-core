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
      profilePictureLink: null,
      firstName: null,
      lastName: null,
    },
    userRoles: {
    }
  },
  mutations: {
    setModuleLoading(state, isLoading){
      Vue.set(state, 'isModuleLoading', isLoading)
    },
    setAuthToken(state, token){
      Vue.set(state, 'authToken', token)
    },
    setCompanyInformation(state, companyInformation){
      Vue.set(state.companyInformation, 'id', companyInformation.id)
      Vue.set(state.companyInformation, 'name', companyInformation.name)
    },
    setUserInformation(state, userInformation){
      Vue.set(state.userInformation, 'id', userInformation.id)
      Vue.set(state.userInformation, 'profilePictureLink', userInformation.profilePictureLink)
      Vue.set(state.userInformation, 'firstName', userInformation.first_name)
      Vue.set(state.userInformation, 'lastName', userInformation.last_name)
    },
    setUserRoles(state, userRoles){
      state.userRoles = userRoles
    }
  },
  getters: {
    authToken: (state) => {
      return state.authToken
    },
    userRoles: (state) => {
      return state.userRoles
    },
    userInformation: (state) => {
      return state.userInformation
    },
    companyInformation: (state) => {
      return state.companyInformation
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
          commit('setCompanyInformation', { id: companyID, name: response.data.name })
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
      let companyID = localStorage.getItem('company_id')
      if(userID){
        let param = {
          id: userID,
          select: {
            0: 'username',
            user_roles: {
              select: ['role_id'],
              condition: [{
                column: 'company_id',
                value: companyID
              }]
            },
            user_basic_information: {
              select: ['first_name', 'last_name']
            },
            user_profile_picture: {
              select: ['thumbnail_file_name']
            }
          },
        }
        apiRequest.request('user/retrieve', param, (response) => {
          let userInformation = {
            id: userID,
            first_name: null,
            last_name: null
          }
          userInformation.profilePictureLink = response.data.user_profile_picture ? Config.FILE_SERVER_URL + '/files/' + response.data.user_profile_picture.thumbnail_file_name : require('@/vue-web-core/assets/img/no-profile-pic.jpg')
          if(response['data']['user_basic_information']){
            userInformation.first_name = response['data']['user_basic_information']['first_name']
            userInformation.last_name = response['data']['user_basic_information']['last_name']
          }
          commit('setUserInformation', userInformation)
          let userRoles = {}
          if(response['data']['user_roles']){
            for(let x = 0; x < (response['data']['user_roles']).length; x++){
              userRoles[response['data']['user_roles'][x]['role_id']] = {}
            }
          }
          commit('setUserRoles', userRoles)
        }, (errorResponse) => {
          console.error('Error in store company information', errorResponse)
        })
      }
    },
  }
})
export default store
