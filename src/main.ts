import { createApp } from 'vue'
import setupRouter from '@/router'
import App from './App.vue'
import '@/assets/css/index.scss'
import 'virtual:uno.css'

const app = createApp(App)
setupRouter(app)
app.mount('#app')
