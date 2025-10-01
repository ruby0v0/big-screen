<script setup lang="ts">
import { useResize } from '@/hooks'

const { screenRef } = useResize()
</script>

<template>
  <div ref="screenRef">
    <img src="./assets//img/bg.jpg" alt="">
  </div>
</template>

<style scoped></style>
