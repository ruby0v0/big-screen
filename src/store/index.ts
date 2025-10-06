import type { App } from 'vue'
import { createPinia } from 'pinia'
import useConfigStore from './module/config'

const pinia = createPinia()

function setupStore(app: App) {
  app.use(pinia)
}

export default setupStore

export { useConfigStore }
