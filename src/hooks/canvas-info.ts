import { defineStore } from 'pinia'
import type { Canvas } from 'fabric'

interface CanvasInfoState {
  canvasWidth: number
  ctx: Canvas | null
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
    setCanvasCtx(ctx: Canvas) {
      this.ctx = ctx
    },
  },
})
