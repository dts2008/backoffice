import Vue from 'vue'
import Router from 'vue-router'
import Partners from './views/Partners.vue'
import Users from './views/Users.vue'
import store from './store'
import Login from '@/views/Login.vue'
import Help from '@/views/Help.vue'

Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', name: 'Partners', component: Partners },
    { path: '/users', name: 'Users', component: Users },
    { path: '/login', name: 'login', component: Login },
    { path: '/help', name: 'help', component: Help }
  ]
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login']
  const authRequired = !publicPages.includes(to.path)

  if (authRequired && !store.getters.LOGGEDIN) {
    return next('/login')
  }

  next()
})

export default router
