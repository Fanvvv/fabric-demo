import * as fabric from 'fabric'
import { BigNumber } from 'bignumber.js'
import { storeToRefs } from 'pinia'
import { v4 as uuidV4 } from 'uuid'
import { file2Base64 } from '@/lib/utils'
import { useCanvasInfo } from '@/hooks/canvas-info'
import type { ICreatePerfectImage } from '@/hooks/layers'
import { useLayers } from '@/hooks/layers'
import { openDB, storeFile } from '@/lib/indexedDB'
import { showAlert } from '@/lib/alert'

export function useAddImage() {
  const canvasInfo = useCanvasInfo()
  const { ctx, canvasWidth } = storeToRefs(canvasInfo)
  const layers = useLayers()
  async function fileUploadedCallback(file: File | string, uuid: string, name?: string) {
    let image: string
    if (typeof file === 'string') {
      image = file
    }
    else {
      image = await file2Base64(file)
    }

    if (ctx.value) {
      const imageObj = await fabric.FabricImage.fromURL(image)

      imageObj.set('uuid', uuid)
      const left = new BigNumber(canvasWidth.value).dividedBy(2).toNumber()
      const top = left
      const width = Number(imageObj.get('width').toFixed(0))
      const height = Number(imageObj.get('height').toFixed(0))
      let scaleX = Number(imageObj.get('scaleX'))
      let scaleY = Number(imageObj.get('scaleY'))

      if (width > canvasWidth.value) {
        const scalingFactor = width > height ? width : height
        scaleX = Number(new BigNumber(canvasWidth.value).dividedBy(scalingFactor).toFixed(2))
        scaleY = scaleX
      }

      imageObj.set('left', left)
      imageObj.set('top', top)
      imageObj.set('scaleX', scaleX)
      imageObj.set('scaleY', scaleY)
      imageObj.set('originX', 'center')
      imageObj.set('originY', 'center')

      ctx.value?.add(imageObj)
      layers.createPerfectImage({
        uuid,
        url: image,
        name: typeof file === 'string' ? name : file.name,
        width,
        height,
        left,
        top,
        scaleX,
        scaleY,
        angle: 0,
        flipX: false,
        flipY: false,
        opacity: 1,
      } as ICreatePerfectImage)
      ctx.value?.renderAll()
    }
  }

  async function handleFiles(newFiles: File[]) {
    const db = await openDB()
    // 这里可以添加文件上传逻辑
    if (!db) {
      showAlert({
        title: '数据库未准备好',
        description: '请稍后再试',
        type: 'error',
      })
      return
    }
    try {
      const uuid = uuidV4()
      await storeFile(db, newFiles[0], uuid)
      showAlert({
        title: '上传成功',
        description: '文件已成功上传',
        type: 'success',
      })
    }
    catch (error) {
      showAlert({
        title: '上传失败',
        description: '请稍后再试',
        type: 'error',
      })
      console.error(error)
    }
  }

  function onFileInputChange(event: Event, cb?: () => void) {
    const input = event.target as HTMLInputElement
    if (input.files) {
      handleFiles(Array.from(input.files))
    }
    if (cb && typeof cb === 'function') {
      cb()
    }
  }
  return {
    fileUploadedCallback,
    onFileInputChange,
  }
}
