<script setup lang="ts">
import type * as echarts from 'echarts'
import type { Hot } from '@/api/hots/types'
import { fetchHots } from '@/api/hots'
import { useAsync } from '@/hooks'
import Title from '../../Title.vue'

const hots = ref<Hot[]>([])

const opt = computed<echarts.EChartsCoreOption>(() => ({
  grid: {
    containLabel: false,
  },
  legend: {
    bottom: '0%',
    icon: 'circle',
    data: hots.value[0]?.children?.map((item) => {
      return item.name
    }),
    textStyle: {
      color: '#aaa',
    },
  },
  tooltip: {
    show: true,
    formatter: (arg: any) => {
      const thirdCategory = arg.data.children
      // 计算出所有三级分类的数值总和
      let total = 0
      thirdCategory.forEach((item: any) => {
        total += item.value
      })
      let retStr = ''
      thirdCategory.forEach((item: any) => {
        retStr += `
            ${item.name}:${`${Math.floor((item.value / total) * 100)}%`}
            <br/>
          `
      })
      return retStr
    },
  },
  series: [
    {
      type: 'pie',
      label: {
        show: false,
      },
      data: hots.value[0]?.children!.map((item) => {
        return {
          name: item.name,
          value: item.value,
          children: item.children,
        }
      }),
    },
  ],
}))

async function getHots() {
  useAsync(fetchHots, {
    onSuccess: (data) => {
      hots.value = data
    },
    onError: (err) => {
      console.error('获取热门商品失败', err)
    },
  })
}

onMounted(() => {
  getHots()
})
</script>

<template>
  <div class="screen-block">
    <Title title="热销商品的占比" />
    <div style="width: 100%; height: 90%" class="h-9/10 w-full">
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
  animation: slide 0.8s;
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
