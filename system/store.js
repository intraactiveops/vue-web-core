import Vue from 'vue'
import Vuex from 'vuex'
import Config from '@/vue-web-core/system/config'
import User from '@/database/controller/user'
import apiRequest from '@/vue-web-core/system/http-request-handling/apiRequest'
Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    isModuleLoading: null,
    hasInitialized: false,
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
      Vue.set(state.companyInformation, 'code', companyInformation.code)
      Vue.set(state.companyInformation, 'address', companyInformation.address)
      Vue.set(state.companyInformation, 'contact_number', companyInformation.contact_number)
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
    setHasInitialized(state, hasInitialized){
      state.hasInitialized = hasInitialized
    },
    isReady(state, callback){
      let interval
      console.log('state', state.hasInitialized)
      if(state.hasInitialized){
        callback()
      }else{
        interval = setInterval(() => {
          if(state.hasInitialized){
            callback()
            clearInterval(interval)
          }
          console.log('state2', state.hasInitialized)
        }, 100)
      }
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
    setUserInformationOffline({ commit }){
      let userId = localStorage.getItem('user_id')
      if(!userId){
        commit('setHasInitialized', true)
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
        commit('setHasInitialized', true)
      })
    },
    setUserInformation({ commit }){
      if(!localStorage.getItem('default_auth_token')){
        localStorage.removeItem('user_id')
        localStorage.removeItem('company_id')
        localStorage.removeItem('roles')
        commit('setHasInitialized', true)
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
            },
            company_user: {
              select: {
                0: 'id',
                company: {
                  select: {
                    0: 'name',
                    1: 'code',
                    company_detail: {
                      select: ['address', 'contact_number']
                    }
                  }
                }
              }
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
          if(response['data']['company_user'] && response['data']['company_user']['company']){
            commit('setCompanyInformation', {
              id: response['data']['company_user']['company']['id'],
              name: response['data']['company_user']['company']['name'],
              code: response['data']['company_user']['company']['code'],
              address: response['data']['company_user']['company']['company_detail']['address'],
              contact_number: response['data']['company_user']['company']['company_detail']['contact_number'],
            })
          }

          commit('setUserRoles', userRoles)
          commit('setHasInitialized', true)
        }, (errorResponse) => {
          commit('setHasInitialized', true)
          console.error('Error in store company information', errorResponse)
        })
      }else{
        commit('setHasInitialized', true)
      }
    },
  }
})
export default store
