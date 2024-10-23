import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 将文件转换为 base64 格式
export function file2Base64(file: File): Promise<string> {
  return new Promise((resolve) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      return resolve(String(e.target?.result))
    }
    reader.readAsDataURL(file)
  })
}

// 文件大小添加单位
export function formatFileSize(sizeInBytes: number) {
  const units = ['B', 'KB', 'MB', 'GB', 'TB']
  let size = sizeInBytes
  let unitIndex = 0

  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024
    unitIndex++
  }

  return `${size.toFixed(2)} ${units[unitIndex]}`
}

// 导出为图片
export function exportCanvasToPNG(canvas: HTMLCanvasElement, fileName: string = 'canvas_export.png'): void {
  // 将 Canvas 内容转换为 base64 编码的 PNG 数据 URL
  const dataURL = canvas.toDataURL('image/png')

  // 创建一个临时的 <a> 元素用于下载
  const link = document.createElement('a')
  link.download = fileName
  link.href = dataURL

  // 模拟点击链接以触发下载
  document.body.appendChild(link)
  link.click()

  // 清理：从 DOM 中移除临时链接
  document.body.removeChild(link)
}
