const viewModules = import.meta.glob('../pages/*.vue')

const routerOptions = [
  {
    path: '/',
    component: 'Landing',
    meta: { title: 'Decoherence Archives' },
  },
  {
    path: '/iron-march',
    component: 'Dataset',
    meta: { title: 'Decoherence Archives | Iron March' },
    props: { dataset: 'iron-march' },
  },
  {
    path: '/fascist-forge',
    component: 'Dataset',
    meta: { title: 'Decoherence Archives | Fascist Forge' },
    props: { dataset: 'fascist-forge' },
  },
  {
    path: '/rope-culture',
    component: 'Dataset',
    meta: { title: 'Decoherence Archives | Rope Culture' },
    props: { dataset: 'rope-culture' },
  },
  {
    path: '/about',
    component: 'About.vue',
  },
  {
    path: '/about',
    component: 'About',
    meta: { title: 'Decoherence Archives | About' },
  },
  {
    path: '/:catchAll(.*)*',
    component: 'ErrorNotFound',
    meta: { title: 'Decoherence Archives | Page Not Found' },
  },
]

const routes = routerOptions.map((route) => {
  const componentPath = `../pages/${route.component}.vue`
  const loader = viewModules[componentPath]

  return {
    ...route,
    component: loader,
  }
})

export default routes
