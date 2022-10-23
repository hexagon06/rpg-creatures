import { creatureApi } from '@/api'
import { Creature, creatureTypes, getCreatureIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { cloneDeep } from 'lodash'
import { defineStore } from 'pinia'
import { useIndexesStore } from './indexes'
import { setEditedDate } from '@/shared/dates'
import { createDefaultCreature } from '@/shared'

export type DataState = 'dirty' | 'saved'
export type EditState = 'editing' | 'saving' | 'idle' | 'reset'

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
    }
  },
  getters: {
    // isDirty(): boolean {
    //   if (this.creatureForm && this.creature) {
    //     return !deepEqual(this.creatureForm, this.creature)
    //   } else if (!this.creatureForm && !this.creature) {
    //     return false
    //   } else { // one of them is undefined
    //     return true
    //   }
    // },
    typeOptions(): string[] {
      return creatureTypes
    }
  },
  // actions: {
  //   async createCreature (): Promise<string> {
  //     const creature: Creature = createDefaultCreature('new creature')

  //     if (this.creatureForm) {
  //       creature.source = this.creatureForm.source
  //       creature.page = this.creatureForm.page
  //       creature.system = this.creatureForm.system
  //       creature.type = this.creatureForm.type
  //     }
  //     const id = await creatureApi.create(creature)
  //     const creatureIndex = getCreatureIndex({ ...creature, id })
  //     await useIndexesStore().creatures.push(creatureIndex)
  //     this.creature = creature
  //     return id
  //   },
  //   async fetch (id: string) {
  //     this.creature = undefined
  //     this.creatureForm = undefined

  //     const creature = await creatureApi.get(id)

  //     if (creature) {
  //       this.creature = creature
  //     } else throw new Error('creature not found')
  //   },
  //   async save (creature: Creature) {
  //     try {
  //       const dated = setEditedDate(creature)
  //       await creatureApi.update(dated)
  //       const index = getCreatureIndex(dated)
  //       useIndexesStore().mutateIndex(useIndexesStore().creatures, index)
  //     } catch (error) {
  //       console.error('Creature update failed: ', error)
  //       throw error
  //     }
  //   },
  //   async saveEdit () {
  //     if (this.creatureForm) {
  //       const creature = cloneDeep(this.creatureForm)
  //       await this.save(creature)
  //       this.creature = creature
  //     }
  //   },
  //   async startEdit () {
  //     if (this.creature) {
  //       const form = cloneDeep(this.creature)
  //       this.creatureForm = setCreatureType(form, this.typeOptions)
  //     } else {
  //       throw new Error('no encounter selected')
  //     }
  //   },
  //   async stopEdit () {
  //     if (this.creatureForm) {
  //       this.creatureForm = undefined
  //     }
  //   },
  //   async updateFavorite (update: { creatureId: string, favorite: boolean }) {
  //     console.warn('not implementted: updateFavorite')

  //     // this.mutations.updateFavorite(update)
  //     // const creature = this.getters.get(update.creatureId)
  //     // if (creature) {
  //     //   await updateCreature(creature)
  //     // }
  //   },
  // }
})
