import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/game',
    name: 'game',
    component: () => import('../views/MapView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
