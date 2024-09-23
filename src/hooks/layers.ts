import { defineStore } from 'pinia'

interface LayerState {
  layers: []
}

export const useLayers = defineStore('layers', {
  state: (): LayerState => ({
    layers: [],
  }),
  actions: {

  },
})
