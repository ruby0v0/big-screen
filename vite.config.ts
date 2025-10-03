import { fileURLToPath, URL } from 'node:url'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig } from 'vite'
import { viteMockServe } from 'vite-plugin-mock'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    viteMockServe({
      mockPath: 'mock',
      enable: true,
    }),
    UnoCSS(),
    AutoImport({
      dts: 'src/types/auto-import.d.ts',
      imports: ['vue', 'vue-router', {
        'naive-ui': [
          'useDialog',
          'useMessage',
          'useNotification',
          'useLoadingBar',
        ],
      }],
    }),
    Components({
      dts: 'src/types/components.d.ts',
      resolvers: [NaiveUiResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
