<script setup lang="ts">
import { computed } from 'vue'
import { useCanvasInfo } from '../hooks/canvas-info'
import ColorSelectorItem from './color-selector-item.vue'
import CollapsibleTool from './collapsible-tool.vue'
import { useLayers } from '@/hooks/layers'

const colors = ['#985', '#124', '#952', '#156', '#802', '#092']

const canvasInfo = useCanvasInfo()
const layers = useLayers()

const isTransparentActive = computed(() => layers.getLayerBgColor() === 'transparent')
const isColorActive = (color: string) => computed(() => layers.getLayerBgColor() === color)

function handleSetCurrentColor(color: string | null) {
  if (canvasInfo.ctx) {
    canvasInfo.ctx.backgroundColor = color ?? 'transparent'
    layers.setLayerBgColor(color ?? 'transparent')
    canvasInfo.ctx.renderAll()
  }
}
</script>

<template>
  <div class="w-[350px]" v-bind="$attrs">
    <CollapsibleTool title="背景颜色">
      <div class="flex flex-wrap gap-2 mt-2">
        <ColorSelectorItem
          :close="true"
          :active="isTransparentActive"
          @click="handleSetCurrentColor(null)"
        />

        <div v-for="item in colors" :key="item">
          <ColorSelectorItem
            :color="item"
            :active="isColorActive(item).value"
            @click="handleSetCurrentColor(item)"
          />
        </div>
      </div>
    </CollapsibleTool>
  </div>
</template>
