<script lang="ts" setup>
import { ref, watch } from 'vue'
import { Chrome } from '@ckpack/vue-color'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Button } from '@/components/ui/button'

defineProps<{
  disabled?: boolean
}>()

const model = defineModel()
const color = ref<any>({
  hex8: model.value,
})

watch(() => color.value, () => {
  model.value = color.value.hex8
}, { deep: true })

watch(() => model.value, () => {
  color.value.hex8 = model.value
})
const open = ref(false)
</script>

<template>
  <div :class="$attrs.class">
    <Popover :open="open" @update:open="open = $event">
      <PopoverTrigger as-child :disabled="disabled">
        <Button
          size="icon"
          variant="outline"
          class="block"
          :style="{ 'background-color': typeof color === 'object' ? color.hex8 : color }"
          @click="open = true"
        >
          <div />
        </Button>
      </PopoverTrigger>
      <PopoverContent class="w-full">
        <Chrome v-model="color" :disable-fields="true" />
      </PopoverContent>
    </Popover>
  </div>
</template>
