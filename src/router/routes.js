const viewModules = import.meta.glob('../pages/*.vue')

const routerOptions = [
  {
    path: '/',
    component: 'Landing',
    meta: { title: 'FashyLeaks' },
  },
  {
    path: '/iron-march',
    component: 'Dataset',
    meta: { title: 'FashyLeaks | Iron March' },
    props: { dataset: 'iron-march' },
  },
  {
    path: '/fascist-forge',
    component: 'Dataset',
    meta: { title: 'FashyLeaks| Fascist Forge' },
    props: { dataset: 'fascist-forge' },
  },
  {
    path: '/rope-culture',
    component: 'Dataset',
    meta: { title: 'FashyLeaks| Rope Culture' },
    props: { dataset: 'rope-culture' },
  },
  {
    path: '/about',
    component: 'About',
    meta: { title: 'FashyLeaks | About' },
  },
  {
    path: '/:catchAll(.*)*',
    component: 'ErrorNotFound',
    meta: { title: 'FashyLeaks | Page Not Found' },
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
