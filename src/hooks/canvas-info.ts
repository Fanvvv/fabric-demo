import { defineStore } from 'pinia'
import type * as fabric from 'fabric'

interface CanvasInfoState {
  canvasWidth: number
  ctx: fabric.Canvas | null
}

export const useCanvasInfo = defineStore('canvasInfo', {
  state: (): CanvasInfoState => ({
    canvasWidth: 0,
    ctx: null,
  }),
  actions: {
    setCanvasWidth(canvasWidth: number) {
      this.canvasWidth = canvasWidth
    },
    setCanvasCtx(ctx: fabric.Canvas) {
      this.ctx = ctx
    },
  },
})
