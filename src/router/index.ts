import { auth } from '@/api'
import { userStore } from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'
import { getStandardRoute } from './standardRoute'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    redirect: { name: 'Home' }
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  getStandardRoute({ path: 'creature', cased: 'Creature' }),
  getStandardRoute({ path: 'session', cased: 'Session' }),
  getStandardRoute({ path: 'encounter', cased: 'Encounter' }),
  getStandardRoute({ path: 'idea', cased: 'Idea' }),
  getStandardRoute({ path: 'list', cased: 'List' }),
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta) {
    if (to.meta.requiresAuth && !auth.auth) next({ name: 'Home' })
    if (to.meta.requiresAdmin && !userStore.state.isAdmin) next({ name: 'Home' })
  }
  next()
})

export default router
