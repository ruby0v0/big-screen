import { createApp } from 'vue'
import AppChart from '@/components/AppChart'
import setupRouter from '@/router'
import setupStore from '@/store'
import App from './App.vue'

import '@/assets/css/index.scss'
import 'virtual:uno.css'

const app = createApp(App)
setupRouter(app)
setupStore(app)
app.use(AppChart)
app.mount('#app')
