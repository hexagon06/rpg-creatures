import { listApi } from '@/api'
import { setEditedDate, setInitialDates } from '@/shared/dates'
import { RollingList, RollingListIndex, FilledRollingList, getRollingListIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { useIndexesStore } from './indexes'
import { useUserStore } from './users'

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
      const currentUser = useUserStore().currentUser
      if (!currentUser) throw new Error('no currentUser')
      const userId = currentUser.uid
      const rollingList: RollingList = setInitialDates({
        items: [],
        name: '',
        userId,
        created: 0,
        lastEdited: 0,
      })
      const id = await listApi.create(rollingList)
      const rollingListIndex: RollingListIndex = getRollingListIndex(id, rollingList)
      useIndexesStore().lists.push(rollingListIndex)
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
        const dated = setEditedDate(rollingList)
        await listApi.update(dated)
        const index = getRollingListIndex(dated.id!, dated)
        useIndexesStore().mutateIndex(useIndexesStore().lists, index)
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
        this.rollingListForm = cloneDeep(this.rollingList)
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
