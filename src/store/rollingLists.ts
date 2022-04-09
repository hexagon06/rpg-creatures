import { listApi } from '@/api/typed/listApi'
import { RollingList, RollingListIndex, FilledRollingList, getRollingListIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { indexesStore, userStore } from '.'
import { defineStore } from 'pinia'

export const useListStore = defineStore('rollingLists', {
  state: () => {
    return {
      rollingList: undefined as undefined | RollingList,
      rollingListForm: undefined as undefined | RollingList,
      filledRollingList: undefined as undefined | FilledRollingList,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.rollingListForm && this.rollingList) {
        return !deepEqual(this.rollingListForm, this.rollingList)
      } else if (!this.rollingListForm && !this.rollingList) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createList (): Promise<string> {
      if (!userStore.state.currentUser) throw new Error('no currentUser')
      const userId = userStore.state.currentUser.uid
      const rollingList: RollingList = {
        items: [],
        name: '',
        userId,
      }
      const id = await listApi.create(rollingList)
      const rollingListIndex: RollingListIndex = getRollingListIndex(id, rollingList)
      await indexesStore.actions.addList(rollingListIndex)
      this.rollingList = rollingList
      return id
    },
    async fetch (id: string) {
      this.rollingList = undefined
      this.filledRollingList = undefined
      this.rollingListForm = undefined

      const rollingList = await listApi.get(id)

      if (rollingList) {
        this.rollingList = rollingList
      }
      else throw new Error('rollingList not found')
    },
    async save (rollingList: RollingList) {
      try {
        await listApi.update(rollingList)
        const index = getRollingListIndex(rollingList.id!, rollingList)
        await indexesStore.actions.updateList(index)
      } catch (error) {
        console.error('RollingList update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.rollingListForm) {
        const rollingList = { ...this.rollingListForm }
        await this.save(rollingList)
        this.rollingList = rollingList
      }
    },
    async startEdit () {
      if (this.rollingList) {
        this.rollingListForm = { ...this.rollingList }
      } else {
        throw new Error('No rollingList selected')
      }
    },
    async stopEdit () {
      if (this.rollingListForm) {
        this.rollingListForm = undefined
      }
    }
  }
})
