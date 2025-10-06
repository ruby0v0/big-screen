import type { Sale } from './types'
import request from '@/utils/request'

export function fetchSales(): Promise<Sale[]> {
  return request({
    url: '/sales/list',
    method: 'GET',
  })
}
