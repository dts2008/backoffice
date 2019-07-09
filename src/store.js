import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedIn: false,
    language: 'en'
  },
  getters: {
    LOGGEDIN: state => {
      return state.loggedIn
    }
  },
  mutations: {
    SET_LOGGEDIN: (state, loggedIn) => {
      state.loggedIn = loggedIn
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    }
  },
  actions: {
    LOGIN: (context, login, password) => {
      console.log(login, password)
      context.commit('SET_LOGGEDIN', true)
      router.push({ name: 'home' })
    },
    LOGOUT: (context) => {
      context.commit('SET_LOGGEDIN', false)
      router.push({ name: 'login' })
    },
    LANGUAGE: (context, language) => {
      context.commit('SET_LANGUAGE', language)
    }
  }
})

export default store
