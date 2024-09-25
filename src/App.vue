<script setup lang="ts">
import Viewer from './views/viewer.vue'
import ToolBar from './views/tool-bar.vue'
</script>

<template>
  <div class="flex justify-center">
    <div class="flex items-center h-[100vh] max-w-[2000px]">
      <Viewer />
      <ToolBar />
    </div>
  </div>
</template>
