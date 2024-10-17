<script setup lang="ts">
import BackgroundSelector from '../components/color-background-selector.vue'
import TextAdd from '../components/text-add.vue'
import LayersList from '../components/layers-list.vue'
</script>

<template>
  <div class="flex flex-col gap-5 py-5 pr-5 min-w-[260px] h-[100vh]">
    <BackgroundSelector class="flex-shrink-0" />

    <TextAdd class="flex-shrink-0" />

    <LayersList />
  </div>
</template>
