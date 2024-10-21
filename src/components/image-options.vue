<script setup lang="ts">
import AlignBtn from './align-btn.vue'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
import { useLayerOptions } from '@/hooks/layer-options'
import { Button } from '@/components/ui/button'

const { angle, scale, handleFlip } = useLayerOptions()
</script>

<template>
  <div class="border-t border-gray-200 py-2 mt-2">
    <div class="flex flex-col gap-2 p-2">
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">角度(deg)：</label>
        <NumberField v-model="angle" :min="0" :max="360" :step="45">
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">缩放：</label>
        <NumberField
          v-model="scale"
          :min="0"
          :max="10"
          :step="0.01"
          :format-options="{
            minimumFractionDigits: 2,
          }"
        >
          <NumberFieldContent>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldContent>
        </NumberField>
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">翻转：</label>
        <Button variant="outline" @click="handleFlip('X')">
          <span><i class="iconfont icon-shejiqi-chuizhifanzhuan" />垂直翻转</span>
        </Button>
        <Button variant="outline" class="ml-2" @click="handleFlip('Y')">
          <span><i class="iconfont icon-shuipingfanzhuan" />水平翻转</span>
        </Button>
      </div>
    </div>
    <AlignBtn />
  </div>
</template>
