const viewModules = import.meta.glob('../pages/*.vue')

const routerOptions = [
  {
    path: '/',
    component: 'Landing',
    meta: { title: 'Decoherence Archive' },
  },
  {
    path: '/iron-march',
    component: 'Dataset',
    meta: { title: 'Decoherence Archive | Iron March' },
    props: { dataset: 'iron-march' },
  },
  {
    path: '/fascist-forge',
    component: 'Dataset',
    meta: { title: 'Decoherence Archive | Fascist Forge' },
    props: { dataset: 'fascist-forge' },
  },
  {
    path: '/rope-culture',
    component: 'Dataset',
    meta: { title: 'Decoherence Archive | Rope Culture' },
    props: { dataset: 'rope-culture' },
  },
  {
    path: '/about',
    component: 'About',
    meta: { title: 'Decoherence Archive | About' },
  },
  {
    path: '/:catchAll(.*)*',
    component: 'ErrorNotFound',
    meta: { title: 'Decoherence Archive | Page Not Found' },
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
