import { computed } from 'vue'
import { useCurrentSelected } from './current-selected'
import { useCanvasInfo } from './canvas-info'

export function useClickThumbnail(uuid: string | null) {
  const currentSelected = useCurrentSelected()
  const canvasInfo = useCanvasInfo()
  const isOpen = computed(() => {
    return currentSelected.uuid === uuid
  })

  const handleClickThumbnail = (uuid: string, active: boolean) => {
    const ctx = canvasInfo.ctx
    if (ctx) {
      if (active) {
        ctx.discardActiveObject()
        currentSelected.setCurrentSelectedUUID(null)
      }
      else {
        const object = ctx.getObjects().find(obj => obj.get('uuid') === uuid)
        if (object) {
          ctx.setActiveObject(object)
          currentSelected.setCurrentSelectedUUID(uuid)
        }
      }
      ctx.renderAll()
    }
  }
  return {
    isOpen,
    handleClickThumbnail,
  }
}
