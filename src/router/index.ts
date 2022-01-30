import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
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

export default router
