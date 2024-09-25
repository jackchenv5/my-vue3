import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/time',
      name: 'time',
      component: () => import('../views/Time.vue')
    },
    {
      path: '/budget',
      name: 'budget',
      component: () => import('../views/Budget.vue')
    },
    {
      path: '/quality',
      name: 'quality',
      component: () => import('../views/Qualityfiy.vue')
    },
    {
      path: '/tzz',
      name: 'tzz',
      component: () => import('../views/Touzi.vue')
    },
    {
      path: '/shenchanlv',
      name: 'shenchanlv',
      component: () => import('../views/Shenchanlv.vue')
    },
    {
      path: '/manyidu1',
      name: 'manyidu1',
      component: () => import('../views/Manyidu1.vue')
    },
    {
      path: '/manyidu2',
      name: 'manyidu2',
      component: () => import('../views/Manyidu2.vue')
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    }
  ]
})

export default router
