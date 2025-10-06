import { defineStore } from 'pinia'

interface ConfigState {
  title: string
  theme: 'light' | 'dark'
}

const useConfigStore = defineStore('config', {
  state: (): ConfigState => ({
    title: '大屏数据可视化',
    theme: 'dark',
  }),
  actions: {
    setTheme(theme: 'light' | 'dark') {
      this.theme = theme
    },
  },
})

export default useConfigStore
