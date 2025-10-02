<script setup lang="ts">
import { useResize } from '@/hooks'
import Header from './components/Header.vue'
import LeftSider from './components/LeftSider.vue'
import RightSider from './components/RightSider.vue'

const { screenRef } = useResize()
</script>

<template>
  <div class="h-full w-full overflow-hidden" bg="[length:100%_100%] black">
    <div
      ref="screenRef"
      class="relative h-1080px w-1920px origin-[0_0] overflow-hidden transition-all duration-500"
    >
      <!-- <img src="../../assets//img/bg.jpg" alt=""> -->
      <div class="screen">
        <Header />
        <div class="screen-main">
          <div class="screen-left">
            <LeftSider />
          </div>
          <div class="screen-center">
            2
          </div>
          <div class="screen-right">
            3
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.screen {
  --ds-screen-height: 1080px;
  --ds-screen-width: 1920px;
  --ds-header-height: 72px;
  --ds-block-bg: #222733;
  -ds-screen-bg: rgb(22, 21, 24);
  --ds-screen-text-color: white;
  position: absolute;
  padding: 0 20px;
  background: var(--ds-screen-bg);
  color: var(--ds-screen-text-color);
}

.screen-main {
  position: relative;
  display: flex;
  height: calc(100% - var(--ds-header-height));
}

.screen-center {
  flex: 1;
  width: calc(var(--ds-screen-width) - 1000px);
}

.screen-left,
.screen-right {
  width: 460px;
}
</style>
