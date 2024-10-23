<script setup lang="ts">
import { ref } from 'vue'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { deleteFilesByUUID, getAllFiles } from '@/lib/indexedDB'
import { cn, file2Base64, formatFileSize } from '@/lib/utils'
import { showAlert, showConfirmDialog } from '@/lib/alert'
import { useAddImage } from '@/hooks/add-image'
import UploadFile from '@/components/upload-file.vue'
import { Input } from '@/components/ui/input'

interface IFileItem {
  uuid: string
  name: string
  url: string
  size: string
  selected: boolean
}

// 从 indexedDB 中获取所有图片
const filesList = ref<IFileItem[]>([])
const selectedFiles = ref<IFileItem[]>([])

async function getFilesList() {
  const files = await getAllFiles()

  filesList.value = await Promise.all(files.map(async file => ({
    uuid: file.uuid,
    name: file.name,
    url: await file2Base64(file.data),
    size: formatFileSize(file.data.size),
    selected: false, // 是否选中
  })))
}

const isOpen = ref(false)

async function handleOpen() {
  isOpen.value = true
  await getFilesList()
}

function handleSelect(file: IFileItem) {
  file.selected = !file.selected
  if (file.selected) {
    selectedFiles.value.push(file)
  }
  else {
    selectedFiles.value = selectedFiles.value.filter(f => f.uuid !== file.uuid)
  }
}

const { fileUploadedCallback, onFileInputChange } = useAddImage()
const loading = ref(false)
async function handleConfirm() {
  try {
    loading.value = true
    if (selectedFiles.value.length === 0) {
      showAlert({
        title: '请选择图片',
        description: '请选择至少一张图片',
        type: 'error',
      })
      return
    }
    await Promise.all(selectedFiles.value.map(async (file) => {
      await fileUploadedCallback(file.url, file.uuid, file.name)
    }))
    selectedFiles.value = []
    isOpen.value = false
  }
  catch (e) {
    return e
  }
  finally {
    loading.value = false
  }
}

async function handleUpload() {
  // 不需要上传到indexedDB
  // await fileUploadedCallback(file, uuid)
  await getFilesList()
}

function handleDelete() {
  if (selectedFiles.value.length === 0) {
    showAlert({
      title: '请选择图片',
      description: '请选择至少一张图片',
      type: 'error',
    })
    return
  }
  showConfirmDialog({
    title: '删除图片',
    description: '确定要删除选中的图片吗？',
  }).then(async (res) => {
    if (res) {
      await deleteFilesByUUID(selectedFiles.value.map(file => file.uuid))
      selectedFiles.value = []
      await getFilesList()
      showAlert({
        title: '删除成功',
        type: 'success',
      })
    }
  })
}

const fileInput = ref<typeof Input | null>(null)

function handleAddImage() {
  fileInput.value?.$el.click()
}
</script>

<template>
  <Dialog v-model:open="isOpen">
    <DialogTrigger as-child>
      <Button class="w-full mt-2" @click="handleOpen">
        从图库中选择
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>选择图片</DialogTitle>
      </DialogHeader>

      <div
        v-if="filesList.length"
        class="w-full flex flex-col h-[500px] gap-2"
      >
        <div class="flex justify-end">
          <Button class="mr-2" variant="outline" size="sm" @click="handleAddImage">
            <span>上传</span>
            <Input
              ref="fileInput"
              type="file"
              accept="image/*"
              :multiple="false"
              class="hidden"
              @change="onFileInputChange($event, getFilesList)"
            />
          </Button>
          <Button variant="destructive" size="sm" @click="handleDelete">
            删除
          </Button>
        </div>
        <div class="w-full flex-1 overflow-y-auto flex flex-wrap gap-2 scrollbar-thin">
          <div
            v-for="(file, index) in filesList"
            :key="index"
            :class="cn('relative w-[220px] max-h-[252px] flex flex-col overflow-hidden rounded-md border-2 border-transparent shadow-md hover:shadow-xl',
                       'transition-shadow duration-300 cursor-pointer box-border', `${file.selected ? 'border-2 border-blue-500' : ''}`)"
            @click="handleSelect(file)"
          >
            <img class="w-full h-[200px] object-cover" :src="file.url" alt="">
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
      </div>
      <div v-else>
        <div class="w-full flex flex-col items-center justify-center gap-2">
          <div class="text-center text-gray-500">
            暂无图片，请上传图片
          </div>
          <UploadFile class="w-full" @file-uploaded="handleUpload" />
        </div>
      </div>
      <DialogFooter as-child>
        <div class="flex gap-2">
          <Button :loading="loading" @click="handleConfirm">
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
