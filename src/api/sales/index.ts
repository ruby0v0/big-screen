import type { Sales } from './types'
import request from '@/utils/request'

export function fetchSales(): Promise<Sales[]> {
  return request({
    url: '/sales/list',
    method: 'GET',
  })
}
