import BigNumber from 'bignumber.js'
import { useCanvasInfo } from '@/hooks/canvas-info'
import { useCurrentSelected } from '@/hooks/current-selected'
import { useLayers } from '@/hooks/layers'

export function useAlign() {
  const iconList = [
    {
      id: 1,
      icon: 'icon-shejiqi-2zuoduiqi',
    },
    {
      id: 2,
      icon: 'icon-shejiqi-3juzhongduiqi',
    },
    {
      id: 3,
      icon: 'icon-shejiqi-1youduiqi',
    },
    {
      id: 4,
      icon: 'icon-shejiqi-5shangduiqi',
    },
    {
      id: 5,
      icon: 'icon-shejiqi-6shuipingduiqi',
    },
    {
      id: 6,
      icon: 'icon-shejiqi-4dibuduiqi',
    },
  ]

  function handleAlignItem(id: number) {
    const uuid = useCurrentSelected().uuid
    const layers = useLayers()
    const canvasInfo = useCanvasInfo()
    const ctx = canvasInfo.ctx
    const canvasWidth = canvasInfo.canvasWidth

    if (ctx) {
      const activeObject = ctx.getActiveObject()
      if (activeObject && activeObject.get('uuid') === uuid) {
        const width = activeObject.get('width')
        const height = activeObject.get('height')
        const left = activeObject.get('left')
        const top = activeObject.get('top')
        const scaleX = activeObject.get('scaleX')
        const scaleY = activeObject.get('scaleY')

        if (width && height && left && top && scaleX && scaleY && canvasWidth) {
          const halfWidth = new BigNumber(width).multipliedBy(new BigNumber(scaleX)).dividedBy(2).toNumber()
          const halfHeight = new BigNumber(height).multipliedBy(new BigNumber(scaleY)).dividedBy(2).toNumber()

          // 最终的 left 和 top
          let finalLeft = left
          let finalTop = top

          if (id === 1) {
            // 左对齐
            finalLeft = halfWidth
          }
          else if (id === 2) {
            // 水平居中对齐
            finalLeft = new BigNumber(canvasWidth).dividedBy(2).toNumber()
          }
          else if (id === 3) {
            // 右对齐
            finalLeft = new BigNumber(canvasWidth).minus(halfWidth).toNumber()
          }
          else if (id === 4) {
            // 上对齐
            finalTop = halfHeight
          }
          else if (id === 5) {
            // 垂直居中对齐
            finalTop = new BigNumber(canvasWidth).dividedBy(2).toNumber()
          }
          else if (id === 6) {
            // 下对齐
            finalTop = new BigNumber(canvasWidth).minus(halfHeight).toNumber()
          }

          activeObject.set('left', finalLeft)
          activeObject.set('top', finalTop)

          // 更新对象的坐标和边界框
          activeObject.setCoords()
          // 更新画布
          ctx.requestRenderAll()

          layers.updateLayerItem({
            uuid: uuid!,
            left: finalLeft,
            top: finalTop,
          })
        }
      }
    }
  }

  return {
    iconList,
    handleAlignItem,
  }
}
