import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

let store = new Vuex.Store({
  state: {
    profileCards: {}
  },
  mutations: {
    openCard(state, profileCardId){
      for(let key in state.profileCards){
        Vue.set(state.profileCards, key, false)
      }
      Vue.set(state.profileCards, profileCardId, true)
    },
    closeCard(state, profileCardId){
      Vue.set(state.profileCards, profileCardId, false)
    },
    closeAllCards(state){
      for(let key in state.profileCards){
        Vue.set(state.profileCards, key, false)
      }
    },
  },
  getters: {
    profileCards: (state) => {
      return state.profileCards
    }
  }
})
export default store

var waitForJQuery = setInterval(function () {
  if (typeof $ !== 'undefined') {
    $(window).click(event => {
      if ($(event.target).hasClass('profile-card-toggler') === false) {
        if ($(event.target).parents('div.profile-card').length === 0) { // outside profile card
          store.commit('closeAllCards')
        }
      }
    })

    $(window).keyup(event => {
      if (event.keyCode === 27) { // ESC key
        store.commit('closeAllCards')
      }
    })

    clearInterval(waitForJQuery)
  }
}, 10)
