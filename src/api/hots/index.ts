import type { Hot } from './types'
import request from '@/utils/request'

export function fetchHots(): Promise<Hot[]> {
  return request({
    url: '/hots/list',
    method: 'GET',
  })
}
