<script setup lang="ts">
import Viewer from './views/viewer.vue'
import ToolBar from './views/tool-bar.vue'
</script>

<template>
  <div class="container">
    <Viewer />
    <ToolBar />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  height: 100vh;
}
</style>
