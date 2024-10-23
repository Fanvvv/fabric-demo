<script setup lang="ts">
import CollapsibleTool from '@/components/collapsible-tool.vue'
import UploadFile from '@/components/upload-file.vue'
import ImageLibraryDialog from '@/components/image-library-dialog.vue'
import { useAddImage } from '@/hooks/add-image'

const { fileUploadedCallback } = useAddImage()
</script>

<template>
  <div class="w-[350px]" v-bind="$attrs">
    <CollapsibleTool title="添加图片">
      <div class="p-2">
        <UploadFile @file-uploaded="fileUploadedCallback" />
        <ImageLibraryDialog />
      </div>
    </CollapsibleTool>
  </div>
</template>
