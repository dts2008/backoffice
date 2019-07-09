import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './i18n'
import FlagIcon from 'vue-flag-icon'

Vue.config.productionTip = false
Vue.use(FlagIcon)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
