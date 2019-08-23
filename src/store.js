import Vue from 'vue'
import Vuex from 'vuex'
import router from '@/router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    //loggedIn: false,
    language: 'en',
    token: '',
    userinfo: null,
    partnerinfo: null,
    contactinfo: null
  },
  getters: {
    LOGGEDIN: state => {
      return state.token.length > 0
    },
    TOKEN: state => {
      return state.token
    },
    USERINFO: state => {
      return state.userinfo
    },
    PARTNERINFO: state => {
      return state.partnerinfo
    },
    CONTACTINFO: state => {
      return state.contactinfo
    },
  },
  mutations: {
    SET_LOGGEDIN: (state, token) => {
      state.token = token
    },
    SET_LANGUAGE: (state, language) => {
      state.language = language
    },
    SET_PARTNERINFO: (state, partnerinfo) => {
      state.partnerinfo = partnerinfo
    },
    SET_USERINFO: (state, userinfo) => {
      state.userinfo = userinfo
    },
    SET_CONTACTINFO: (state, contactinfo) => {
      state.contactinfo = contactinfo
    },
    
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
