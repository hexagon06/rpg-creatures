import { auth } from '@/api'
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
  // {
  //   path: '/shops',
  //   name: 'Shops',
  //   meta: { requiresAuth: true },
  //   component: () => import('../views/Shops.vue')
  // },
  // {
  //   path: '/abilities',
  //   name: 'Abilities',
  //   meta: { requiresAuth: true },
  //   component: () => import('../views/Abilities.vue')
  // },
  // {
  //   path: '/maintenance',
  //   name: 'Maintenance',
  //   meta: { requiresAuth: true },
  //   component: () => import('../views/Maintenance.vue')
  // },

  {
    path: '/encounter',
    name: 'Encounters',
    meta: { requiresAuth: true },
    component: () => import('../views/Encounters.vue'),
    children: [
      {
        path: ':id',
        name: 'Encounter',
        meta: { requiresAuth: true },
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
  if (to.meta) {
    if (to.meta.requiresAuth && !auth.auth) next({ name: 'Home' })
    if (to.meta.requiresAdmin && !userStore.state.isAdmin) next({ name: 'Home' })
  }
  next()
})

export default router
