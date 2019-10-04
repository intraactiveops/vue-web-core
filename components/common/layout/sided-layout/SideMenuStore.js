import Vuex from 'vuex'
import Vue from 'vue'
let store = new Vuex.Store({
  state: {
    menus: [{
      name: 'Channel',
      icon: 'envelope',
      is_toggled: false
    }, {
      name: 'Networks',
      icon: 'users',
      is_toggled: false
    }, {
      name: 'Activity',
      icon: 'calendar-week',
      is_toggled: false
    }, {
      name: 'Me TV',
      icon: 'tv',
      is_toggled: false
    }, {
      name: 'Me Pay',
      icon: 'credit-card',
      is_toggled: false
    }]
  },
  mutations: {
    toggleMenu(state, index){
      console.log(state)
      Vue.set(state['menus'][index], 'is_toggled', !state['menus'][index]['is_toggled'])
    }
  }
})
export default store