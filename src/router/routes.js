const routes = [
  {
    path: '/',
    component: () => import('pages/SiteLanding.vue'),
  },
  {
    path: '/about',
    component: () => import('pages/SiteAbout.vue'),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
