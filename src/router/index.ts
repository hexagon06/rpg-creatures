import { auth } from '@/api'
import { useUserStore } from '@/store/users'
import { useWorldStore } from '@/store/worlds'
import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import { Dictionary } from 'vue-router/types/router'
import Home from '../views/Home.vue'
import { getStandardRoute } from './standardRoute'

Vue.use(VueRouter)

const sessionRoute = getStandardRoute({ path: 'session', cased: 'Session' })

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
  {
    ...sessionRoute,
    children: sessionRoute.children.concat([{
      path: ':id/run/:runId',
      name: `Session Run`,
      meta: {
        requiresAuth: true,
        actionsComponent: `session-run-actions`
      },
      component: () => import(`../components/sessions/SessionRun.vue`),
      props: true,
    }])
  },
  getStandardRoute({ path: 'encounter', cased: 'Encounter' }),
  getStandardRoute({ path: 'idea', cased: 'Idea' }),
  getStandardRoute({ path: 'list', cased: 'List' }),
  {
    path: '/world/:id?',
    props: true,
    name: `World`,
    meta: { requiresAuth: true },
    component: () => import(`../views/World.vue`),
    children: [
      // {
      //   path: 'list',
      //   name: `${config.cased} List`,
      //   meta: {
      //     requiresAuth: true,
      //     actionsComponent: `${config.path}s-filter`
      //   },
      //   component: () => import(`../components/${config.path}s/${config.cased}List.vue`),
      // },
    ],
  },
  // getStandardRoute({ path: 'world', cased: 'World' }),
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta) {
    if (to.meta.requiresAuth && !auth.auth) next({ name: 'Home' })
    if (to.meta.requiresAdmin && !useUserStore().isAdmin) next({ name: 'Home' })
  }
  next()
})

// router.beforeEach((to, from, next) => {
//   if (to.name === 'World' && to.params['id'] === undefined) {
//     const { lastWorldId } = useWorldStore()
//     if (lastWorldId) {
//       const params = {} as Dictionary<string>
//       params['id'] = lastWorldId
//       next({ name: to.name, params })
//     }
//   }
//   next()
// })

export default router
