import { createCreature, getCreature, updateCreature } from '@/api/creature'
import { Creature, getCreatureIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { defineStore } from 'pinia'
import { indexesStore } from '.'

export const useCreatureStore = defineStore('creatures', {
  state: () => {
    return {
      creature: undefined as undefined | Creature,
      creatureForm: undefined as undefined | Creature,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.creatureForm && this.creature) {
        return !deepEqual(this.creatureForm, this.creature)
      } else if (!this.creatureForm && !this.creature) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createCreature (): Promise<string> {
      const creature: Creature = {
        abilityKeys: [],
        abilityScores: {},
        alignment: [],
        environment: [],
        favorite: false,
        name: 'new creature',
        nameIsNoun: false,
        newTags: [],
        organisation: [],
        tags: []
      }
      const id = await createCreature(creature)
      const creatureIndex = getCreatureIndex({ ...creature, id })
      await indexesStore.actions.addCreature(creatureIndex)
      this.creature = creature
      return id
    },
    async fetch (id: string) {
      this.creature = undefined
      this.creatureForm = undefined

      const creature = await getCreature(id)

      if (creature) {
        this.creature = creature
      } else throw new Error('creature not found')
    },
    async save (creature: Creature) {
      try {
        await updateCreature(creature)
        const index = getCreatureIndex(creature)
        await indexesStore.actions.updateCreature(index)
      } catch (error) {
        console.error('Creature update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.creatureForm) {
        const creature = { ...this.creatureForm }
        await this.save(creature)
        this.creature = creature
      }
    },
    async startEdit () {
      if (this.creature) {
        this.creatureForm = { ...this.creature }
      } else {
        throw new Error('no encounter selected')
      }
    },
    async stopEdit () {
      if (this.creatureForm) {
        this.creatureForm = undefined
      }
    },
    async updateFavorite (update: { creatureId: string, favorite: boolean }) {
      console.warn('not implementted: updateFavorite')

      // this.mutations.updateFavorite(update)
      // const creature = this.getters.get(update.creatureId)
      // if (creature) {
      //   await updateCreature(creature)
      // }
    },
  }
})
