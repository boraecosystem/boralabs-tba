import { createRouter, createWebHistory } from 'vue-router';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/Index.vue')
    },
    {
      path: '/tba/721/:id',
      name: 'detail721',
      component: () => import('@/views/Detail.vue'),
      meta: {
        type: 721
      }
    },
    {
      path: '/tba/1155/:id',
      name: 'detail1155',
      component: () => import('@/views/Detail.vue'),

      meta: {
        type: 1155
      }
    },
    {
      path: '/tba/6551/:id',
      name: 'detail6551',
      component: () => import('@/views/Detail.vue'),

      meta: {
        type: 6551
      }
    },
    {
      path: '/:pathMatch(.*)',
      name: 'notfound',
      component: () => import('@/components/service/NotFound.vue')
    }
  ]
});

export default router;
