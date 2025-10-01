import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {},
  presets: [presetAttributify(), presetIcons(), presetWind3()],
  transformers: [transformerDirectives(), transformerVariantGroup()],
})
