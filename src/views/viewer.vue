<script setup lang="ts">
import CanvasView from '../components/canvas-view.vue'
</script>

<template>
  <div class="viewer-container">
    <CanvasView />
  </div>
</template>

<style lang="scss" scoped>
.viewer-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70vw;
  min-width: 510px;
  height: 90vh;
}
</style>
