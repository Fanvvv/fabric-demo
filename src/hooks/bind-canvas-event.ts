import type * as fabric from 'fabric/fabric-impl'
import { useLayers } from '@/hooks/layers'

export function useBindCanvasEvent() {
  const layers = useLayers()
  // 缩放
  const onObjectScaling = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const left = target.get('left' as keyof fabric.Object)
      const top = target.get('top' as keyof fabric.Object)

      layers.updateLayerItem({
        uuid,
        left,
        top,
      })
    }
  }
  // 宽高改变
  const onObjectModified = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const width = target.get('width' as keyof fabric.Object)
      const height = target.get('height' as keyof fabric.Object)

      console.log(height)

      layers.updateLayerItem({
        uuid,
        width: Number(width.toFixed(0)),
        height: Number(height.toFixed(0)),
      })
    }
  }

  return {
    bindCanvasContextEvent(ctx: fabric.Canvas) {
      // 缩放
      ctx.on('object:scaling', onObjectScaling)
      // 宽高改变
      ctx.on('object:modified', onObjectModified)
    },
  }
}
