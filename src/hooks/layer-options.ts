import { v4 as uuidV4 } from 'uuid'
import type * as fabric from 'fabric'
import { computed } from 'vue'
import { ImageTypes, useLayers } from '@/hooks/layers'
import { useCanvasInfo } from '@/hooks/canvas-info'
import { useCurrentSelected } from '@/hooks/current-selected'
import type { ILayerItemAtImage, ILayerItemAtText } from '@/hooks/layers'

export function useLayerOptions() {
  const canvasInfo = useCanvasInfo()
  const layers = useLayers()
  const currentSelected = useCurrentSelected()
  function handleDelete(uuid: string) {
    const ctx = canvasInfo.ctx
    if (uuid && ctx) {
      const obj = ctx.getObjects().find(obj => obj.get('uuid') === uuid)
      if (obj) {
        ctx.remove(obj)

        // 同步 pinia 数据
        layers.deleteLayerItem(uuid)
      }
    }
  }

  async function handleCopy(uuid: string, type: ImageTypes) {
    const ctx = canvasInfo.ctx
    if (uuid && ctx) {
      const objects = ctx.getObjects()
      const objIndex = objects.findIndex(obj => obj.get('uuid') === uuid)
      const object = objects[objIndex]
      if (object) {
        const newUUID = uuidV4()
        const layerItemInfo = layers.getLayerItemByUUID(uuid)
        if (type === ImageTypes.TEXT && object.get('type') === 'textbox' && layerItemInfo?.type === ImageTypes.TEXT) {
          const newText = await object.clone() as fabric.Text
          newText.set('uuid', newUUID)
          ctx.insertAt(objIndex, newText)

          layers.cloneText({
            ...layerItemInfo,
            uuidOld: uuid,
            uuid: newUUID,
          })
        }
        if (type === ImageTypes.IMAGE && object.get('type') === 'image' && layerItemInfo?.type === ImageTypes.IMAGE) {
          const newImage = await object.clone() as fabric.Image
          newImage.set('uuid', newUUID)
          ctx.insertAt(objIndex, newImage)

          layers.cloneImage({
            ...layerItemInfo,
            uuidOld: uuid,
            uuid: newUUID,
          })
        }
      }
    }
  }

  // 文字内容
  const text = computed({
    get() {
      return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.text || ''
    },
    set(value) {
      const ctx = canvasInfo.ctx
      if (ctx) {
        ctx.getActiveObject()?.set('text', value)
        ctx.requestRenderAll()
        layers.updateTextItem({
          uuid: currentSelected.uuid!,
          text: value,
        })
      }
    },
  })

  // 选择角度
  const angle = computed({
    get() {
      const deg = Number((layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.angle.toFixed(0))
      if (deg === 360) {
        return 0
      }
      return deg % 360
    },
    set(value) {
      const ctx = canvasInfo.ctx
      if (ctx) {
        const deg = Number(value.toFixed(0))
        ctx.getActiveObject()?.set('angle', deg)
        ctx.requestRenderAll()
        layers.updateLayerItem({
          uuid: currentSelected.uuid!,
          angle: deg % 360,
        })
      }
    },
  })

  // 字体
  const fontFamily = computed({
    get() {
      return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.fontFamily || ''
    },
    set(value) {
      const ctx = canvasInfo.ctx
      if (ctx) {
        ctx.getActiveObject()?.set('fontFamily', value)
        ctx.requestRenderAll()
        layers.updateTextItem({
          uuid: currentSelected.uuid!,
          fontFamily: value,
        })
      }
    },
  })

  // 文字颜色
  const color = computed({
    get() {
      return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtText)?.fill || '#000000'
    },
    set(value) {
      const ctx = canvasInfo.ctx
      if (ctx) {
        ctx.getActiveObject()?.set('fill', value)
        ctx.requestRenderAll()
        layers.updateTextItem({
          uuid: currentSelected.uuid!,
          fill: value,
        })
      }
    },
  })

  // 缩放
  const scale = computed({
    get() {
      return (layers.getLayerItemByUUID(currentSelected.uuid!) as ILayerItemAtImage)?.scaleX || 1
    },
    set(value) {
      const ctx = canvasInfo.ctx
      if (ctx) {
        const scale = Number(value.toFixed(2))
        const activeObject = ctx.getActiveObject()
        activeObject?.set('scaleX', scale)
        activeObject?.set('scaleY', scale)
        activeObject?.setCoords()
        ctx.renderAll()
        layers.updateLayerItem({
          uuid: currentSelected.uuid!,
          scaleX: scale,
          scaleY: scale,
        })
      }
    },
  })

  // 翻转
  function handleFlip(type: 'X' | 'Y') {
    const ctx = canvasInfo.ctx
    if (ctx) {
      const activeObject = ctx.getActiveObject()
      activeObject?.set(`flip${type}`, !activeObject?.get(`flip${type}`))
      ctx.requestRenderAll()
    }
  }

  return {
    handleDelete,
    handleCopy,
    text,
    angle,
    fontFamily,
    color,
    scale,
    handleFlip,
  }
}
