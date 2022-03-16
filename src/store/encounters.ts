import { createEncounter, getEncounter, updateEncounter } from '@/api/encounterApi'
import { Encounter, EncounterIndex, FilledEncounter, getEncounterIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { indexesStore } from '.'
import { defineStore } from 'pinia'

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
    async createEncounter (): Promise<void> {
      const encounter: Encounter = {
        name: 'new encounter',
        synopsis: '',
        flavorText: '',
        description: '',
        tags: [],
        locations: [],
        creatures: [],
        environment: []
      }
      const id = await createEncounter(encounter)
      const encounterIndex: EncounterIndex = getEncounterIndex(id, encounter)
      await indexesStore.actions.addEncounter(encounterIndex)
      this.encounter = encounter
    },
    async fetch (id: string) {
      this.encounter = undefined
      this.filledEncounter = undefined
      this.encounterForm = undefined

      const encounter = await getEncounter(id)

      if (encounter) {
        this.encounter = encounter
      }
      else throw new Error('encounter not found')
    },
    async save (encounter: Encounter) {
      try {
        await updateEncounter(encounter)
        const index = getEncounterIndex(encounter.id!, encounter)
        await indexesStore.actions.updateEncounter(index)
      } catch (error) {
        console.error('Encounter update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.encounterForm) {
        const encounter = { ...this.encounterForm }
        await this.save(encounter)
        this.encounter = encounter
      }
    },
    async startEdit () {
      if (this.encounter) {
        this.encounterForm = { ...this.encounter }
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

// export const encounterMapper = createMapper(encounterModule)
// export function fillEncounter (encounter: Encounter): FilledEncounter {
//   return {
//     ...encounter,
//     creatures: encounter.creatures.map(ref => {
//       const cIndex = indexesStore.state.creatures.find(c => c.id === ref.id)
//       if (cIndex) {
//         return {
//           ...cIndex,
//           count: ref.count
//         }
//       } else {
//         throw new Error(`Expected a reference to a creature but no creature with the id ${ref.id} exists`)
//       }
//     })
//   }
// }

