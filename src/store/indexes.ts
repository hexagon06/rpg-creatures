import { inititialize as initializeIndexes, set } from '@/api/indexes'
import { EncounterIndex, Indexes } from '@/types'
import { deepCopy, deepExtend } from '@firebase/util'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { userStore } from '.'

class IndexesState {
  initialized = false
  userId?: string
  encounters: EncounterIndex[] = []
}

class IndexesGetters extends Getters<IndexesState> {
}

class IndexesMutations extends Mutations<IndexesState> {
  addEncounter (encounter: EncounterIndex) {
    this.state.encounters = this.state.encounters.concat([encounter])
  }
  updateEncounter (encounter: EncounterIndex) {
    const encounters = deepCopy(this.state.encounters)
    const instance = encounters.find(e => e.id == encounter.id)

    if (instance) {
      deepExtend(instance, encounter)
      this.state.encounters = encounters
    }
  }
  inititialized () {
    this.state.initialized = true
  }
  set (indexes: Indexes) {
    this.state.encounters = indexes.encounters
  }
}

class IndexesActions extends Actions<IndexesState, IndexesGetters, IndexesMutations, IndexesActions> {
  async initialize (userId: string) {
    if (!this.state.initialized || userId != this.state.userId) {
      if (userStore.state.currentUser && !userStore.state.currentUser.isAnonymous) {
        const userId = userStore.state.currentUser.uid

        const indexes = await initializeIndexes(userId)
        this.mutations.set(indexes)
      }

      this.mutations.inititialized()
    }
  }
  async addEncounter (encounter: EncounterIndex) {
    if (!this.state.initialized) {
      throw new Error('initialize() should have been called')
    }
    this.mutations.addEncounter(encounter)
    if (userStore.state.currentUser) {
      set({
        id: userStore.state.currentUser.uid,
        encounters: this.state.encounters,
      })
    } else {
      throw new Error(`expected user id to be set`)
    }
  }
  async updateEncounter (encounter: EncounterIndex) {
    if (!this.state.initialized) {
      throw new Error('initialize() should have been called')
    }
    this.mutations.updateEncounter(encounter)

    if (userStore.state.currentUser) {
      set({
        id: userStore.state.currentUser.uid,
        encounters: this.state.encounters,
      })
    } else {
      throw new Error(`expected user id to be set`)
    }
  }
}

export const indexesModule = new Module({
  state: IndexesState,
  getters: IndexesGetters,
  mutations: IndexesMutations,
  actions: IndexesActions
})

export const indexesMapper = createMapper(indexesModule)
