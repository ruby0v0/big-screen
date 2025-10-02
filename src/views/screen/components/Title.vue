<script setup lang="ts">
interface Props {
  title: string
}

defineProps<Props>()
</script>

<template>
  <h3 class="title">
    <slot>
      {{ title }}
    </slot>
  </h3>
</template>

<style scoped>
.title {
  position: relative;
  padding-left: 10px;
}

.title::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 3px;
  height: 100%;
  background-color: var(--ds-screen-text-color);
}
</style>
