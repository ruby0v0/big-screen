<script setup lang="ts">
import { useResize } from '@/hooks'

const { screenRef } = useResize()
</script>

<template>
  <div class="h-full w-full overflow-hidden" bg="[length:100%_100%] black">
    <div
      ref="screenRef"
      class="relative h-1080px w-1920px origin-[0_0] overflow-hidden transition-all duration-500"
    >
      <img src="./assets//img/bg.jpg" alt="">
    </div>
  </div>
</template>

<style scoped></style>
