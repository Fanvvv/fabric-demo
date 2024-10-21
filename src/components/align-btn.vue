<script setup lang="ts">
import { useAlign } from '@/hooks/align'
import { Button } from '@/components/ui/button'

const { iconList, handleAlignItem } = useAlign()
</script>

<template>
  <div class="border-t border-gray-200 py-2 mt-2">
    <div class="text-sm font-bold mb-2">
      对齐方式
    </div>
    <div class="flex gap-2">
      <template v-for="item in iconList" :key="item.id">
        <Button variant="outline" size="icon" :title="item.name" @click="handleAlignItem(item.id)">
          <i class="iconfont" :class="item.icon" />
        </Button>
      </template>
    </div>
  </div>
</template>
