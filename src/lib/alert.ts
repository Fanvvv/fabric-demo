import type { VNode } from 'vue'
import { h, ref, render } from 'vue'
import { v4 as uuidV4 } from 'uuid'
import ConfirmDialog from '@/components/confirm-dialog.vue'

export interface AlertOptions {
  id?: string
  title: string
  description?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
}

export interface IConfirmDialogOptions {
  title?: string
  description?: string
  onConfirm?: () => void
  onClose?: () => void
}

export const alerts = ref<AlertOptions[]>([])

export function showAlert(options: AlertOptions) {
  const alert = { ...options, id: uuidV4() }
  alerts.value.push(alert)

  if (options.duration !== 0) {
    setTimeout(() => {
      removeAlert(alert.id)
    }, options.duration || 2000)
  }
}

export function removeAlert(id: string) {
  const index = alerts.value.findIndex(alert => alert.id === id)
  if (index !== -1) {
    alerts.value.splice(index, 1)
  }
}

export function showConfirmDialog(options: IConfirmDialogOptions) {
  return new Promise((resolve) => {
    const container = document.createElement('div')

    function removeContainer() {
      render(null, container)
      document.body.removeChild(container)
    }

    const vnode: VNode = h(ConfirmDialog, {
      modelValue: true,
      title: options.title || '',
      description: options.description || '',
      onConfirm: () => {
        removeContainer()
        resolve(true)
      },
      onClose: () => {
        removeContainer()
        resolve(false)
      },
    })

    render(vnode, container)
    document.body.appendChild(container)
  })
}
