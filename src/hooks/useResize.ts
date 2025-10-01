function useResize() {
  const screenRef = ref()
  const scale = ref()

  return {
    screenRef,
    scale,
  }
}

export default useResize
