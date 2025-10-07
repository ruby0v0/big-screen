import type { Socket } from 'socket.io-client'
import { io } from 'socket.io-client'

interface SocketOptions {
  autoConnect?: boolean
  reconnectionAttempts?: number
  reconnectionDelay?: number
}

type SocketStatus = 'connecting' | 'connected' | 'disconnected' | 'error'

type Event<T = any> = (data: T) => void

function useSocket(url: string, opts: SocketOptions = {}) {
  const { autoConnect = true, reconnectionAttempts = 5, reconnectionDelay = 3000 } = opts
  const socket = ref<Socket>()
  const status = ref<SocketStatus>('connecting')
  const lastError = ref<Error | null>(null)
  const callbacks = new Map<string, Event>()

  const initSocket = () => {
    socket.value = io(url, {
      reconnection: true,
      reconnectionAttempts,
      reconnectionDelay,
    })

    socket.value.on('connect', () => {
      status.value = 'connected'
      lastError.value = null
    })

    socket.value.on('disconnect', () => {
      status.value = 'disconnected'
    })

    socket.value.on('error', (err) => {
      status.value = 'error'
      lastError.value = err
    })

    socket.value.onAny((event, data) => {
      const callback = callbacks.get(event)
      if (callback) {
        callback(data)
      }
    })
  }

  const subscribe = <T>(event: string, callback: Event<T>) => {
    callbacks.set(event, callback as Event)
  }

  const unsubscribe = (event: string) => {
    callbacks.delete(event)
  }

  const connect = () => {
    if (!socket.value) {
      initSocket()
    }
    socket.value?.connect()
  }

  const disconnect = () => {
    socket.value?.disconnect()
    callbacks.clear()
  }

  if (autoConnect) {
    connect()
  }

  return {
    socket,
    status,
    lastError,
    subscribe,
    unsubscribe,
    connect,
    disconnect,
  }
}

export default useSocket
