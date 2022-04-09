
export function getStandardRoute (config: {
  path: string,
  cased: string,
}
) {
  const routeRoot = `/${config.path}`
  return {
    path: routeRoot,
    name: `${config.cased}s`,
    meta: { requiresAuth: true },
    component: () => import(`../views/${config.cased}s.vue`),
    redirect: `${routeRoot}/list`,
    children: [
      {
        path: 'list',
        name: `${config.cased} List`,
        meta: {
          requiresAuth: true,
          actionsComponent: `${config.path}s-filter`
        },
        component: () => import(`../components/${config.path}s/${config.cased}List.vue`),
      },
      {
        path: ':id',
        name: `${config.cased}`,
        meta: {
          requiresAuth: true,
          actionsComponent: `${config.path}-actions`
        },
        component: () => import(`../components/${config.path}s/${config.cased}.vue`),
        props: true,
      },
      {
        path: ':id/edit',
        name: `Edit ${config.cased}`,
        meta: {
          requiresAuth: true,
          actionsComponent: `${config.path}-actions`
        },
        component: () => import(`../components/${config.path}s/${config.cased}Edit.vue`),
        props: true
      },
    ]
  }
}
