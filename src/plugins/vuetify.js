import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'

//import en from 'vuetify/src/locale/en.ts'
//import ru from 'vuetify/src/locale/ru.ts'

import VueI18n from '@/i18n'

Vue.use(Vuetify, {
  iconfont: 'md',
  lang: {
    //locales: { en: en, ru: ru },
    t: (key, ...params) => VueI18n.t(key, params)
  }
})