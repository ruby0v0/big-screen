<script setup lang="ts">
import type { Stock } from '@/api/stocks/types'
import * as echarts from 'echarts'
import { fetchStock } from '@/api/stocks'
import { useAsync } from '@/hooks'
import Title from '../../Title.vue'

const stock = ref<Stock[]>([])

const opt = computed<echarts.EChartsCoreOption>(() => ({
  series: getSeries(stock.value),
}))

function getSeries(state: Stock[]) {
  const centerArr = [
    ['18%', '40%'],
    ['50%', '40%'],
    ['82%', '40%'],
    ['34%', '75%'],
    ['66%', '75%'],
  ]
  const colorArr = [
    ['#4FF778', '#0BA82C'],
    ['#E5DD45', '#E8B11C'],
    ['#E8821C', '#E55445'],
    ['#5052EE', '#AB6EE5'],
    ['#23E5E5', '#2E72BF'],
  ]

  const titleFontSize = (460 / 100) * 3.6
  const innerRadius = titleFontSize * 2.8
  const outerRadius = innerRadius * 1.125

  return state.map((item, index) => {
    return {
      type: 'pie',
      center: centerArr[index],
      radius: [outerRadius, innerRadius],
      emphasis: {
        scale: false,
      },
      labelLine: {
        show: false,
      },
      data: [
        {
          name: `${item.name}\n\n${item.sales}`,
          value: item.sales,
          itemStyle: {
            color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
              {
                offset: 0,
                color: colorArr[index]![0]!,
              },
              {
                offset: 1,
                color: colorArr[index]![1]!,
              },
            ]),
          },
          label: {
            position: 'center',
            color: colorArr[index]![0]!,
            fontSize: titleFontSize / 2,
          },
        },
        {
          value: item.stock,
          itemStyle: {
            color: '#333843',
          },
        },
      ],
    }
  })
}

async function getStock() {
  useAsync(fetchStock, {
    onSuccess: (data) => {
      stock.value = data
    },
    onError: (err) => {
      console.error('获取库存商品失败', err)
    },
  })
}

onMounted(() => {
  getStock()
})
</script>

<template>
  <div class="screen-block">
    <Title title="库存商品的占比" />
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
  animation: slide 1s;
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
