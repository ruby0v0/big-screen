import type { Rank } from './types'
import request from '@/utils/request'

export function fetchRank(): Promise<Rank[]> {
  return request({
    url: '/rank/list',
    method: 'GET',
  })
}
