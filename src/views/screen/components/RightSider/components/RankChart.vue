<script setup lang="ts">
import type { Rank } from '@/api/ranks/types'
import * as echarts from 'echarts'
import { fetchRank } from '@/api/ranks'
import { useAsync } from '@/hooks'
import Title from '../../Title.vue'

const colorArr = [
  ['#0BA82C', '#4FF778'],
  ['#2E72BF', '#23E5E5'],
  ['#5052EE', '#AB6EE5'],
]
const startValue = ref(0)
const endValue = ref(7)
const barWidth = 20

const ranks = ref<Rank[]>([])

const opt = computed<echarts.EChartsCoreOption>(() => ({
  grid: {
    top: '10%',
    left: '5%',
    right: '5%',
    bottom: '5%',
    containLabel: true,
  },
  tooltip: {
    show: true,
  },
  xAxis: {
    type: 'category',
    axisTick: { show: false },
    data: ranks.value.map(item => item.name),
  },
  yAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLine: { show: true },
  },
  dataZoom: {
    show: false,
    startValue: startValue.value,
    endValue: endValue.value,
  },
  series: [
    {
      type: 'bar',
      data: ranks.value.map(item => item.value),
      barWidth,
      itemStyle: {
        borderRadius: [barWidth / 2, barWidth / 2, 0, 0],
        color: (arg: any) => {
          let targetColorArr: string[] | undefined
          if (arg.value > 300) {
            targetColorArr = colorArr[0]
          }
          else if (arg.value > 200) {
            targetColorArr = colorArr[1]
          }
          else {
            targetColorArr = colorArr[2]
          }
          return new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: targetColorArr![0]!,
            },
            {
              offset: 1,
              color: targetColorArr![1]!,
            },
          ])
        },
      },
    },
  ],
}))

function getRank() {
  useAsync(fetchRank, {
    onSuccess: (res) => {
      ranks.value = res
    },
    onError: (err) => {
      console.error('获取销售排行失败', err)
    },
  })
}

onMounted(() => {
  getRank()
})
</script>

<template>
  <div class="screen-block">
    <Title title="地区销售排行" />
    <div class="h-9/10 w-full">
      <v-chart :opt="opt" />
    </div>
  </div>
</template>

<style scoped>
.screen-block {
  width: 100%;
  height: 320px;
  background-color: var(--ds-block-bg);
  padding: 16px;
  margin-top: 20px;
  animation: slide 1.5s;
}

@keyframes slide {
  0% {
    transform: translateX(100%);
  }
  80% {
    transform: translateX(-20px);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
