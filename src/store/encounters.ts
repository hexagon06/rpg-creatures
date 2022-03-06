import { createEncounter, getEncounter, updateEncounter } from '@/api/encounterApi'
import { Encounter, EncounterIndex, FilledEncounter, getEncounterIndex } from '@/types'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { indexesStore } from '.'

class EncounterState {
  encounter?: Encounter
  filledEncounter?: FilledEncounter
}

class EncounterGetters extends Getters<EncounterState> {
}

class EncounterMutations extends Mutations<EncounterState> {
  select (encounter: Encounter) {
    this.state.encounter = encounter
  }
  selectFilled (encounter: FilledEncounter) {
    this.state.filledEncounter = encounter
  }
}

class EncounterActions extends Actions<EncounterState, EncounterGetters, EncounterMutations, EncounterActions> {
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
    this.mutations.select(encounter)
  }
  async fetch (id: string) {
    const encounter = await getEncounter(id)

    if (encounter) {
      this.mutations.select(encounter)
      // TODO: fetch all linked items
      const filled: FilledEncounter = fillEncounter(encounter)
      this.mutations.selectFilled(filled)
    }
    else throw new Error('encounter not found')
  }
  async save (encounter: Encounter) {
    try {
      await updateEncounter(encounter)
      const index = getEncounterIndex(encounter.id!, encounter)
      await indexesStore.actions.updateEncounter(index)
    } catch (error) {
      console.error('Encounter update failed: ', error)
      throw error
    }
  }
}

export const encounterModule = new Module({
  state: EncounterState,
  getters: EncounterGetters,
  mutations: EncounterMutations,
  actions: EncounterActions
})

export const encounterMapper = createMapper(encounterModule)
export function fillEncounter (encounter: Encounter): FilledEncounter {
  return {
    ...encounter,
    creatures: encounter.creatures.map(ref => {
      const cIndex = indexesStore.state.creatures.find(c => c.id === ref.id)
      if (cIndex) {
        return {
          ...cIndex,
          count: ref.count
        }
      } else {
        throw new Error(`Expected a reference to a creature but no creature with the id ${ref.id} exists`)
      }
    })
  }
}

