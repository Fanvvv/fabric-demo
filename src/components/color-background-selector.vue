<script setup lang="ts">
import { useCanvasInfo } from '../hooks/canvas-info'
import ColorSelectorItem from './color-selector-item.vue'

const colors = ['red', 'blue', 'green', 'yellow', 'pink', 'purple']

const canvasInfoStore = useCanvasInfo()

function handleSetCurrentColor(color: string | null) {
  if (canvasInfoStore.ctx) {
    if (color) {
      canvasInfoStore.ctx.backgroundColor = color
    }
    else {
      canvasInfoStore.ctx.backgroundColor = 'transparent'
    }
    canvasInfoStore.ctx.renderAll()
  }
}
</script>

<template>
  <div>
    <div>
      背景颜色选择
    </div>
    <div class="list">
      <ColorSelectorItem :close="true" @click="handleSetCurrentColor(null)" />

      <div v-for="item in colors" :key="item">
        <ColorSelectorItem :color="item" @click="handleSetCurrentColor(item)" />
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}
</style>
