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
    contactinfo: null,
    partnerfileinfo: null,
    isError: false,
    errorId: 0,
    eventinfo: null
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
    PARTNERFILEINFO: state => {
      return state.partnerfileinfo
    },
    ISERROR: state => {
      return state.isError
    },
    ERRORID: state => {
      return state.errorId
    },
    EVENTINFO: state => {
      return state.eventinfo
    }
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
    SET_PARTNERFILEINFO: (state, partnerfileinfo) => {
      state.partnerfileinfo = partnerfileinfo
    },
    SET_ISERROR: (state, isError) => {
      state.isError = isError
    },
    SET_ERRORID: (state, errorId) => {
      state.errorId = errorId
    },
    SET_EVENTINFO: (state, eventinfo) => {
      state.eventinfo = eventinfo
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
    },
    SETERROR: (context, error) => {
      context.commit('SET_ERRORID', error.error_id)
      context.commit('SET_ISERROR', true)
    }
  }
})

export default store
