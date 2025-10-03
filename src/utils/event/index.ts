/* eslint-disable ts/no-unsafe-function-type, unused-imports/no-unused-vars */

const emit = ['API:UN_AUTHORIZED', 'API:INVALID', 'API:NETWORK_ERROR', 'API:SESSION_EXPIRED'] as const

type Emit = typeof emit[number]

class EventBus {
  private listeners: Record<Emit, Set<Function>> = {
    'API:UN_AUTHORIZED': new Set(),
    'API:INVALID': new Set(),
    'API:NETWORK_ERROR': new Set(),
    'API:SESSION_EXPIRED': new Set(),
  }

  /** 注册事件监听器 */
  on(event: Emit, callback: Function) {
    this.listeners[event].add(callback)
  }

  /** 触发事件 */
  emit(event: Emit, ...args: any[]) {
    this.listeners[event].forEach(callback => callback(...args))
  }
}

export default new EventBus()
