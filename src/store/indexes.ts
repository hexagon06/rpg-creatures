import { inititialize as initializeIndexes, set } from '@/api/indexes'
import { CreatureIndex, creatureTypes, EncounterIndex, IdeaIndex, Reference, RollingListIndex, SessionPrepIndex, UserDataIndex, WorldIndex } from '@/types'
import { defineStore } from 'pinia'
import { useUserStore } from './users'

function f (copy: CreatureIndex): CreatureIndex {
  if (copy.type !== undefined && creatureTypes.find(t => t === copy.type) === undefined) {
    const found = creatureTypes.find(t => copy.type?.toLowerCase().search(t.toLowerCase()) !== -1)
    if (found) {
      console.log('got here')

      copy.type = found
    } else {
      copy.type = undefined
    }
  }
  return copy
}

function fixCreatures (creatures: CreatureIndex[]): CreatureIndex[] {
  return creatures.map(c => f({ ...c }))
}

let initHandler: Promise<void>
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
      worlds: [] as WorldIndex[],
      users: [] as UserDataIndex[],
    }
  },
  actions: {
    async initialize (userId: string) {
      if (initHandler) return initHandler
      else if (!this.initialized || userId != this.userId) {
        const currentUser = useUserStore().currentUser
        if (currentUser && !currentUser.isAnonymous) {
          const userId = currentUser.uid
          initHandler = initializeIndexes(userId).then(async (indexes) => {
            const creatures = fixCreatures(indexes.creatures)

            this.$patch((state) => {
              state.creatures = creatures
              state.encounters = indexes.encounters
              state.ideas = indexes.ideas ?? []
              state.lists = indexes.lists ?? []
              state.sessions = indexes.sessions ?? []
              state.users = indexes.users ?? []

              state.initialized = true
            })
            await useUserStore().initializeUserData()
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
    async mutateIndex<T extends Reference> (list: T[], item: T) {
      if (!this.initialized) {
        throw new Error('initialize() should have been called')
      }
      this.update(list, item)
      await this.save()
    },
    async save () {
      return await presistIndexes(this.$state)
    }
  }
})

async function presistIndexes (data: {
  encounters: EncounterIndex[],
  creatures: CreatureIndex[],
  sessions: SessionPrepIndex[],
  ideas: IdeaIndex[],
  lists: RollingListIndex[],
  worlds: WorldIndex[],
  users: UserDataIndex[],
}) {
  console.log('persist indexes')

  const currentUser = useUserStore().currentUser
  if (currentUser) {
    const { encounters, creatures, sessions, ideas, lists, worlds, users } = data
    await set({
      id: currentUser.uid,
      encounters,
      creatures,
      sessions,
      ideas,
      lists,
      worlds,
      users,
    })
  } else {
    throw new Error(`expected user id to be set`)
  }
}
