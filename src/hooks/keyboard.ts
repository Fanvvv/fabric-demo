// import { useCurrentSelected } from './current-selected'
// import { useLayerOptions } from './layer-options'
import { useCanvasInfo } from './canvas-info'
import { useLayers } from './layers'

export function useKeyboard() {
  // const { handleDelete } = useLayerOptions()
  // const currentSelected = useCurrentSelected()
  const canvasInfo = useCanvasInfo()
  const layers = useLayers()

  function handleMove(key: string) {
    const activeObject = canvasInfo.ctx?.getActiveObject()
    const uuid = activeObject?.get('uuid')
    let top = activeObject?.get('top')
    let left = activeObject?.get('left')

    switch (key) {
      case 'ArrowUp':
        top -= 1
        activeObject?.set('top', top)
        break
      case 'ArrowDown':
        top += 1
        activeObject?.set('top', top)
        break
      case 'ArrowLeft':
        left -= 1
        activeObject?.set('left', left)
        break
      case 'ArrowRight':
        left += 1
        activeObject?.set('left', left)
        break
    }

    layers.updateLayerItem({
      uuid,
      left,
      top,
    })
    activeObject?.setCoords()
    canvasInfo.ctx?.renderAll()
  }

  function handleKeyDown(e: KeyboardEvent) {
    // if (e.key === 'Delete' || e.key === 'Backspace') {
    //   if (currentSelected.uuid) {
    //     handleDelete(currentSelected.uuid)
    //   }
    // }
    if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
      handleMove(e.key)
    }
  }

  function addEvent() {
    document.addEventListener('keydown', handleKeyDown)
  }

  function removeEvent() {
    document.removeEventListener('keydown', handleKeyDown)
  }

  return {
    addEvent,
    removeEvent,
  }
}
