import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
let store = new Vuex.Store({
  state: {
    dailyEvent: true,
    channel: true,
    activity: true,
    project: true,
    following: true,
    network: true,
    contact: true
  },
  mutations: {
    reset(state, menuSetting){
      console.log(menuSetting)
      for(let menu in menuSetting){
        Vue.set(state, menu, menuSetting[menu])
      }
    },
    toggleMenu(state, menu){
      // console.log(menu, 'menu',state[menu])
      Vue.set(state, menu, !state[menu])
      localStorage.setItem('side_menu_setting', JSON.stringify(this.state))
    },
  },
  getters: {
    dailyEvent: (state) => {
      console.log(state.dailyEvent, 'state.dailyEvent')
      return state.dailyEvent
    },
    channel: (state) => {
      return state.channel
    },
    activity: (state) => {
      return state.activity
    },
    project: (state) => {
      return state.project
    },
    following: (state) => {
      return state.following
    },
    network: (state) => {
      return state.network
    },
    contact: (state) => {
      return state.contact
    },
  }
})
export default store