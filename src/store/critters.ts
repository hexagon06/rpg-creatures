import { Creature, creatureTypes, getCreatureIndex } from '@/types'
import { defineStore } from 'pinia'
import { ListCreature } from '@/types/creatures'
import { creatureApi, CREATURE_COLLECTION } from '@/api/new-typed/creatureApi'
import { IndexApi } from '@/api/indexApi'

export type DataState = 'dirty' | 'saved'
export type EditState = 'editing' | 'saving' | 'idle' | 'reset'
export type InitializeState = 'none' | 'busy' | 'done'

function setCreatureType(creature: Creature, types: string[]): Creature {
  const copy = { ...creature }
  if (types.find(t => t === copy.type) === undefined) {
    const found = types.find(t => copy.type?.toLowerCase().search(t.toLowerCase()) !== -1)
    if (found) {
      copy.subType = copy.type?.trim().length === found.trim().length ? copy.subType : copy.type
      copy.type = found
    }
  }
  return copy
}

export const useCritterStore = defineStore('critters', {
  state: () => {
    return {
      dataState: 'saved' as DataState,
      editState: 'idle' as EditState,
      initializeState: 'none' as InitializeState,
      indexes: [] as ListCreature[]
    }
  },
  getters: {
    typeOptions(): string[] {
      return creatureTypes
    }
  },
  actions: {
    initialize() {
      if (this.initializeState === 'none') {
        this.initializeState = 'busy'
        const api = new IndexApi<ListCreature>(CREATURE_COLLECTION)
        api.subscribe(this.addIndex, this.changeIndex, this.removeIndex)
        this.initializeState = 'done'
      }
    },
    addIndex(id: string, creature: ListCreature) {
      creature.id = id
      this.indexes.push(creature)
    },
    changeIndex(id: string, creature: ListCreature) {
      const index = this.indexes.findIndex(c => c.id === id)
      const old = this.indexes[index]
      this.indexes[index] = {
        ...old,
        ...creature,
      }
    },
    removeIndex(id: string, creature: ListCreature) {
      const index = this.indexes.findIndex(c => c.id === id)
      this.indexes.splice(index, 1)
    },
  }
})
