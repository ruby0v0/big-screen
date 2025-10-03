import type { Trends } from './types'
import request from '@/utils/request'

export function fetchTrends(): Promise<Trends[]> {
  return request({
    url: '/trends/list',
    method: 'GET',
  })
}
