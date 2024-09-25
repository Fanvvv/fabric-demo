<script setup lang="ts">
import Viewer from './views/viewer.vue'
import ToolBar from './views/tool-bar.vue'
</script>

<template>
  <div class="page-container">
    <Viewer />
    <ToolBar />
  </div>
</template>

<style scoped>
.page-container {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>
