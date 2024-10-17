<script setup lang="ts">
import { useCanvasInfo } from '../hooks/canvas-info'
import ColorSelectorItem from './color-selector-item.vue'
import CollapsibleTool from './collapsible-tool.vue'

const colors = ['#985', '#124', '#952', '#156', '#802', '#092']

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
  <div class="w-[350px]">
    <CollapsibleTool title="背景颜色选择">
      <div class="flex flex-wrap gap-2 mt-2">
        <ColorSelectorItem
          :close="true"
          :active="canvasInfoStore.ctx?.backgroundColor === 'transparent'"
          @click="handleSetCurrentColor(null)"
        />

        <div v-for="item in colors" :key="item">
          <ColorSelectorItem
            :color="item"
            :active="canvasInfoStore.ctx?.backgroundColor === item"
            @click="handleSetCurrentColor(item)"
          />
        </div>
      </div>
    </CollapsibleTool>
  </div>
</template>
