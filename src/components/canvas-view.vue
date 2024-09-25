<script setup lang="ts">
import * as fabric from 'fabric'
import { onMounted } from 'vue'
import { throttle } from 'throttle-debounce'
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

// 设置 canvas 宽高
function widthChange() {
  const canvasView = document.getElementsByClassName('canvas-view')

  if (canvasView && canvasView[0]) {
    const canvasWidth = canvasView[0].clientWidth

    if (canvasInfoStore.ctx) {
      canvasInfoStore.ctx.setDimensions({
        width: canvasWidth,
        height: canvasWidth,
      })
    }

    canvasInfoStore.setCanvasWidth(canvasWidth)
  }
}

onMounted(() => {
  if (initData)
    return
  initData = true
  initCanvas()

  const throttleWidthChange = throttle(100, widthChange)
  window.addEventListener('resize', throttleWidthChange)
  throttleWidthChange()
})
</script>

<template>
  <div class="canvas-view canvas-width-height">
    <canvas id="canvas" class="bg-transparent" />
  </div>
</template>

<style lang="scss" scoped>
@import 'styles/canvas-content.scss';
.canvas-view {
  border: 1px dashed #707070;
  background-image: url('data:image/jpg;base64,/9j/4AAQSkZJRgABAQAASABIAAD/4QBMRXhpZgAATU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAGKADAAQAAAABAAAAGAAAAAD/7QA4UGhvdG9zaG9wIDMuMAA4QklNBAQAAAAAAAA4QklNBCUAAAAAABDUHYzZjwCyBOmACZjs+EJ+/8AAEQgAGAAYAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/bAEMAAQEBAQEBAgEBAgMCAgIDBAMDAwMEBQQEBAQEBQYFBQUFBQUGBgYGBgYGBgcHBwcHBwgICAgICQkJCQkJCQkJCf/bAEMBAQEBAgICBAICBAkGBQYJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCf/dAAQAAv/aAAwDAQACEQMRAD8A/v4r5j/aN/5g3/bx/wC0qP8Aho3/AKg3/kx/9qo/5OA/6hP9k/8AbfzPP/797dvl++c9scgHzHRX05/wzl/1Gf8AyX/+20f8M5f9Rn/yX/8AttAH/9D+sCvpz9nL/mM/9u//ALVr5jr6c/Zy/wCYz/27/wDtWgD6cooooA//2Q==');
}
</style>
