<script setup lang="ts">
import { ref } from 'vue'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { NumberField, NumberFieldContent, NumberFieldDecrement, NumberFieldIncrement, NumberFieldInput } from '@/components/ui/number-field'

const text = ref('')
const angle = ref(0)
</script>

<template>
  <div class="border-t border-gray-200 py-2 mt-2">
    <div class="flex flex-col gap-2">
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">文本内容：</label>
        <Textarea id="text-color" v-model="text" class="flex-2" />
      </div>
      <div class="flex items-center">
        <label for="text-color" class="mr-2 flex-shrink-0 text-sm">字体：</label>
        <Select class="w-full">
          <SelectTrigger>
            <SelectValue placeholder="请选择字体" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="apple">
                Apple
              </SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
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
  </div>
</template>
