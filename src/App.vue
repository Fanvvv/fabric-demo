<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import Viewer from './views/viewer.vue'
import ToolBar from './views/tool-bar.vue'
import CustomAlertContainer from './components/custom-alert-container.vue'
import { useKeyboard } from './hooks/keyboard'

const keyboard = useKeyboard()

onMounted(() => {
  keyboard.addEvent()
})

onUnmounted(() => {
  keyboard.removeEvent()
})
</script>

<template>
  <div class="flex justify-center select-none">
    <div class="flex items-center h-[100vh] w-full max-w-[2000px]">
      <div class="flex-1">
        <Viewer />
      </div>
      <ToolBar />
    </div>
    <CustomAlertContainer />
  </div>
</template>
