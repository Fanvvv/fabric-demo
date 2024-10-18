import { defineStore } from 'pinia'

interface CurrentSelectedState {
  uuid: string | null
}

export const useCurrentSelected = defineStore('currentSelected', {
  state: (): CurrentSelectedState => ({
    uuid: null,
  }),
  actions: {
    setCurrentSelectedUUID(uuid: string | null) {
      this.uuid = uuid
    },
  },
})
