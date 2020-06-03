import Vue from 'vue'
import Vuex from 'vuex'

let store = new Vuex.Store({
  state: {
    deferredPrompt: null
  },
  getters: {
    canInstall(state){
      return state.deferredPrompt
    },
  },
  mutations: {
    deferredPrompt(state, e){
      Vue.set(state, 'deferredPrompt', e)
    },
    install(state, callbackFn){
      if(state.deferredPrompt){
        state.deferredPrompt.prompt()
        this.deferredPrompt.userChoice.then((choiceResult) => {
          if(typeof callbackFn === 'function'){
            callbackFn(choiceResult.outcome === 'accepted')
          }
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt')
          } else {
            console.log('User dismissed the A2HS prompt')
          }
        })
      }
    }
  }
})

export default store
