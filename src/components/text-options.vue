<script setup lang="ts">
import { computed } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import ColorPicker from '@/components/color-picker.vue'
import { useAlign } from '@/hooks/align'
import { useLayers } from '@/hooks/layers'
import { useCanvasInfo } from '@/hooks/canvas-info'
import { useCurrentSelected } from '@/hooks/current-selected'
import type { ILayerItemAtText } from '@/hooks/layers'
import { useSystemFont } from '@/hooks/system-font'

const { iconList, handleAlignItem } = useAlign()
const layers = useLayers()
const canvasInfo = useCanvasInfo()
const currentSelected = useCurrentSelected()
const { systemFont } = useSystemFont()

const ctx = canvasInfo.ctx
const text = computed({
  get() {
    return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.text || ''
  },
  set(value) {
    if (ctx) {
      ctx.getActiveObject()?.set('text', value)
      ctx.requestRenderAll()
      layers.updateTextItem({
        uuid: currentSelected.uuid!,
        text: value,
      })
    }
  },
})

const angle = computed({
  get() {
    const deg = Number((layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.angle.toFixed(0))
    if (deg === 360) {
      return 0
    }
    return deg % 360
  },
  set(value) {
    if (ctx) {
      const deg = Number(value.toFixed(0))
      ctx.getActiveObject()?.set('angle', deg)
      ctx.requestRenderAll()
      layers.updateLayerItem({
        uuid: currentSelected.uuid!,
        angle: deg % 360,
      })
    }
  },
})

const fontFamily = computed({
  get() {
    return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.fontFamily || ''
  },
  set(value) {
    if (ctx) {
      ctx.getActiveObject()?.set('fontFamily', value)
      ctx.requestRenderAll()
      layers.updateTextItem({
        uuid: currentSelected.uuid!,
        fontFamily: value,
      })
    }
  },
})
const color = computed({
  get() {
    return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.fill || '#000000'
  },
  set(value) {
    if (ctx) {
      ctx.getActiveObject()?.set('fill', value)
      ctx.requestRenderAll()
      layers.updateTextItem({
        uuid: currentSelected.uuid!,
        fill: value,
      })
    }
  },
})
</script>

<template>
  <div class="border-t border-gray-200 py-2 mt-2">
    <div class="flex flex-col gap-2 p-2">
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">文本内容：</label>
        <Textarea id="text-color" v-model="text" class="flex-2" />
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">字体：</label>
        <Select v-model="fontFamily" class="w-full">
          <SelectTrigger>
            <SelectValue placeholder="请选择字体" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="font in systemFont"
                :key="font"
                :value="font"
              >
                <span :style="{ 'font-family': font }">
                  {{ font }}
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">颜色：</label>
        <Input v-model="color" class="mr-2 flex-1" />
        <ColorPicker v-model="color" class="flex-shrink-0" />
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">角度(deg)：</label>
        <NumberField v-model="angle" :min="0" :max="360" :step="45">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
    </div>
    <div class="border-t border-gray-200 py-2 mt-2">
      <div class="text-sm font-bold mb-2">
        对齐方式
      </div>
      <div class="flex gap-2">
        <template v-for="item in iconList" :key="item.id">
          <Button variant="outline" size="icon" :title="item.name" @click="handleAlignItem(item.id)">
            <i class="iconfont" :class="item.icon" />
          </Button>
        </template>
      </div>
    </div>
  </div>
</template>
