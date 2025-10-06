<script setup lang="ts">
import type { Trend } from '@/api/trends/types'
import * as echarts from 'echarts'
import { fetchTrends } from '@/api/trends'
import { useAsync } from '@/hooks'
import Title from '../../Title.vue'

const trends = ref<Trend[]>([])

const opt = computed<echarts.EChartsCoreOption>(() => ({
  grid: {
    top: '25%',
    right: '4%',
    bottom: '1%',
    left: '3%',
    containLabel: true,
  },
  tooltip: {
    trigger: 'axis',
  },
  legend: {
    top: '8%',
    left: 20,
    icon: 'circle',
    data: trends.value.map(item => item.name),
    textStyle: {
      color: '#aaa',
    },
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
    boundaryGap: false,
  },
  yAxis: {
    type: 'value',
  },
  series: getSeries(),
}))

function getSeries() {
  // 半透明的颜色值
  const colors1 = [
    'rgba(11, 168, 44, 0.5)',
    'rgba(44, 110, 255, 0.5)',
    'rgba(22, 242, 217, 0.5)',
    'rgba(254, 33, 30, 0.5)',
    'rgba(250, 105, 0, 0.5)',
  ]
  // 全透明的颜色值
  const colors2 = [
    'rgba(11, 168, 44, 0)',
    'rgba(44, 110, 255, 0)',
    'rgba(22, 242, 217, 0)',
    'rgba(254, 33, 30, 0)',
    'rgba(250, 105, 0, 0)',
  ]
  return trends.value.map((item, index) => ({
    name: item.name,
    type: 'line',
    data: item.data,
    smooth: true,
    itemStyle: {
      borderWidth: 4,
    },
    lineStyle: {
      width: 3,
    },
    symbol: 'circle',
    areaStyle: {
      color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        offset: 0,
        color: colors1[index]!,
      }, {
        offset: 1,
        color: colors2[index]!,
      }]),
    },
  }))
}

async function getTrends() {
  useAsync(fetchTrends, {
    onSuccess: (data) => {
      trends.value = data
    },
    onError: (err) => {
      console.error('获取地区销量趋势失败', err)
    },
  })
}

onMounted(() => {
  getTrends()
})
</script>

<template>
  <div class="screen-block">
    <Title title="地区销量趋势" />
    <div class="h-9/10 w-full">
      <v-chart :opt="opt" />
    </div>
  </div>
</template>

<style scoped>
.screen-block {
  height: 550px;
  width: 100%;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-top: 20px;
  animation: slide 1.5s;
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
