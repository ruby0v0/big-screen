import useDebounce from './useDebounce'

interface ResizeOptions {
  width?: number
  height?: number
  fullScreen?: boolean
  delay?: number
}

const WIDTH = 1920

const HEIGHT = 1080

function useResize(options: ResizeOptions = {}) {
  const { width = WIDTH, height = HEIGHT, fullScreen = true, delay = 300 } = options
  const screenRef = ref()
  const scale = ref(1)

  const resize = () => {
    const clientHeight = document.body.clientHeight
    const clientWidth = document.body.clientWidth

    const scaleX = clientWidth / width
    const scaleY = clientHeight / height
    scale.value = Math.min(scaleX, scaleY)

    if (fullScreen) {
      screenRef.value.style.transform = `scale(${scaleX}, ${scaleY})`
    }
    else {
      screenRef.value.style.transform = `scale(${scale.value})`
      screenRef.value.style.left = `${(clientWidth - width * scale.value) / 2}px`
      screenRef.value.style.top = `${(clientHeight - height * scale.value) / 2}px`
    }
  }

  const debounceResize = useDebounce(resize, delay)

  onMounted(() => {
    if (screenRef.value) {
      resize()
      window.addEventListener('resize', debounceResize)
    }
  })

  onUnmounted(() => {
    window.removeEventListener('resize', debounceResize)
  })

  return {
    screenRef,
    scale,
  }
}

export default useResize
