<script setup lang="ts">
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'

interface Props {
  opt: echarts.EChartsCoreOption
  loading: boolean
}

const props = defineProps<Props>()

const chartRef = shallowRef<HTMLDivElement>()

const chartIns = shallowRef<ECharts>()

function init() {
  if (props.opt) {
    chartIns.value = echarts.init(chartRef.value)
    setOption(props.opt)
  }
}

function setOption(opt: echarts.EChartsCoreOption, notMerge?: boolean, lazyUpdate?: boolean) {
  if (chartIns.value) {
    chartIns.value.setOption(opt, notMerge, lazyUpdate)
  }
}

function resize() {
  if (chartIns.value) {
    chartIns.value.resize()
  }
}

onMounted(() => {
  init()
})

watch(() => props.opt, (v) => {
  setOption(v)
})

defineExpose({
  chartIns,
  setOption,
  resize,
})
</script>

<template>
  <div ref="chartRef" class="h-full w-full" />
</template>

<style scoped>

</style>
