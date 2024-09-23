<script setup lang="ts">
import * as fabric from 'fabric'
import { onMounted } from 'vue'
import { useCanvasInfo } from '../hooks/canvas-info'

const canvasInfoStore = useCanvasInfo()

let initData = false
function initCanvas() {
  const options = {
    preserveObjectStacking: true, // 设置canvas的activeObject不在最上层
    selection: false, // 设置不能多选
  }

  canvasInfoStore.setCanvasCtx(new fabric.Canvas('canvas', options))
}

onMounted(() => {
  if (initData)
    return
  initData = true
  initCanvas()
})
</script>

<template>
  <div class="canvas-view">
    <canvas id="canvas" />
  </div>
</template>

<style lang="scss" scoped>
.canvas-view {
  border: 1px dashed #707070;
  background-image: url('data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAGAAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBQQEBAQEBQYFBQUFBQUGBgYGBgYGBgcHBwcHBwgICAgICQkJCQkJCQkJCf/bAEMBAQEBAgICBAICBAkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf/dAAQAAv/aAAwDAQACEQMRAD8A/v4r5j/aN/5g3/bx/wC0qP8Aho3/AKg3/kx/9qo/5OA/6hP9k/8AbfzPP/797dvl++c9scgHzHRX05/wzl/1Gf8AyX/+20f8M5f9Rn/yX/8AttAH/9D+sCvpz9nL/mM/9u//ALVr5jr6c/Zy/wCYz/27/wDtWgD6cooooA//2Q==');

  #canvas {
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}
</style>
