import { createEncounter, getEncounter, updateEncounter } from '@/api/encounterApi'
import { Encounter, EncounterIndex, FilledEncounter, getEncounterIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { cloneDeep } from 'lodash'
import Vue from 'vue'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { indexesStore, userStore } from '.'

class EncounterState {
  encounter?: Encounter
  encounterForm?: Encounter
  filledEncounter?: FilledEncounter
}

class EncounterGetters extends Getters<EncounterState> {
}

class EncounterMutations extends Mutations<EncounterState> {
  select (encounter: Encounter) {
    console.log('select', this.state.encounter?.name, encounter.name)

    const clone = cloneDeep(encounter)
    if (this.state.encounter) {
      // this.state.encounter = encounter
      Object.assign(this.state.encounter, clone)
    }
    Vue.set(this.state, 'encounter', clone)
    console.log('after select', this.state.encounter?.name, encounter.name)
  }
  selectFilled (encounter: FilledEncounter) {
    // this.state.filledEncounter = encounter
    Vue.set(this.state, 'filledEncounter', cloneDeep(encounter))
  }
  editEncounter (encounter?: Encounter) {
    console.log('edit', this.state.encounterForm, encounter)
    if (this.state.encounterForm === undefined || encounter === undefined && this.state.encounterForm !== encounter) {
      // one of them is undefined and the other is not
      Vue.set(this.state, 'encounterForm', encounter)
    } else if (this.state.encounterForm === undefined || encounter === undefined) {
      // both are undefined
    } else if (!deepEqual(this.state.encounterForm, encounter)) {
      // both are set and not equal
      Vue.set(this.state, 'encounterForm', encounter)
    }
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
    this.state.encounter = undefined
    this.state.filledEncounter = undefined
    this.commit('editEncounter', undefined)

    const encounter = await getEncounter(id)

    if (encounter) {
      this.commit('select', encounter)
      // TODO: fetch all linked items
      const filled: FilledEncounter = fillEncounter(encounter)
      this.commit('selectFilled', filled)
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
  async saveEdit () {
    if (this.state.encounterForm) {
      await this.dispatch('save', { ...this.state.encounterForm })
      this.commit('select', this.state.encounterForm)
    }
  }
  async startEdit () {
    if (this.state.encounter) {
      this.commit('editEncounter', { ...this.state.encounter })
    } else {
      throw new Error('no encounter selected')
    }
  }
  async stopEdit () {
    if (this.state.encounterForm) {
      // this.commit('editEncounter', undefined)
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

