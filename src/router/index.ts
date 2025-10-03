import type { App } from 'vue'
import type { RouteRecordRaw } from 'vue-router'
import { createDiscreteApi } from 'naive-ui'
import { createRouter, createWebHashHistory } from 'vue-router'
import eventBus from '@/utils/event'

const { message } = createDiscreteApi(['message'])

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

eventBus.on('API:SESSION_EXPIRED', () => {
  message?.warning('登录过期，请重新登录')
})

eventBus.on('API:INVALID', () => {
  message?.warning('请求参数错误')
})

eventBus.on('API:NETWORK_ERROR', () => {
  message?.warning('网络错误，请稍后重试')
})

function setupRouter(app: App) {
  app.use(router)
}

export {
  router,
}

export default setupRouter
