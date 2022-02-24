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
  // {
  //   path: "/users",
  //   name: 'Users',
  //   meta: { requiresAuth: true, requiresAdmin: true },
  //   redirect: 'Account',
  //   component: () => import('../views/Users.vue'),
  //   children: [
  //     {
  //       path: 'invite',
  //       name: 'Invite',
  //       meta: { requiresAuth: true, requiresAdmin: true },
  //       component: () => import('../components/users/Invite.vue')
  //     },
  //     {
  //       path: 'finishSignup',
  //       name: 'Finish Signup',
  //       meta: { guest: true },
  //       component: () => import('../components/users/FinishSignup.vue')
  //     },
  //     {
  //       path: 'account',
  //       name: 'Account',
  //       meta: { requiresAuth: true },
  //       component: () => import('../components/users/Account.vue')
  //     }
  //   ]
  // }
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
