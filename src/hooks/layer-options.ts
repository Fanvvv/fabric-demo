import { v4 as uuidV4 } from 'uuid'
import type * as fabric from 'fabric'
import { ImageTypes, useLayers } from '@/hooks/layers'
import { useCanvasInfo } from '@/hooks/canvas-info'

export function useLayerOptions() {
  const canvasInfo = useCanvasInfo()
  const layers = useLayers()
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
      }
    }
  }

  return {
    handleDelete,
    handleCopy,
  }
}
