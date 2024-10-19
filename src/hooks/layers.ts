import { defineStore } from 'pinia'

export enum ImageTypes {
  IMAGE = 'image',
  TEXT = 'text',
}

export interface ILayerItemAtImage {
  uploadProgress: number
  type: ImageTypes.IMAGE
  id: number | null
  uuid: string
  name: string | null
  url: string | null
  // 是否可见
  visible: boolean
  // 位置信息
  width: number | null
  height: number | null
  left: number | null
  top: number | null
  // 缩放
  scaleX: number | null
  scaleY: number | null
  // 角度
  angle: number
  // 翻转
  flipX: boolean | null
  flipY: boolean | null
  // 透明度
  opacity: number
}

export interface ILayerItemAtText {
  type: ImageTypes.TEXT
  uuid: string
  text: string// 文本内容，可以携带换行符号'\n'
  // 是否可见
  visible: boolean
  // 位置信息
  width: number
  height: number
  left: number
  top: number
  // 缩放
  scaleX: number
  scaleY: number
  // 角度
  angle: number
  // 翻转
  flipX: boolean
  flipY: boolean
  // 透明度
  opacity: number
  // 字体信息
  fontSize: number
  fontFamily: string
  fill: string// 颜色
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  underline: boolean
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
  // 描边信息
  stroke: string | undefined
  strokeWidth: number
}

export interface IUpdateTextItem {
  uuid: string
  text?: string
  fontFamily?: string
  fill?: string
}

export interface ICreatePerfectText {
  uuid: string
  text: string
  width: number
  height: number
  left: number
  top: number
  scaleX: number
  scaleY: number
  angle: number
  flipX: boolean
  flipY: boolean
  opacity: number
}

export interface ICreatePerfectImage {
  uuid: string
  url: string
  width: number
  height: number
  left: number
  top: number
  scaleX: number
  scaleY: number
  angle: number
  flipX: boolean
  flipY: boolean
  opacity: number
}

// text
export interface ICloneText {
  uuidOld: string// 宿主的uuid
  uuid: string// 克隆对象的uuid（新对象）
  text: string
  visible: boolean
  width: number
  height: number
  left: number
  top: number
  scaleX: number
  scaleY: number
  angle: number
  flipX: boolean
  flipY: boolean
  opacity: number
  // text
  fontSize: number
  fontFamily: string
  fill: string// 颜色
  fontWeight: 'normal' | 'bold'
  fontStyle: 'normal' | 'italic'
  underline: boolean
  textAlign: 'left' | 'center' | 'right'
  lineHeight: number
  // 描边信息
  stroke: string | undefined
  strokeWidth: number
}

export interface IUpdateLayerItem {
  uuid: string
  left?: number
  top?: number
  width?: number
  height?: number
  scaleX?: number
  scaleY?: number
  flipX?: boolean
  flipY?: boolean
  angle?: number
  opacity?: number
}

export enum TileTypes {
  // 无
  Nothing = 1,
  // 基础
  Basics,
  // 镜像
  Image,
  // 横向
  Transverse,
  // 纵向
  Portrait,
}

interface LayerState {
  layers: Array<{
    bgColor: string | null
    layerList: Array<ILayerItemAtImage | ILayerItemAtText>
    // 平铺
    tile: {
      // 平铺的类型
      type: TileTypes
      // 被平铺的对象
      object: ILayerItemAtImage | null
      // 平铺的数组（排除被平铺的对象）
      list: Array<ILayerItemAtImage>
    }
  }>
}

export const useLayers = defineStore('layers', {
  state: (): LayerState => ({
    layers: [{
      bgColor: null,
      layerList: [], // 图册列表
      // 描述平铺
      tile: {
        type: TileTypes.Nothing,
        object: null,
        list: [],
      },
    }],
  }),
  actions: {
    // 创建完整数据的文本
    createPerfectText(payload: ICreatePerfectText) {
      this.layers.forEach((item) => {
        item.layerList.unshift({
          type: ImageTypes.TEXT,
          visible: true,
          fontSize: 40,
          fontFamily: 'Times New Roman',
          fill: '#000000',
          fontWeight: 'normal',
          fontStyle: 'normal',
          underline: false,
          textAlign: 'left',
          lineHeight: 1.16,
          stroke: undefined,
          strokeWidth: 0,
          ...payload,
        } as ILayerItemAtText)
      })
    },
    // 创建完整数据的图片
    createPerfectImage(payload: ICreatePerfectImage) {
      const { uuid, ...reset } = payload
      this.layers.forEach((item) => {
        item.layerList.forEach((layerItem) => {
          if (layerItem.uuid === uuid) {
            Object.assign(layerItem, reset)
          }
        })
      })
    },
    // 更新图层
    updateLayerItem(payload: IUpdateLayerItem) {
      const {
        uuid,
        left,
        top,
        scaleX,
        scaleY,
        width,
        height,
        flipX,
        flipY,
        angle,
        opacity,
      } = payload
      this.layers[0].layerList.forEach((layerItem) => {
        if (layerItem.uuid === uuid) {
          if (typeof left === 'number' && !Number.isNaN(left))
            layerItem.left = left
          if (typeof top === 'number' && !Number.isNaN(top))
            layerItem.top = top
          if (typeof scaleX === 'number' && !Number.isNaN(scaleX))
            layerItem.scaleX = scaleX
          if (typeof scaleY === 'number' && !Number.isNaN(scaleY))
            layerItem.scaleY = scaleY
          if (typeof width === 'number' && !Number.isNaN(width))
            layerItem.width = width
          if (typeof height === 'number' && !Number.isNaN(height))
            layerItem.height = height
          if (typeof flipX === 'boolean')
            layerItem.flipX = flipX
          if (typeof flipY === 'boolean')
            layerItem.flipY = flipY
          if (typeof angle === 'number' && !Number.isNaN(angle))
            layerItem.angle = angle
          if (typeof opacity === 'number' && !Number.isNaN(opacity))
            layerItem.opacity = opacity
        }
      })
    },
    // 修改部分text特有的属性
    updateTextItem(payload: IUpdateTextItem) {
      const {
        uuid,
        text,
        fontFamily,
        fill,
      } = payload

      this.layers[0].layerList.forEach((item) => {
        if (item.uuid === uuid && item.type === ImageTypes.TEXT) {
          if (typeof text === 'string')
            item.text = text
          if (typeof fontFamily === 'string')
            item.fontFamily = fontFamily
          if (typeof fill === 'string')
            item.fill = fill
        }
      })
    },
    // clone Text
    cloneText(object: ICloneText) {
      const index = this.layers[0].layerList.findIndex(item => item.uuid === object.uuidOld)
      const { uuidOld, ...rest } = object
      this.layers[0].layerList.splice(index, 0, {
        ...rest,
        type: ImageTypes.TEXT,
      })
    },
    // 设置图层背景颜色
    setLayerBgColor(color: string) {
      this.layers[0].bgColor = color
    },
    // 删除图层
    deleteLayerItem(uuid: string) {
      this.layers[0].layerList = this.layers[0].layerList.filter(item => item.uuid !== uuid)
    },
  },
  getters: {
    layerList: (state) => {
      if (state.layers.length === 0)
        return []
      return state.layers[0].layerList
    },
    getLayerItemByUUID: state => (uuid: string) => {
      return state.layers[0].layerList.find(item => item.uuid === uuid)
    },
    getLayerBgColor: (state): string | null => {
      return state.layers[0].bgColor
    },
  },
})
