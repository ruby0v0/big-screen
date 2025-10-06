<script setup lang="ts">
import AMap from './components/AMap.vue'
</script>

<template>
  <div class="map-container">
    <AMap />
  </div>
</template>

<style scoped>
.map-container {
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
