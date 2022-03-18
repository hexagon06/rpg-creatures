import { createCreature, getCreature, updateCreature } from '@/api/creature'
import { Creature, getCreatureIndex } from '@/types'
import { deepEqual } from '@firebase/util'
import { defineStore } from 'pinia'
import { indexesStore } from '.'

export const useCreatureStore = defineStore('creatures', {
  state: () => {
    return {
      creature: undefined as undefined | Creature,
      creatureForm: undefined as undefined | Creature,
    }
  },
  getters: {
    isDirty (): boolean {
      if (this.creatureForm && this.creature) {
        return !deepEqual(this.creatureForm, this.creature)
      } else if (!this.creatureForm && !this.creature) {
        return false
      } else { // one of them is undefined
        return true
      }
    }
  },
  actions: {
    async createCreature (): Promise<string> {
      const creature: Creature = {
        abilityKeys: [],
        abilityScores: {},
        alignment: [],
        environment: [],
        favorite: false,
        name: 'new creature',
        nameIsNoun: false,
        newTags: [],
        organisation: [],
        tags: []
      }
      const id = await createCreature(creature)
      const creatureIndex = getCreatureIndex({ ...creature, id })
      await indexesStore.actions.addCreature(creatureIndex)
      this.creature = creature
      return id
    },
    async fetch (id: string) {
      this.creature = undefined
      this.creatureForm = undefined

      const creature = await getCreature(id)

      if (creature) {
        this.creature = creature
      } else throw new Error('creature not found')
    },
    async save (creature: Creature) {
      try {
        await updateCreature(creature)
        const index = getCreatureIndex(creature)
        await indexesStore.actions.updateCreature(index)
      } catch (error) {
        console.error('Creature update failed: ', error)
        throw error
      }
    },
    async saveEdit () {
      if (this.creatureForm) {
        const creature = { ...this.creatureForm }
        await this.save(creature)
        this.creature = creature
      }
    },
    async startEdit () {
      if (this.creature) {
        this.creatureForm = { ...this.creature }
      } else {
        throw new Error('no encounter selected')
      }
    },
    async stopEdit () {
      if (this.creatureForm) {
        this.creatureForm = undefined
      }
    },
    async updateFavorite (update: { creatureId: string, favorite: boolean }) {
      console.warn('not implementted: updateFavorite')

      // this.mutations.updateFavorite(update)
      // const creature = this.getters.get(update.creatureId)
      // if (creature) {
      //   await updateCreature(creature)
      // }
    },
  }
})

// class CreatureState {
//   selectedCreature: Creature | undefined
// }

// class CreatureGetters extends Getters<CreatureState> { }

// class CreatureMutations extends Mutations<CreatureState> {
//   setSelectedCreature (creature?: Creature) {
//     // need to do this with set because the mappers and reactive stuff does not handle nullable properly
//     Vue.set(this.state, 'selectedCreature', creature)
//   }
//   updateCreature (creature: Creature) {
//     if (creature.id !== this.state.selectedCreature?.id) throw new Error('creature did not match selected creature')
//     // using assign so we dont add the update source to the vue state.
//     // this way we can using that object to edit
//     Object.assign(this.state.selectedCreature, creature)
//   }
//   // updateFavorite (update: { creatureId: string, favorite: boolean }) {
//   //   // const { favorite, creatureId } = update
//   //   // // const index = this.state.creatures.findIndex(c => c.id === update.creatureId)
//   //   // // Vue.set(this.state.creatures[index], 'favorite', update.favorite)
//   //   // const creature = this.state.creatures.find(c => c.id === creatureId)
//   //   // Object.assign(creature, { favorite })
//   // }
// }

// class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
//   async setSelectedCreature (id?: string) {
//     if (id === undefined) {
//       this.commit('setSelectedCreature', undefined)
//     } else {
//       const creature = await getCreature(id)
//       if (creature) {
//         this.commit('setSelectedCreature', creature)
//       } else {
//         console.warn('setSelectedCreature could not retrieve creature')
//       }
//     }
//   }
//   async createCreature (creature: Creature) {
//     // making sure we allow google to generate an id
//     creature.id = undefined
//     const newId = await createCreature(creature)
//     creature.id = newId
//     this.commit('setSelectedCreature', creature)
//     await indexesStore.actions.addCreature(getCreatureIndex(creature))
//   }
//   async updateFavorite (update: { creatureId: string, favorite: boolean }) {
//     console.warn('not implementted: updateFavorite')

//     // this.mutations.updateFavorite(update)
//     // const creature = this.getters.get(update.creatureId)
//     // if (creature) {
//     //   await updateCreature(creature)
//     // }
//   }
//   async updateCreature (creature: Creature) {
//     this.mutations.updateCreature(creature)
//     await updateCreature(creature)
//     await indexesStore.actions.updateCreature(getCreatureIndex(creature))
//   }
// }

// export const creatureModule = new Module({
//   state: CreatureState,
//   getters: CreatureGetters,
//   mutations: CreatureMutations,
//   actions: CreatureActions
// })

// export const creatureMapper = createMapper(creatureModule)
