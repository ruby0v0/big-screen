import useDebounce from './useDebounce'

interface ResizeOptions {
  width?: number
  height?: number
  fullScreen?: boolean
  delay?: number
  /** 是否自动缩放 */
  auto?: boolean
  /** 是否显示滚动条 */
  showScroll?: boolean
}

function useResize(opts: ResizeOptions = {}) {
  const { fullScreen = false, delay = 300, auto = true, showScroll = false } = opts
  const screenRef = ref()
  const observer = shallowRef<MutationObserver>()
  let width: number
  let height: number
  let originalWidth: number
  let originalHeight: number

  const initSize = () => {
    return new Promise<void>((resolve) => {
      nextTick(() => {
        if (opts.width && opts.height) {
          width = opts.width
          height = opts.height
        }
        else {
          width = screenRef.value?.clientWidth
          height = screenRef.value?.clientHeight
        }

        if (!originalWidth || !originalHeight) {
          originalWidth = window.screen.width
          originalHeight = window.screen.height
        }
        resolve()
      })
    })
  }

  const initBodyStyle = () => {
    if (!showScroll) {
      document.body.style.overflow = 'hidden'
    }
  }

  const updateSize = () => {
    if (width && height) {
      screenRef.value.style.width = `${width}px`
      screenRef.value.style.height = `${height}px`
    }
    else {
      screenRef.value.style.width = `${originalWidth}px`
      screenRef.value.style.height = `${originalHeight}px`
    }
  }

  const autoScale = (scale: number) => {
    if (!auto)
      return
    const refClientWidth = screenRef.value?.clientWidth
    const refClientHeight = screenRef.value?.clientHeight
    const bodyClientWidth = document.body.clientWidth
    const bodyClientHeight = document.body.clientHeight
    screenRef.value.style.transform = `scale(${scale}, ${scale})`

    const marginX = Math.max((bodyClientWidth - refClientWidth * scale) / 2, 0)
    const marginY = Math.max((bodyClientHeight - refClientHeight * scale) / 2, 0)
    screenRef.value.style.margin = `${marginY}px ${marginX}px`
  }

  const updateScale = () => {
    const currentWidth = document.body.clientWidth
    const currentHeight = document.body.clientHeight
    const realWidth = width || originalWidth
    const realHeight = height || originalHeight
    const scaleX = currentWidth / +realWidth
    const scaleY = currentHeight / +realHeight
    if (fullScreen) {
      screenRef.value.style.transform = `scale(${scaleX}, ${scaleY})`
      return false
    }
    autoScale(Math.min(scaleX, scaleY))
  }

  const debounceResize = useDebounce(async () => {
    await initSize()
    updateSize()
    updateScale()
  }, delay)

  const initMutationObserver = () => {
    observer.value = new MutationObserver(() => {
      debounceResize()
    })
    observer.value.observe(screenRef.value, {
      attributes: true,
      attributeFilter: ['style'],
      attributeOldValue: true,
    })
  }

  onMounted(() => {
    initBodyStyle()
    nextTick(async () => {
      await initSize()
      updateSize()
      updateScale()
      window.addEventListener('resize', debounceResize)
      initMutationObserver()
    })
  })

  onBeforeUnmount(() => {
    window.removeEventListener('resize', debounceResize)
    observer.value?.disconnect()
    if (!showScroll) {
      document.body.style.overflow = 'auto'
    }
  })

  onActivated(() => {
    updateScale()
  })

  return {
    screenRef,
  }
}

export default useResize
