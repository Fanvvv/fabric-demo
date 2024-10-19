import * as fabric from 'fabric'
import { useCanvasInfo } from './canvas-info'
import type { ILayerItemAtText } from './layers'
import { useLayers } from './layers'
import { useCurrentSelected } from './current-selected'
import { ImageTypes } from '@/hooks/layers'

export function useClearRepaint() {
  const canvasInfo = useCanvasInfo()
  const layers = useLayers()
  const currentSelected = useCurrentSelected()

  function handleClear() {
    canvasInfo.ctx?.clear()
  }

  async function handleRepaint() {
    handleClear()
    const layerList = layers.layerList
    if (canvasInfo.ctx) {
      canvasInfo.ctx.backgroundColor = layers.getLayerBgColor ?? 'transparent'
    }

    if (canvasInfo.ctx && layerList.length > 0) {
      const promiseList = layerList?.map((item) => {
        if (item.type === ImageTypes.TEXT) {
          return repaintText(item)
        }
        return Promise.resolve(null)
      })

      const dataList = await Promise.all(promiseList)
      if (dataList.length > 0) {
        dataList.reverse()
        canvasInfo.ctx?.add(...dataList as fabric.Object[])

        const currentItem = canvasInfo.ctx?.getObjects().find(item => item.get('uuid') === currentSelected.uuid)
        if (currentItem) {
          canvasInfo.ctx?.setActiveObject(currentItem)
        }
        canvasInfo.ctx?.renderAll()
      }
    }
  }

  function repaintText(object: ILayerItemAtText) {
    return new Promise((resolve) => {
      const { text, type, ...reset } = object

      const textbox = new fabric.Textbox(text, {
        originX: 'center',
        originY: 'center',
        ...reset,
      })
      resolve(textbox)
    })
  }

  return {
    handleClear,
    handleRepaint,
  }
}
