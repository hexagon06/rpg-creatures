import { inititialize as initializeIndexes, set } from '@/api/indexes'
import { CreatureIndex, EncounterIndex, IdeaIndex, Reference, RollingListIndex, SessionPrepIndex } from '@/types'
import { defineStore } from 'pinia'
import { userStore } from '.'

let initHandler: Promise<void>
type ListType = 'encounters' | 'creatures'
export const useIndexesStore = defineStore('indexes', {
  state: () => {
    return {
      initialized: false,
      userId: undefined as undefined | string,
      encounters: [] as EncounterIndex[],
      creatures: [] as CreatureIndex[],
      sessions: [] as SessionPrepIndex[],
      ideas: [] as IdeaIndex[],
      lists: [] as RollingListIndex[],
    }
  },
  actions: {
    async initialize (userId: string) {
      if (initHandler) return initHandler
      else if (!this.initialized || userId != this.userId) {
        if (userStore.state.currentUser && !userStore.state.currentUser.isAnonymous) {
          const userId = userStore.state.currentUser.uid
          initHandler = initializeIndexes(userId).then(indexes => {
            this.$patch((state) => {
              state.creatures = indexes.creatures
              state.encounters = indexes.encounters
              state.ideas = indexes.ideas ?? []
              state.lists = indexes.lists ?? []
              state.sessions = indexes.sessions ?? []

              state.initialized = true
            })
          })
        } else {
          initHandler = Promise.resolve()
          this.initialized = true
        }
      }
    },
    update<T extends Reference> (list: T[], item: T) {
      const index = list.findIndex(i => i.id === item.id)
      list[index] = item
    },
    mutateIndex<T extends Reference> (list: T[], item: T) {
      if (!this.initialized) {
        throw new Error('initialize() should have been called')
      }
      this.update(list, item)
      presistIndexes(this.$state)
    }
  }
})

// class IndexesActions extends Actions<IndexesState, IndexesGetters, IndexesMutations, IndexesActions> {
//   // private initHandler?: Promise<void>

//   // async initialize (userId: string) {
//   //   if (this.initHandler) return this.initHandler
//   //   else if (!this.state.initialized || userId != this.state.userId) {
//   //     if (userStore.state.currentUser && !userStore.state.currentUser.isAnonymous) {
//   //       const userId = userStore.state.currentUser.uid
//   //       this.initHandler = initializeIndexes(userId).then(indexes => {
//   //         this.mutations.set(indexes)
//   //         this.mutations.inititialized()
//   //       })
//   //     } else {
//   //       this.initHandler = Promise.resolve()
//   //       this.mutations.inititialized()
//   //     }
//   //   }
//   // }

//   // async addEncounter (encounter: EncounterIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.addEncounter(encounter))
//   // }
//   // async updateEncounter (encounter: EncounterIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.updateEncounter(encounter))
//   // }

//   // async addCreature (creature: CreatureIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.addCreature(creature))
//   // }
//   // async updateCreature (creature: CreatureIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.updateCreature(creature))
//   // }

//   // async addSession (session: SessionPrepIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.addSession(session))
//   // }
//   // async updateSession (session: SessionPrepIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.updateSession(session))
//   // }

//   // async addIdea (idea: IdeaIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.addIdea(idea))
//   // }
//   // async updateIdea (idea: IdeaIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.updateIdea(idea))
//   // }

//   // async addList (list: RollingListIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.addList(list))
//   // }
//   // async updateList (list: RollingListIndex) {
//   //   this.dispatch('mutateIndex', () => this.mutations.updateList(list))
//   // }

//   // mutateIndex (mutation: () => void) {
//   //   if (!this.state.initialized) {
//   //     throw new Error('initialize() should have been called')
//   //   }
//   //   mutation()
//   //   presistIndexes(this.state)
//   // }
// }

function presistIndexes (data: {
  encounters: EncounterIndex[],
  creatures: CreatureIndex[],
  sessions: SessionPrepIndex[],
  ideas: IdeaIndex[],
  lists: RollingListIndex[],
}) {
  if (userStore.state.currentUser) {
    const { encounters, creatures, sessions, ideas, lists } = data
    set({
      id: userStore.state.currentUser.uid,
      encounters,
      creatures,
      sessions,
      ideas,
      lists,
    })
  } else {
    throw new Error(`expected user id to be set`)
  }
}
