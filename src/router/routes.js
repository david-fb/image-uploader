const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    meta: { authRequired: true },
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
  },
  {
    path: '/login',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', name: 'login', component: () => import('pages/LoginPage.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
