import { encounterApi } from '@/api'
import { Encounter, EncounterIndex, FilledEncounter, getEncounterIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { defineStore } from 'pinia'
import { cloneDeep } from 'lodash'
import { useIndexesStore } from './indexes'
import { setEditedDate, setInitialDates } from '@/shared/dates'

export const useEncounterStore = defineStore('encounters', {
  state: () => {
    return {
      encounter: undefined as undefined | Encounter,
      encounterForm: undefined as undefined | Encounter,
      filledEncounter: undefined as undefined | FilledEncounter,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.encounterForm && this.encounter) {
        return !deepEqual(this.encounterForm, this.encounter)
      } else if (!this.encounterForm && !this.encounter) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createEncounter (): Promise<string> {
      const encounter: Encounter = setInitialDates({
        name: 'new encounter',
        synopsis: '',
        flavorText: '',
        description: '',
        tags: [],
        locations: [],
        creatures: [],
        environment: [],
        created: 0,
        lastEdited: 0,
      })
      const id = await encounterApi.create(encounter)
      const encounterIndex: EncounterIndex = getEncounterIndex(id, encounter)
      useIndexesStore().encounters.push(encounterIndex)
      await useIndexesStore().save()
      this.encounter = encounter
      return id
    },
    async fetch (id: string) {
      this.encounter = undefined
      this.filledEncounter = undefined
      this.encounterForm = undefined

      const encounter = await encounterApi.get(id)

      if (encounter) {
        this.encounter = encounter
      }
      else throw new Error('encounter not found')
    },
    async save (encounter: Encounter) {
      try {
        const dated = setEditedDate(encounter)
        await encounterApi.update(dated)
        const index = getEncounterIndex(dated.id!, dated)
        await useIndexesStore().mutateIndex(useIndexesStore().encounters, index)
      } catch (error) {
        console.error('Encounter update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.encounterForm) {
        const encounter = cloneDeep(this.encounterForm)
        await this.save(encounter)
        this.encounter = encounter
      }
    },
    async startEdit () {
      if (this.encounter) {
        this.encounterForm = cloneDeep(this.encounter)
      } else {
        throw new Error('no encounter selected')
      }
    },
    async stopEdit () {
      if (this.encounterForm) {
        this.encounterForm = undefined
      }
    }
  }
})
