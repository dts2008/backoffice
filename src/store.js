import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //loggedIn: false,
    language: 'en',
    token: '',
    partners: null,
    userinfo: null
  },
  getters: {
    LOGGEDIN: state => {
      return state.token.length > 0
    },
    TOKEN: state => {
      return state.token
    },
    PARTNERS: state => {
      return state.partners
    },
    USERINFO: state => {
      return state.userinfo
    }
  },
  mutations: {
    SET_LOGGEDIN: (state, token) => {
      state.token = token
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_PARTNERS: (state, partners) => {
      state.partners = partners
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    }
  },
  actions: {
    LOGIN: (context, token) => {
      context.commit('SET_LOGGEDIN', token)
    },
    LOGOUT: (context) => {
      context.commit('SET_LOGGEDIN', '')
      router.push({ name: 'login' })
    },
    LANGUAGE: (context, language) => {
      context.commit('SET_LANGUAGE', language)
    }
  }
})

export default store
