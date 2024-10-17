<script setup lang="ts">
import { ref } from 'vue'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'

defineProps<{
  title: string
}>()

const isOpen = ref(true)
</script>

<template>
  <Collapsible
    v-model:open="isOpen"
  >
    <CollapsibleTrigger as-child>
      <div class="flex items-center justify-between">
        <div class="text-base font-bold cursor-pointer">
          {{ title }}
        </div>
        <Button variant="ghost" size="sm" class="w-9 p-0">
          <svg class="transition-transform duration-300" :class="isOpen ? 'rotate-90' : ''" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18l6-6-6-6" /></svg>
          <span class="sr-only">Toggle</span>
        </Button>
      </div>
    </CollapsibleTrigger>
    <CollapsibleContent class="space-y-2">
      <slot />
    </CollapsibleContent>
  </Collapsible>
</template>
