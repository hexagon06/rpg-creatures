import { createEncounter, getEncounter } from '@/api/encounterApi'
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
    const encounterIndex: EncounterIndex = {
      id: id,
      name: encounter.name,
      synopsis: encounter.synopsis,
      tags: encounter.tags,
    }
    await indexesStore.actions.addEncounter(encounterIndex)
    this.mutations.select(encounter)
  }
  async fetch (id: string) {
    const encounter = await getEncounter(id)

    if (encounter) this.mutations.select(encounter)
    else throw new Error('encounter not found')
  }
}

export const encounterModule = new Module({
  state: EncounterState,
  getters: EncounterGetters,
  mutations: EncounterMutations,
  actions: EncounterActions
})

export const encounterMapper = createMapper(encounterModule)
