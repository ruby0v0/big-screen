import type { Stock } from './types'
import request from '@/utils/request'

export function fetchStock(): Promise<Stock[]> {
  return request({
    url: '/stock/list',
    method: 'GET',
  })
}
