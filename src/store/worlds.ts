import { worldApi } from '@/api'
import { World, WorldIndex, FilledWorld, getWorldIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { useIndexesStore } from './indexes'
import { defineStore } from 'pinia'
import { setInitialDates } from '@/shared/dates'
import { useUserStore } from './users'

export const useWorldStore = defineStore('worlds', {
  state: () => {
    return {
      world: undefined as undefined | World,
      worldForm: undefined as undefined | World,
      filledWorld: undefined as undefined | FilledWorld,
      lastWorldId: undefined as undefined | string,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.worldForm && this.world) {
        return !deepEqual(this.worldForm, this.world)
      } else if (!this.worldForm && !this.world) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createWorld (): Promise<string> {
      const currentUser = useUserStore().currentUser
      if (!currentUser) throw new Error('no currentUser')
      const userId = currentUser.uid
      const world: World = setInitialDates({
        author: userId,
        name: 'A brand new World',
        pages: [],
        synopsis: '',
        created: 0,
        lastEdited: 0,
      })
      const id = await worldApi.create(world)
      const worldIndex: WorldIndex = getWorldIndex(id, world)
      useIndexesStore().worlds.push(worldIndex)
      this.world = world
      return id
    },
    async fetch (id: string) {
      this.world = undefined
      this.filledWorld = undefined
      this.worldForm = undefined

      const world = await worldApi.get(id)

      if (world) {
        this.world = world
      }
      else throw new Error('world not found')
    },
    async save (world: World) {
      try {
        await worldApi.update(world)
        const index = getWorldIndex(world.id!, world)
        useIndexesStore().mutateIndex(useIndexesStore().worlds, index)
      } catch (error) {
        console.error('World update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.worldForm) {
        const world = { ...this.worldForm }
        await this.save(world)
        this.world = world
      }
    },
    async startEdit () {
      if (this.world) {
        this.worldForm = { ...this.world }
      } else {
        throw new Error('No world selected')
      }
    },
    async stopEdit () {
      if (this.worldForm) {
        this.worldForm = undefined
      }
    }
  }
})
