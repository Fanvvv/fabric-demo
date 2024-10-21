<script setup lang="ts">
import type { ILayerItemAtImage, ILayerItemAtText } from '@/hooks/layers'
import { ImageTypes } from '@/hooks/layers'
import { useLayerOptions } from '@/hooks/layer-options'
import { useClickThumbnail } from '@/hooks/click-thumbnail'
import { useCurrentSelected } from '@/hooks/current-selected'
import TextOptions from '@/components/text-options.vue'
import ImageOptions from '@/components/image-options.vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

interface IProps {
  itemObj: ILayerItemAtImage | ILayerItemAtText
}

const props = withDefaults(defineProps<IProps>(), {
  itemObj: () => ({} as ILayerItemAtImage),
})

const { handleCopy, handleDelete } = useLayerOptions()

const currentSelected = useCurrentSelected()
const { isOpen, handleClickThumbnail } = useClickThumbnail(props.itemObj.uuid)
</script>

<template>
  <div class="my-2 p-2 border border-gray-200 rounded-md">
    <Collapsible
      v-model:open="isOpen"
    >
      <div class="flex items-center gap-2">
        <CollapsibleTrigger as-child>
          <div
            class="w-16 h-16 flex-shrink-0 rounded-md overflow-hidden border  cursor-pointer"
            :class="currentSelected.uuid === props.itemObj.uuid ? 'border-red-900' : 'border-gray-200'"
            @click="handleClickThumbnail(props.itemObj.uuid, currentSelected.uuid === props.itemObj.uuid)"
          >
            <template v-if="props.itemObj.type === ImageTypes.IMAGE">
              <img :src="props.itemObj.url!" alt="" class="w-full h-full">
            </template>
            <template v-if="props.itemObj.type === ImageTypes.TEXT">
              <div class="flex items-center justify-center w-full h-full">
                <i class="iconfont icon-tianjiawenzi text-2xl text-dark-900" />
              </div>
            </template>
          </div>
        </CollapsibleTrigger>
        <div class="flex flex-wrap gap-2 flex-1">
          <div class="text-xs">
            <span>
              宽度&nbsp;
            </span>
            <span class="text-gray-500">
              {{ props.itemObj.width }} px
            </span>
          </div>
          <div class="text-xs">
            <span>
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
      <CollapsibleContent class="space-y-2">
        <TextOptions v-if="props.itemObj.type === ImageTypes.TEXT" />
        <ImageOptions v-if="props.itemObj.type === ImageTypes.IMAGE" />
      </CollapsibleContent>
    </Collapsible>
  </div>
</template>
