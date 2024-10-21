<script setup lang="ts">
import * as fabric from 'fabric'
import { BigNumber } from 'bignumber.js'
import { storeToRefs } from 'pinia'
import CollapsibleTool from './collapsible-tool.vue'
import UploadFile from './upload-file.vue'
import { file2Base64 } from '@/lib/utils'
import { useCanvasInfo } from '@/hooks/canvas-info'
import type { ICreatePerfectImage } from '@/hooks/layers'
import { useLayers } from '@/hooks/layers'

const canvasInfo = useCanvasInfo()
const { ctx, canvasWidth } = storeToRefs(canvasInfo)
const layers = useLayers()
async function handleFileUploaded(file: File, uuid: string) {
  const image = await file2Base64(file)

  if (ctx.value) {
    const imageObj = await fabric.FabricImage.fromURL(image)

    imageObj.set('uuid', uuid)
    const left = new BigNumber(canvasWidth.value).dividedBy(2).toNumber()
    const top = left
    const width = Number(imageObj.get('width').toFixed(0))
    const height = Number(imageObj.get('height').toFixed(0))
    let scaleX = Number(imageObj.get('scaleX'))
    let scaleY = Number(imageObj.get('scaleY'))

    if (width > canvasWidth.value) {
      const scalingFactor = width > height ? width : height
      scaleX = Number(new BigNumber(canvasWidth.value).dividedBy(scalingFactor).toFixed(2))
      scaleY = scaleX
    }

    imageObj.set('left', left)
    imageObj.set('top', top)
    imageObj.set('scaleX', scaleX)
    imageObj.set('scaleY', scaleY)
    imageObj.set('originX', 'center')
    imageObj.set('originY', 'center')

    ctx.value?.add(imageObj)
    layers.createPerfectImage({
      uuid,
      url: image,
      name: file.name,
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
    } as ICreatePerfectImage)
    ctx.value?.renderAll()
  }
}
</script>

<template>
  <div class="w-[350px]" v-bind="$attrs">
    <CollapsibleTool title="添加图片">
      <div class="p-2">
        <UploadFile @file-uploaded="handleFileUploaded" />
      </div>
    </CollapsibleTool>
  </div>
</template>
