import type * as fabric from 'fabric/fabric-impl'
import { throttle } from 'throttle-debounce'
import { useLayers } from '@/hooks/layers'
import { useCurrentSelected } from '@/hooks/current-selected'

export function useBindCanvasEvent() {
  const layers = useLayers()
  const currentSelected = useCurrentSelected()

  // 鼠标点击（选择）
  const onObjectSelected = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      currentSelected.setCurrentSelectedUUID(uuid)
    }
  }

  // 移动
  const onObjectMoving = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const left = target.get('left')
      const top = target.get('top')

      layers.updateLayerItem({
        uuid,
        left,
        top,
      })
    }
  }

  // 缩放
  const onObjectScaling = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const scaleX = target.get('scaleX')
      const scaleY = target.get('scaleY')
      const flipX = target.get('flipX')
      const flipY = target.get('flipY')

      layers.updateLayerItem({
        uuid,
        scaleX,
        scaleY,
        flipX,
        flipY,
      })
    }
  }

  // 旋转
  const onObjectRotating = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const angle = target.get('angle')

      layers.updateLayerItem({
        uuid,
        angle,
      })
    }
  }

  // 宽高改变
  const onObjectModified = (e: fabric.IEvent) => {
    const target = e.target
    if (!!target && target.get('selectable') === true) {
      const uuid = target.get('uuid' as keyof fabric.Object)
      const width = target.get('width')
      const height = target.get('height')

      layers.updateLayerItem({
        uuid,
        width: Number(width?.toFixed(0)),
        height: Number(height?.toFixed(0)),
      })
    }
  }

  return {
    bindCanvasContextEvent(ctx: fabric.Canvas) {
      // 选择
      ctx.on('mouse:down', throttle(300, onObjectSelected))
      // 移动
      ctx.on('object:moving', throttle(300, onObjectMoving))
      // 缩放
      ctx.on('object:scaling', throttle(300, onObjectScaling))
      // 旋转
      ctx.on('object:rotating', throttle(300, onObjectRotating))
      // 宽高改变
      ctx.on('object:modified', throttle(300, onObjectModified))
    },
  }
}
