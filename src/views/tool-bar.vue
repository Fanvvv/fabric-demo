<script setup lang="ts">
import BackgroundSelector from '../components/color-background-selector.vue'
import TextAdd from '../components/text-add.vue'
</script>

<template>
  <div class="flex-1 flex flex-col gap-10 pr-5 min-w-[260px]">
    <BackgroundSelector />

    <TextAdd />
  </div>
</template>
