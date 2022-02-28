import { createEncounter, getEncounter, updateEncounter } from '@/api/encounterApi'
import { Encounter, EncounterIndex } from '@/types'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { indexesStore } from '.'

class EncounterState {
  encounter?: Encounter
}

class EncounterGetters extends Getters<EncounterState> {
}

class EncounterMutations extends Mutations<EncounterState> {
  select (encounter: Encounter) {
    this.state.encounter = encounter
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
    const encounterIndex: EncounterIndex = getIndex(id, encounter)
    await indexesStore.actions.addEncounter(encounterIndex)
    this.mutations.select(encounter)
  }
  async fetch (id: string) {
    const encounter = await getEncounter(id)

    if (encounter) this.mutations.select(encounter)
    else throw new Error('encounter not found')
  }
  async save (encounter: Encounter) {
    try {
      await updateEncounter(encounter)
      const index = getIndex(encounter.id!, encounter)
      await indexesStore.actions.updateEncounter(index)
    } catch (error) {
      console.error('Encounter update failed: ', error)
      throw error
    }
  }
}

function getIndex (id: string, encounter: Encounter): EncounterIndex {
  return {
    id: id,
    name: encounter.name,
    synopsis: encounter.synopsis,
    tags: encounter.tags,
  }
}

export const encounterModule = new Module({
  state: EncounterState,
  getters: EncounterGetters,
  mutations: EncounterMutations,
  actions: EncounterActions
})

export const encounterMapper = createMapper(encounterModule)
