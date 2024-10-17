<script setup lang="ts">
import Viewer from './views/viewer.vue'
import ToolBar from './views/tool-bar.vue'
</script>

<template>
  <div class="flex justify-center select-none">
    <div class="flex items-center h-[100vh] w-full max-w-[2000px]">
      <div class="flex-1">
        <Viewer />
      </div>
      <ToolBar />
    </div>
  </div>
</template>
