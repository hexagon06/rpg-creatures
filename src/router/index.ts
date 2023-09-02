import { auth } from '@/api'
import { useUserStore } from '@/store/users'
import Vue from 'vue'
import VueRouter, { RouteRecordRaw, createRouter, createWebHashHistory } from 'vue-router'
import { getStandardRoute } from './standardRoute'

const sessionRoute = getStandardRoute({ path: 'session', cased: 'Session' })

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: { name: 'Home' },
  },
  {
    path: '/home',
    name: 'Home',
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/maintenance',
    component: () => import('../views/Maintenance.vue'),
  },
  getStandardRoute({ path: 'creature', cased: 'Creature' }),
  {
    ...sessionRoute,
    children: sessionRoute.children.concat([{
      path: ':id/run/:runId',
      name: 'Session Run',
      meta: {
        requiresAuth: true,
        actionsComponent: 'session-run-actions',
      },
      component: () => import('../components/sessions/SessionRun.vue'),
      props: true,
    }]),
  },
  getStandardRoute({ path: 'encounter', cased: 'Encounter' }),
  getStandardRoute({ path: 'idea', cased: 'Idea' }),
  getStandardRoute({ path: 'list', cased: 'List' }),
  getStandardRoute({ path: 'critter', cased: 'Critter' }),
]

export const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta) {
    if (to.meta.requiresAuth && !auth.auth) next({ name: 'Home' })
    if (to.meta.requiresAdmin && !useUserStore().isAdmin) next({ name: 'Home' })
  }
  next()
})

export default router
