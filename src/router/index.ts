import { userStore } from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { nextTick } from 'vue/types/umd'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/creature/:id',
    name: 'Creature Details',
    component: () => import('../views/CreatureDetails.vue')
  },
  {
    path: '/creatures',
    name: 'Creatures',
    component: () => import('../views/Creatures.vue')
  },
  {
    path: '/shops',
    name: 'Shops',
    component: () => import('../views/Shops.vue')
  },
  {
    path: '/abilities',
    name: 'Abilities',
    component: () => import('../views/Abilities.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!userStore.getters.isIsSignedIn() && to.name !== "Home") {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})

export default router
