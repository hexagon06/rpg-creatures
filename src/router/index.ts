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
    path: '/creature',
    name: 'Creatures',
    meta: { requiresAuth: true },
    component: () => import('../views/Creatures.vue'),
    redirect: '/creature/list',
    children: [
      {
        path: 'list',
        name: 'Creature List',
        meta: {
          requiresAuth: true,
          actionsComponent: 'creatures-filter'
        },
        component: () => import('../components/creatures/CreatureList.vue')
      },
      {
        path: ':id',
        name: 'Creature',
        meta: {
          requiresAuth: true,
          actionsComponent: 'creature-actions'
        },
        component: () => import('../components/creatures/Creature.vue'),
        props: true
      },
      {
        path: ':id/edit',
        name: 'Edit Creature',
        meta: {
          requiresAuth: true,
          actionsComponent: 'creature-actions'
        },
        component: () => import('../components/creatures/CreatureEdit.vue'),
        props: true
      },
    ],
  },
  {
    path: '/encounter',
    name: 'Encounters',
    meta: { requiresAuth: true },
    component: () => import('../views/Encounters.vue'),
    redirect: '/encounter/list',
    children: [
      {
        path: 'list',
        name: 'Encounter List',
        meta: {
          requiresAuth: true,
          actionsComponent: 'encounters-filter'
        },
        component: () => import('../components/encounters/EncounterList.vue'),
      },
      {
        path: ':id',
        name: 'Encounter',
        meta: {
          requiresAuth: true,
          actionsComponent: 'encounter-actions'
        },
        component: () => import('../components/encounters/Encounter.vue'),
        props: true,
      },
      {
        path: ':id/edit',
        name: 'Edit Encounter',
        meta: {
          requiresAuth: true,
          actionsComponent: 'encounter-actions'
        },
        component: () => import('../components/encounters/EncounterEdit.vue'),
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
