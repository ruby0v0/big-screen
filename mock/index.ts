import type { MockMethod } from 'vite-plugin-mock'
import Mock from 'mockjs'
import { getJsonFile } from './utils'

export default [
  {
    url: '/api/sales/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        msg: 'success',
        ...getJsonFile('./data/sales.json'),
      })
    },
  },
  {
    url: '/api/trends/list',
    method: 'get',
    response: () => {
      return Mock.mock({
        code: 200,
        msg: 'success',
        ...getJsonFile('./data/trends.json'),
      })
    },
  },
] as MockMethod[]
