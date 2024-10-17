<script setup lang="ts">
import { v4 as uuidV4 } from 'uuid'
import type * as fabric from 'fabric'
import type { ILayerItemAtImage, ILayerItemAtText } from '@/hooks/layers'
import { ImageTypes, useLayers } from '@/hooks/layers'
import { useCanvasInfo } from '@/hooks/canvas-info'

interface IProps {
  itemObj: ILayerItemAtImage | ILayerItemAtText
}

const props = withDefaults(defineProps<IProps>(), {
  itemObj: () => ({} as ILayerItemAtImage),
})

const canvasInfo = useCanvasInfo()
const layers = useLayers()
function handleDelete(uuid: string) {
  const ctx = canvasInfo.ctx
  if (uuid && ctx) {
    const obj = ctx.getObjects().find(obj => obj.get('uuid') === uuid)
    if (obj) {
      ctx.remove(obj)

      // 同步 pinia 数据
      layers.deleteLayerItem(uuid)
    }
  }
}

async function handleCopy(uuid: string, type: ImageTypes) {
  const ctx = canvasInfo.ctx
  if (uuid && ctx) {
    const objects = ctx.getObjects()
    const objIndex = objects.findIndex(obj => obj.get('uuid') === uuid)
    const object = objects[objIndex]
    if (object) {
      const newUUID = uuidV4()
      const layerItemInfo = layers.getLayerItemByUUID(uuid)
      if (type === ImageTypes.TEXT && object.get('type') === 'textbox' && layerItemInfo?.type === ImageTypes.TEXT) {
        const newText = await object.clone() as fabric.Text
        newText.set('uuid', newUUID)
        ctx.insertAt(objIndex, newText)

        layers.cloneText({
          ...layerItemInfo,
          uuidOld: uuid,
          uuid: newUUID,
        })
      }
    }
  }
}
</script>

<template>
  <div class="my-2 p-2 border border-gray-200 rounded-md">
    <div class="flex items-center gap-2">
      <div class="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border border-gray-200 cursor-pointer">
        <template v-if="props.itemObj.type === ImageTypes.IMAGE">
          1
        </template>
        <template v-if="props.itemObj.type === ImageTypes.TEXT">
          <div class="flex items-center justify-center w-full h-full">
            <i class="iconfont icon-tianjiawenzi text-2xl text-dark-900" />
          </div>
        </template>
      </div>
      <div class="flex flex-wrap gap-2 flex-1">
        <div>
          <span class="text-sm">
            宽度&nbsp;
          </span>
          <span class="text-gray-500">
            {{ props.itemObj.width }} px
          </span>
        </div>
        <div>
          <span class="text-sm">
            高度&nbsp;
          </span>
          <span class="text-gray-500">
            {{ props.itemObj.height }} px
          </span>
        </div>
      </div>
      <div class="flex items-center gap-2">
        <i
          class="iconfont icon-shejiqi-fuzhi cursor-pointer"
          @click="handleCopy(props.itemObj.uuid, props.itemObj.type)"
        />
        <i
          class="iconfont icon-shejiqi-shanchu cursor-pointer"
          @click="handleDelete(props.itemObj.uuid)"
        />
        <i class="iconfont icon-tuodong handle-icon cursor-pointer" />
      </div>
    </div>
  </div>
</template>
