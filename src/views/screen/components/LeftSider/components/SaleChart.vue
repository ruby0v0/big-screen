<script setup lang="ts">
import type { Socket } from 'socket.io-client'
import type { Sale } from '@/api/sales/types'
import * as echarts from 'echarts'
import { io } from 'socket.io-client'
import { fetchSales } from '@/api/sales'
import { useAsync } from '@/hooks'
import Title from '../../Title.vue'

const sales = ref<Sale[]>([])

const socket = ref<Socket>()
const status = ref<'connecting' | 'connected' | 'disconnected'>('connecting')

function initSocket() {
  socket.value = io('http://localhost:3000', {
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
  })

  socket.value.on('connect', () => {
    status.value = 'connected'
  })

  socket.value.on('disconnect', () => {
    status.value = 'disconnected'
  })

  socket.value.on('sales', (data) => {
    sales.value = data
  })
}

const opt = computed<echarts.EChartsCoreOption>(() => ({
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
    data: sales.value.map(item => item.name),
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
    data: sales.value.map(item => item.value),
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
}))

async function getSales() {
  useAsync(fetchSales, {
    onSuccess: (data) => {
      sales.value = data
    },
    onError: (err) => {
      console.error('获取地区销量趋势失败', err)
    },
  })
}

onMounted(() => {
  initSocket()
  getSales()
})

onBeforeUnmount(() => {
  socket.value?.disconnect()
})
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
