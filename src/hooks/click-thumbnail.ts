import { ref } from 'vue'
import { useCurrentSelected } from './current-selected'
import { useCanvasInfo } from './canvas-info'

const isOpen = ref(false)

export function useClickThumbnail() {
  const currentSelected = useCurrentSelected()
  const canvasInfo = useCanvasInfo()

  const handleClickThumbnail = (uuid: string, active: boolean) => {
    const ctx = canvasInfo.ctx
    if (ctx) {
      if (active) {
        ctx.discardActiveObject()
        currentSelected.setCurrentSelectedUUID(null)
        isOpen.value = false
      }
      else {
        const object = ctx.getObjects().find(obj => obj.get('uuid') === uuid)
        if (object) {
          ctx.setActiveObject(object)
          currentSelected.setCurrentSelectedUUID(uuid)
        }
        isOpen.value = true
      }
      ctx.renderAll()
    }
  }
  return {
    isOpen,
    handleClickThumbnail,
  }
}
