function useLoading(initialValue: boolean = false) {
  const loading = ref(initialValue)

  const setLoading = (value: boolean) => {
    loading.value = value
  }

  return [
    loading,
    setLoading,
  ] as const
}

export default useLoading
