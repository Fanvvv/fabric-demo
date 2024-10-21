<script setup lang="ts">
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'
import { Input } from '@/components/ui/input'
import ColorPicker from '@/components/color-picker.vue'
import AlignBtn from '@/components/align-btn.vue'
import { useSystemFont } from '@/hooks/system-font'
import { useLayerOptions } from '@/hooks/layer-options'

const { systemFont } = useSystemFont()
const { text, angle, fontFamily, color } = useLayerOptions()
</script>

<template>
  <div class="border-t border-gray-200 py-2 mt-2">
    <div class="flex flex-col gap-2 p-2">
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">文本内容：</label>
        <Textarea id="text-color" v-model="text" class="flex-2" />
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">字体：</label>
        <Select v-model="fontFamily" class="w-full">
          <SelectTrigger>
            <SelectValue placeholder="请选择字体" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem
                v-for="font in systemFont"
                :key="font"
                :value="font"
              >
                <span :style="{ 'font-family': font }">
                  {{ font }}
                </span>
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">颜色：</label>
        <Input v-model="color" class="mr-2 flex-1" />
        <ColorPicker v-model="color" class="flex-shrink-0" />
      </div>
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
    </div>
    <AlignBtn />
  </div>
</template>
