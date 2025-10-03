import axios from 'axios'
import eventBus from '@/utils/event'
import { ResultEnum } from './types'

const request = axios.create({
  baseURL: '/api',
  timeout: 1000 * 10,
  withCredentials: true,
})

/** 请求拦截器 */
request.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  },
)

/** 响应拦截器 */
request.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code === ResultEnum.LOGINOUT) {
      eventBus.emit('API:SESSION_EXPIRED')
      return Promise.reject(res)
    }
    if (res.code !== ResultEnum.SUCCESS) {
      eventBus.emit('API:INVALID')
      return Promise.reject(res)
    }
    return res.data
  },
  (error) => {
    eventBus.emit('API:NETWORK_ERROR')
    return Promise.reject(error)
  },
)

export default request
