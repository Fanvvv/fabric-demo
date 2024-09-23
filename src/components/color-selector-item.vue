<script setup lang="ts">
interface IProps {
  close?: boolean
  color?: string
  active?: boolean
}
const props = withDefaults(defineProps<IProps>(), {
  close: false,
  color: 'white',
  active: false,
})
</script>

<template>
  <div class="color" :class="{ actived: props.active }">
    <div class="color-item">
      <template v-if="props.close">
        <svg class="icon" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path fill="currentColor" d="M764.288 214.592L512 466.88 259.712 214.592a31.936 31.936 0 00-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1045.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0045.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 10-45.12-45.184z" /></svg>
      </template>
      <template v-else>
        <i v-if="props.active" class="iconfont icon-xuanzhong-gou" />
      </template>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.color {
  border: 2px solid white;
  &-item {
    cursor: pointer;
    width: 40px;
    height: 40px;
    border-radius: 100%;
    border: 1px solid #e0e0e0;
    display: flex;
    justify-content: center;
    align-items: center;

    background-color: v-bind('props.color');
  }
}

.actived {
  border-color: red;
}
</style>
