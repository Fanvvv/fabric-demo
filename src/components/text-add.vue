<script setup lang="ts">
import { computed, ref } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import * as fabric from 'fabric'
import BigNumber from 'bignumber.js'
import CollapsibleTool from './collapsible-tool.vue'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { useCanvasInfo } from '@/hooks/canvas-info'
import { useLayers } from '@/hooks/layers'
import { showAlert } from '@/lib/alert'

const text = ref<string>('')
const textChange = computed({
  get() {
    return text.value
  },
  set(value) {
    text.value = value
  },
})

const canvasInfo = useCanvasInfo()
const layers = useLayers()
function createText() {
  if (!textChange.value || textChange.value.trim() === '') {
    showAlert({
      title: '错误',
      description: '文本不能为空',
      type: 'error',
    })
    return
  }

  const uuid = uuidV4()

  if (canvasInfo.ctx) {
    const textObj = new fabric.Textbox(textChange.value, {
      uuid,
      originX: 'center',
      originY: 'center',
      opacity: 1,
      strokeWidth: 0,
    })

    const canvasWidth = canvasInfo.canvasWidth
    const left = new BigNumber(canvasWidth).dividedBy(2).toNumber()
    const top = left

    textObj.set('left', left)
    textObj.set('top', top)
    const width = Number(textObj.get('width').toFixed(0))
    const height = Number(textObj.get('height').toFixed(0))
    const scaleX = textObj.get('scaleX')
    const scaleY = textObj.get('scaleY')

    canvasInfo.ctx.add(textObj)

    layers.createPerfectText({
      uuid,
      text: textChange.value,
      width,
      height,
      left,
      top,
      scaleX,
      scaleY,
      angle: 0,
      flipX: false,
      flipY: false,
      opacity: 1,
    })
  }
}
</script>

<template>
  <div class="w-[350px]" v-bind="$attrs">
    <CollapsibleTool title="创建文本">
      <div class="p-2">
        <Textarea v-model="textChange" />
        <div class="flex gap-2 mt-2">
          <Button class="flex-1" @click="createText">
            创建
          </Button>
          <Button class="flex-1" variant="outline" @click="text = ''">
            清空
          </Button>
        </div>
      </div>
    </CollapsibleTool>
  </div>
</template>
