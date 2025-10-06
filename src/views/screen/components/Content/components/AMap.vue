<script setup lang="ts">
import * as echarts from 'echarts'
import mapJson from '@/assets/data/china.json'
import mapData from '@/assets/data/map.json'
import { useConfigStore } from '@/store'
import Title from '../../Title.vue'

const configStore = useConfigStore()

echarts.registerMap('china', mapJson as Parameters<typeof echarts.registerMap>[1])

const opt = computed<echarts.EChartsCoreOption>(() => ({
  geo: {
    type: 'map',
    map: 'china',
    top: '5%',
    bottom: '5%',
    layoutCenter: ['50%', '50%'],
    layoutSize: '98%',
    itemStyle: {
      areaColor: configStore.theme === 'dark' ? '#2c3e50' : '#fff',
      borderColor: '#111',
    },
  },
  legend: {
    left: '5%',
    bottom: '5%',
    orient: 'vertical',
    data: mapData.map(item => item.name),
    textStyle: {
      color: configStore.theme === 'dark' ? '#aaa' : '#000',
    },
  },
  series: mapData.map(item => ({
    name: item.name,
    type: 'effectScatter',
    rippleEffect: {
      scale: 5,
      brushType: 'stroke',
    },
    coordinateSystem: 'geo',
    data: item.children,
  })),
}))
</script>

<template>
  <div class="screen-block">
    <Title title="商家分布" />
    <div class="h-9/10 w-full">
      <v-chart :opt="opt" />
    </div>
  </div>
</template>

<style scoped>
.screen-block {
  position: relative;
  width: 100%;
  height: 1000px;
  padding: 0 16px;
  animation: slideAndFade 1.5s;
}

@keyframes slideAndFade {
  0% {
    transform: translateY(218px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>
