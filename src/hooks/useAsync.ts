import useLoading from './useLoaing'

interface UseAsyncOptions<T, P extends any[]> {
  immediate?: boolean
  isShallowRef?: boolean
  params?: P
  onSuccess?: (data: T) => void
  onError?: (err: unknown) => void
  onBefore?: () => void
}

interface UseAsyncResult<T, P extends any[]> {
  data: Ref<T | undefined>
  loading: Ref<boolean>
  error: Ref<unknown>
  execute: (...args: P) => Promise<T | undefined>
}

function useAsync<T, P extends any[] = []>(
  callback: (...args: P) => Promise<T>,
  opts: UseAsyncOptions<T, P> = {},
): UseAsyncResult<T, P> {
  const {
    immediate = true,
    isShallowRef = false,
    params = [] as unknown as P,
    onSuccess,
    onError,
    onBefore,
  } = opts

  const [loading, setLoading] = useLoading()
  const data = isShallowRef ? shallowRef<T>() : ref<T>()
  const error = ref<unknown>()

  const execute = async (...args: P) => {
    try {
      setLoading(true)
      error.value = null
      onBefore?.()
      data.value = await callback(...args)
      onSuccess?.(data.value)
      return data.value
    }
    catch (err) {
      error.value = err
      onError?.(err)
      return undefined
    }
    finally {
      setLoading(false)
    }
  }

  if (immediate) {
    watchEffect(() => {
      if (params) {
        execute(...unref(params))
      }
    })
  }

  return {
    data,
    loading,
    error,
    execute,
  }
}

export default useAsync
