import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { getJsonFile } from './utils'

export default [
  {
    url: '/api/sale/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        msg: 'success',
        ...getJsonFile('./data/sale.json'),
      })
    },
  },
  {
    url: '/api/trend/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        msg: 'success',
        ...getJsonFile('./data/trend.json'),
      })
    },
  },
] as MockMethod[]
