<script setup lang="ts">
import * as fabric from 'fabric'
import { BigNumber } from 'bignumber.js'
import CollapsibleTool from './collapsible-tool.vue'
import UploadFile from './upload-file.vue'
import { file2Base64 } from '@/lib/utils'
import { useCanvasInfo } from '@/hooks/canvas-info'
import type { ICreatePerfectImage } from '@/hooks/layers'
import { useLayers } from '@/hooks/layers'

const canvasInfo = useCanvasInfo()
const layers = useLayers()
async function handleFileUploaded(file: File, uuid: string) {
  const base64Img = await file2Base64(file)
  // console.log(base64Img)

  const imageObj = new fabric.FabricImage(base64Img)
  console.log(imageObj)
  imageObj.set('uuid', uuid)

  const canvasWidth = canvasInfo.canvasWidth
  const left = new BigNumber(canvasWidth).dividedBy(2).toNumber()
  const top = left
  const width = Number(imageObj.get('width').toFixed(0))
  const height = Number(imageObj.get('height').toFixed(0))
  const scaleX = Number(imageObj.get('scaleX'))
  const scaleY = Number(imageObj.get('scaleY'))

  imageObj.set('left', left)
  imageObj.set('top', top)

  canvasInfo.ctx?.add(imageObj)
  layers.createPerfectImage({
    uuid,
    url: base64Img,
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
}
</script>

<template>
  <div v-bind="$attrs">
    <CollapsibleTool title="添加图片">
      <div class="p-2">
        <UploadFile @file-uploaded="handleFileUploaded" />
      </div>
    </CollapsibleTool>
  </div>
</template>
