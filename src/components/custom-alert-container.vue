<script setup lang="ts">
import { alerts } from '@/lib/alert'
import CustomAlert from '@/components/custom-alert.vue'
</script>

<template>
  <Teleport to="#alert">
    <div class="fixed top-2 z-9999">
      <TransitionGroup name="fade">
        <CustomAlert
          v-for="alert in alerts"
          :key="alert.id"
          :title="alert.title"
          :description="alert.description || ''"
          :type="alert.type"
          :duration="alert.duration"
          class="mb-2"
        />
      </TransitionGroup>
    </div>
  </Teleport>
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
