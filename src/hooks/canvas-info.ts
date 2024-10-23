import { defineStore } from 'pinia'
import type * as fabric from 'fabric'
import BigNumber from 'bignumber.js'
import { useLayers } from './layers'

interface CanvasInfoState {
  cacheCanvasWidth: number
  canvasWidth: number
  ctx: fabric.Canvas | null
}

export const useCanvasInfo = defineStore('canvasInfo', {
  state: (): CanvasInfoState => ({
    cacheCanvasWidth: 0,
    canvasWidth: 0,
    ctx: null,
  }),
  actions: {
    setCanvasWidth(canvasWidth: number) {
      this.canvasWidth = canvasWidth
    },
    setCacheCanvasWidth(cacheCanvasWidth: number) {
      this.cacheCanvasWidth = cacheCanvasWidth
    },
    setCanvasCtx(ctx: fabric.Canvas) {
      this.ctx = ctx
    },
    // 更改 canvasWidth 后转换坐标
    transformCoordinates() {
      if (this.canvasWidth && this.cacheCanvasWidth) {
        const scale = new BigNumber(this.canvasWidth).dividedBy(new BigNumber(this.cacheCanvasWidth))
        const layers = useLayers()
        layers.transformCoordinates(scale)
      }
    },
  },
})
