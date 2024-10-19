<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useDropZone } from '@vueuse/core'
import { v4 as uuidV4 } from 'uuid'
import { Input } from '@/components/ui/input'
import { openDB, storeFile } from '@/lib/indexedDB'
import { showAlert } from '@/lib/alert'

const props = defineProps<{
  accept?: string
  multiple?: boolean
}>()

const emit = defineEmits<{
  (event: 'fileUploaded', file: File, uuid: string): void
}>()

let db: IDBDatabase | null = null

const files = ref<File[]>([])
const fileInput = ref<typeof Input | null>(null)
const dropzone = ref<HTMLElement | null>(null)
const { isOverDropZone } = useDropZone(dropzone, {
  onDrop: files => handleFiles(Array.from(files!)),
  multiple: props?.multiple,
})

async function handleFiles(newFiles: File[]) {
  files.value = [...files.value, ...newFiles]
  // 这里可以添加文件上传逻辑
  if (!db) {
    showAlert({
      title: '数据库未准备好',
      description: '请稍后再试',
      type: 'error',
    })
    return
  }
  try {
    const uuid = uuidV4()
    await storeFile(db, newFiles[0], uuid)
    showAlert({
      title: '上传成功',
      description: '文件已成功上传',
      type: 'success',
    })
    emit('fileUploaded', newFiles[0], uuid)
  }
  catch (error) {
    showAlert({
      title: '上传失败',
      description: '请稍后再试',
      type: 'error',
    })
    console.error(error)
  }
}

function triggerFileInput() {
  fileInput.value?.$el.click()
}

function onFileInputChange(event: Event) {
  const input = event.target as HTMLInputElement
  if (input.files) {
    handleFiles(Array.from(input.files))
  }
}

const dropzoneClasses = computed(() => [
  'border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors',
  isOverDropZone.value ? 'border-primary bg-primary/10' : 'border-input hover:bg-accent hover:text-accent-foreground',
])

onMounted(async () => {
  db = await openDB()
})
</script>

<template>
  <div ref="dropzone">
    <div
      :class="dropzoneClasses"
      @click="triggerFileInput"
      @dragover.prevent
      @dragenter.prevent
    >
      <span>icon</span>
      <p class="text-sm font-medium">
        拖拽文件到这里或点击上传
      </p>
      <p class="text-xs text-muted-foreground mt-1">
        支持的文件类型: {{ accept || '所有文件' }}
      </p>
    </div>
    <Input
      ref="fileInput"
      type="file"
      :accept="accept"
      :multiple="multiple"
      class="hidden"
      @change="onFileInputChange"
    />
  </div>
</template>
