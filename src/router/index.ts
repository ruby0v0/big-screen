import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/screen',
  },
  {
    path: '/screen',
    name: 'screen',
    component: () => import('@/views/screen/index.vue'),
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

function setupRouter(app: App) {
  app.use(router)
}

export {
  router,
}

export default setupRouter
