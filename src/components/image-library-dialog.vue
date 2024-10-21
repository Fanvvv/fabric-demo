<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getAllFiles } from '@/lib/indexedDB'
import { file2Base64, formatFileSize } from '@/lib/utils'
import { Checkbox } from '@/components/ui/checkbox'

// 从 indexedDB 中获取所有图片
const filesList = ref()
onMounted(async () => {
  const files = await getAllFiles()

  filesList.value = await Promise.all(files.map(async file => ({
    uuid: file.uuid,
    name: file.name,
    url: await file2Base64(file.data),
    size: formatFileSize(file.data.size),
  })))
})

const isOpen = ref(false)

function handleConfirm() {
  console.log('confirm')
  isOpen.value = false
}
</script>

<template>
  <Dialog :open="isOpen">
    <DialogTrigger as-child>
      <Button class="w-full mt-2" @click="isOpen = true">
        从图库中选择
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>选择图片</DialogTitle>
      </DialogHeader>

      <div
        class="w-full h-[500px] overflow-y-auto flex flex-wrap gap-2"
      >
        <div
          v-for="(file, index) in filesList"
          :key="index"
          class="relative w-[200px] flex flex-col overflow-hidden rounded-md shadow-sm hover:shadow-md
          transition-all duration-300 cursor-pointer"
        >
          <Checkbox class="absolute top-2 right-2" />
          <img class="w-[200px] h-[200px] object-cover" :src="file.url" alt="">
          <div class="p-2">
            <div class="text-sm whitespace-nowrap overflow-hidden text-ellipsis">
              {{ file.name }}
            </div>
            <div class="text-xs text-gray-500">
              {{ file.size }}
            </div>
          </div>
        </div>
      </div>
      <DialogFooter as-child>
        <div class="flex gap-2">
          <Button @click="handleConfirm">
            确认
          </Button>
          <Button variant="outline" @click="isOpen = false">
            取消
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
