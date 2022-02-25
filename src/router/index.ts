import { userStore } from '@/store'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import Home from '../views/Home.vue'

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
  {
    path: '/creature/:id',
    name: 'Creature Details',
    meta: { requiresAuth: true },
    component: () => import('../views/CreatureDetails.vue')
  },
  {
    path: '/creatures',
    name: 'Creatures',
    meta: { requiresAuth: true },
    component: () => import('../views/Creatures.vue')
  },
  {
    path: '/shops',
    name: 'Shops',
    meta: { requiresAuth: true },
    component: () => import('../views/Shops.vue')
  },
  {
    path: '/abilities',
    name: 'Abilities',
    meta: { requiresAuth: true },
    component: () => import('../views/Abilities.vue')
  },

  {
    path: '/encounter',
    name: 'Encounters',
    component: () => import('../views/Encounters.vue'),
    children: [
      {
        path: ':id',
        name: 'Encounter',
        component: () => import('../components/encounters/Encounter.vue'),
        props: true
      },
    ]
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (!userStore.getters.isIsSignedIn() && (to.name !== "Home" && to.name !== "Finish Signup")) {
    next({ name: 'Home' })
  }
  else {
    next()
  }
})

export default router
