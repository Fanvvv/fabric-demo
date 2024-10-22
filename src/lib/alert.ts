import { ref } from 'vue'
import { v4 as uuidV4 } from 'uuid'

export interface AlertOptions {
  id?: string
  title: string
  description?: string
  type?: 'info' | 'success' | 'warning' | 'error'
  duration?: number
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
