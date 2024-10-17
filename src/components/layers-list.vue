<script setup lang="ts">
import draggable from 'vuedraggable'
import LayersItem from './layers-item.vue'
import { useLayers } from '@/hooks/layers'

const layers = useLayers()
</script>

<template>
  <div class="text-base font-bold">
    图层
  </div>
  <div class="w-[350px] overflow-y-auto scrollbar-thin px-2 pb-2">
    <draggable
      v-if="layers.layerList.length"
      :list="layers.layerList"
      handle=".handle-icon"
      item-key="uuid"
    >
      <template #item="{ element }">
        <div>
          <LayersItem :item-obj="element" />
        </div>
      </template>
    </draggable>
    <div v-else>
      <div class="flex flex-col items-center justify-center">
        <div class="text-gray-500">
          暂无图层，请添加
        </div>
        <img src="@/assets/images/none.png" alt="" class="w-full h-full">
      </div>
    </div>
  </div>
</template>
