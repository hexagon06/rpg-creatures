import { runningInfoApi } from '@/api'
import { RunningInformation } from '@/types'
import { where } from 'firebase/firestore'
import { defineStore } from 'pinia'
import { useUserStore } from './users'

export const useRunningInfoStore = defineStore('running-info', {
  state: () => {
    return {
      info: undefined as RunningInformation | undefined,
      initialized: false
    }
  },
  actions: {
    async initialize () {
      const currentUser = useUserStore().currentUser
      if (!currentUser) throw new Error('no currentUser')
      const infos = await runningInfoApi.query(where('userId', '==', currentUser.uid))
      if (infos.length === 0) {
        const info = {
          userId: currentUser.uid,
          parts: []
        }
        const id = await runningInfoApi.create(info)
        this.info = {
          id,
          ...info
        }
      } else if (infos.length === 1) {
        this.info = infos[0]
      } else throw new Error(`too many responses on query. expected 0 or 1, got ${infos.length}`)

      this.initialized = true
    },
    async save () {
      if (!this.info) throw new Error('Cannot save, info is undefined')
      await runningInfoApi.update(this.info)
    }
  }
})
