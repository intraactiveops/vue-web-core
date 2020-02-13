import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/vue-web-core/system/config'
import User from '@/database/controller/user'
import apiRequest from '@/vue-web-core/system/http-request-handling/apiRequest'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isModuleLoading: false,
    authToken: null,
    companyInformation: {
      id: null,
      name: null,
      address: null,
      contact_number: null
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
      Vue.set(state.userInformation, 'profilePictureLink', typeof userInformation.profilePictureLink !== 'undefined' ? userInformation.profilePictureLink : null)
      Vue.set(state.userInformation, 'firstName', userInformation.first_name)
      Vue.set(state.userInformation, 'lastName', userInformation.last_name)
    },
    setUserRoles(state, userRoles){
      state.userRoles = userRoles
    },
    logout(state){
      Vue.set(state, 'authToken', null)
      Vue.set(state.companyInformation, 'id', null)
      Vue.set(state.companyInformation, 'name', null)
      Vue.set(state.userInformation, 'id', null)
      Vue.set(state.userInformation, 'profilePictureLink', null)
      Vue.set(state.userInformation, 'firstName', null)
      Vue.set(state.userInformation, 'lastName', null)
      localStorage.removeItem('user_id')
    }
  },
  getters: {
    user: (state) => {
      if(state.userInformation.id){
        return state.userInformation
      }else{
        return null
      }
    },
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
    setCompanyInformationOffline({ commit }){
    },
    setUserInformationOffline({ commit }){
      let userId = localStorage.getItem('user_id')
      if(!userId){
        return false
      }
      let userDB = new User()
      let param = {
        where: {
          db_id: userId * 1
        }
      }
      let userInformation = {
        id: userId,
        first_name: null,
        last_name: null
      }
      userDB.get(param).then(response => {
        let userRoles = {}
        if(response.length){
          response = response[0]
          // userInformation['id'] = response['db_id']
          userInformation['first_name'] = response['first_name']
          userInformation['last_name'] = response['last_name']
          for(let x = 0; x < response['user_roles'].length; x++){
            userRoles[response['user_roles'][x]['role_id']] = true
          }
        }
        commit('setUserRoles', userRoles)
        commit('setUserInformation', userInformation)
      })
    },
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
        console.log('firreed')
        localStorage.removeItem('user_id')
        return false
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
