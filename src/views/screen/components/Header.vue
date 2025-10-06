<script setup lang="ts">
import { Icon } from '@iconify/vue'
import dayjs from 'dayjs'
import { useConfigStore } from '@/store'

const configStore = useConfigStore()

const datetime = ref(dayjs().format('YYYY-MM-DD HH:mm:ss'))

const timer = ref<ReturnType<typeof setTimeout>>()

const iconName = computed(() => configStore.theme === 'dark' ? 'lucide:sun' : 'lucide:moon')

function updateDatetime() {
  timer.value = setTimeout(() => {
    datetime.value = dayjs().format('YYYY-MM-DD HH:mm:ss')
    updateDatetime()
  }, 1000)
}

onMounted(() => {
  updateDatetime()
})

onBeforeUnmount(() => {
  clearTimeout(timer.value)
})
</script>

<template>
  <div class="screen-header">
    <h1 class="h-[calc(var(--ds-header-height)-20px)] flex items-center">
      <span>Logo</span>
    </h1>
    <div
      class="absolute left-1/2 top-1/2 h-[var(--ds-header-height)] w-122.5 flex items-center justify-center text-7.5 -translate-x-1/2 -translate-y-1/2"
    >
      {{ configStore.title }}
    </div>
    <div class="absolute right-0 top-1/2 flex items-center -translate-y-8/10">
      <Icon
        class="mr-4 cursor-pointer stroke-white transition-all hover:scale-120" :icon="iconName" width="30" height="30"
        @click="configStore.setTheme(configStore.theme === 'dark' ? 'light' : 'dark')"
      />
      <span>{{ datetime }}</span>
    </div>
  </div>
</template>

<style scoped>
.screen-header {
  position: relative;
  height: var(--ds-header-height);
  width: 100%;
  background-image: url('/src/assets/img/header.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: fade 3s;
}

@keyframes fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
