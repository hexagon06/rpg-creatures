import { inititialize as initializeIndexes, set } from '@/api/indexes'
import { CreatureIndex, EncounterIndex, Indexes, SessionPrep, SessionPrepIndex } from '@/types'
import { deepCopy, deepExtend } from '@firebase/util'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { userStore } from '.'

class IndexesState {
  initialized = false
  userId?: string
  encounters: EncounterIndex[] = []
  creatures: CreatureIndex[] = []
  sessions: SessionPrepIndex[] = []
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

  addCreature (creature: CreatureIndex) {
    this.state.creatures = this.state.creatures.concat([creature])
  }
  updateCreature (creature: CreatureIndex) {
    const creatures = deepCopy(this.state.creatures)
    const instance = creatures.find(e => e.id === creature.id)

    if (instance) {
      deepExtend(instance, creature)
      this.state.creatures = creatures
    }
  }

  addSession (session: SessionPrepIndex) {
    this.state.sessions = this.state.sessions.concat([session])
  }
  updateSession (session: SessionPrepIndex) {
    const sessions = deepCopy(this.state.sessions)
    const instance = sessions.find(e => e.id === session.id)

    if (instance) {
      deepExtend(instance, session)
      this.state.sessions = sessions
    }
  }

  inititialized () {
    this.state.initialized = true
  }
  set (indexes: Indexes) {
    this.state.encounters = indexes.encounters
    this.state.creatures = indexes.creatures
  }
}

class IndexesActions extends Actions<IndexesState, IndexesGetters, IndexesMutations, IndexesActions> {
  private initHandler?: Promise<void>

  async initialize (userId: string) {
    if (this.initHandler) return this.initHandler
    else if (!this.state.initialized || userId != this.state.userId) {
      if (userStore.state.currentUser && !userStore.state.currentUser.isAnonymous) {
        const userId = userStore.state.currentUser.uid
        this.initHandler = initializeIndexes(userId).then(indexes => {
          this.mutations.set(indexes)
          this.mutations.inititialized()
        })
      } else {
        this.initHandler = Promise.resolve()
        this.mutations.inititialized()
      }
    }
  }

  async addEncounter (encounter: EncounterIndex) {
    this.dispatch('mutateIndex', () => this.mutations.addEncounter(encounter))
  }
  async updateEncounter (encounter: EncounterIndex) {
    this.dispatch('mutateIndex', () => this.mutations.updateEncounter(encounter))
  }

  async addCreature (creature: CreatureIndex) {
    this.dispatch('mutateIndex', () => this.mutations.addCreature(creature))
  }
  async updateCreature (creature: CreatureIndex) {
    this.dispatch('mutateIndex', () => this.mutations.updateCreature(creature))
  }

  async addSession (session: SessionPrepIndex) {
    this.dispatch('mutateIndex', () => this.mutations.addSession(session))
  }
  async updateSession (session: SessionPrepIndex) {
    this.dispatch('mutateIndex', () => this.mutations.updateSession(session))
  }

  mutateIndex (mutation: () => void) {
    if (!this.state.initialized) {
      throw new Error('initialize() should have been called')
    }
    mutation()
    presistIndexes(this.state)
  }
}

function presistIndexes (data: { encounters: EncounterIndex[], creatures: CreatureIndex[] }) {
  if (userStore.state.currentUser) {
    const { encounters, creatures } = data
    set({
      id: userStore.state.currentUser.uid,
      encounters,
      creatures,
    })
  } else {
    throw new Error(`expected user id to be set`)
  }
}

export const indexesModule = new Module({
  state: IndexesState,
  getters: IndexesGetters,
  mutations: IndexesMutations,
  actions: IndexesActions
})

export const indexesMapper = createMapper(indexesModule)
