import { nextTick } from 'vue'
import { useClearRepaint } from './clear-repaint'

export function useDraggable() {
  const { handleClear, handleRepaint } = useClearRepaint()

  async function handleDragEnd() {
    handleClear()
    await nextTick()
    await handleRepaint()
  }

  return {
    handleDragEnd,
  }
}
