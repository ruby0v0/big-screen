<script setup lang="ts">
import * as echarts from 'echarts'
import Title from '../../Title.vue'

const data = [
  { name: '商家1', value: 99 },
  { name: '商家2', value: 88 },
  { name: '商家3', value: 77 },
  { name: '商家4', value: 66 },
  { name: '商家5', value: 55 },
  { name: '商家6', value: 44 },
]

const opt: echarts.EChartsCoreOption = {
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
    data: data.map(item => item.name),
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
    data: data.map(item => item.value),
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
</script>

<template>
  <div class="screen-block">
    <Title title="销售额" />
    <div class="h-9/10 w-full">
      <v-chart :opt="opt" />
    </div>
  </div>
</template>

<style scoped>
.screen-block {
  height: 460px;
  width: 100%;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-top: 20px;
  animation: slide 0.8s;
}

@keyframes slide {
  0% {
    transform: translateX(-100%);
  }
  80% {
    transform: translateX(20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
