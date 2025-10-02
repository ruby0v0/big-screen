<script setup lang="ts">
import type { ECharts } from 'echarts'
import * as echarts from 'echarts'
import Title from './Title.vue'

const chartRef = shallowRef<HTMLDivElement>()

const chartIns = shallowRef<ECharts>()

const opts: echarts.EChartsCoreOption = {
  tooltip: {
    trigger: 'axix',
    axisPointer: {
      type: 'line',
      z: 0,
      lineStyle: {
        color: '#2d3443',
      },
    },
  },
  xAxis: {
    splitLine: {
      show: false,
    },
    axisLine: {
      show: true,
    },
    type: 'value',
  },
  yAxis: {
    type: 'category',
    data: ['商家1', '商家2', '商家3', '商家4', '商家5', '商家6'],
    inverse: true,
    axisLabel: {
      color: '#fff',
    },
    grid: {
      top: '3%',
      right: '4%',
      bottom: '3%',
      left: '3%',
      containLabel: true,
    },
  },
  series: [{
    type: 'bar',
    label: {
      show: true,
      position: 'right',
    },
    data: [5, 20, 36, 10, 10, 20],
    barWidth: 20,
    roundCap: true,
    showBackground: true,
    backgroundStyle: {
      color: 'rgba(220, 220, 220, 0.3)',
    },
    itemStyle: {
      borderWidth: 0,
      borderRadius: [0, 10, 10, 0],
      color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [{
        offset: 0,
        color: '#00fffb',
      }, {
        offset: 1,
        color: '#0061ce',
      }]),
    },
  }],
}

function renderChart() {
  chartIns.value = echarts.init(chartRef.value)
  chartIns.value?.setOption(opts)
}

onMounted(() => {
  renderChart()
})
</script>

<template>
  <div class="screen-block">
    <Title title="销售额" />
    <div ref="chartRef" class="h-9/10 w-full" />
  </div>
</template>

<style scoped>
.screen-block {
  height: 460px;
  width: 100%;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-top: 20px;
}
</style>
