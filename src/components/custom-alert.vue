<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

interface Props {
  title: string
  description: string
  variant?: 'default' | 'destructive'
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'default',
  type: 'info',
  duration: 2000,
})

const isVisible = ref(true)

const alertClass = computed(() => {
  switch (props.type) {
    case 'success':
      return 'bg-green-100 border-green-500 text-green-700'
    case 'warning':
      return 'bg-yellow-100 border-yellow-500 text-yellow-700'
    case 'error':
      return 'bg-red-100 border-red-500 text-red-700'
    default:
      return 'bg-blue-100 border-blue-500 text-blue-700'
  }
})

onMounted(() => {
  setTimeout(() => {
    isVisible.value = false
  }, props.duration)
})
</script>

<template>
  <Transition name="fade">
    <Alert v-if="isVisible" :variant="variant" :class="alertClass" class="min-w-[100px]">
      <AlertTitle class="font-bold mb-2">
        {{ title }}：
      </AlertTitle>
      <AlertDescription>{{ description }}</AlertDescription>
    </Alert>
  </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
