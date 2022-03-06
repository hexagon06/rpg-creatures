import { createCreature, getCreature, updateCreature } from '@/api/creature'
import { Creature, getCreatureIndex } from '@/types'
import Vue from 'vue'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { indexesStore } from '.'

class CreatureState {
  selectedCreature: Creature | undefined
}

class CreatureGetters extends Getters<CreatureState> { }

class CreatureMutations extends Mutations<CreatureState> {
  setSelectedCreature (creature?: Creature) {
    // need to do this with set because the mappers and reactive stuff does not handle nullable properly
    Vue.set(this.state, 'selectedCreature', creature)
  }
  updateCreature (creature: Creature) {
    if (creature.id !== this.state.selectedCreature?.id) throw new Error('creature did not match selected creature')
    // using assign so we dont add the update source to the vue state. 
    // this way we can using that object to edit
    Object.assign(this.state.selectedCreature, creature)
  }
  // updateFavorite (update: { creatureId: string, favorite: boolean }) {
  //   // const { favorite, creatureId } = update
  //   // // const index = this.state.creatures.findIndex(c => c.id === update.creatureId)
  //   // // Vue.set(this.state.creatures[index], 'favorite', update.favorite)
  //   // const creature = this.state.creatures.find(c => c.id === creatureId)
  //   // Object.assign(creature, { favorite })
  // }
}

class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
  async setSelectedCreature (id?: string) {
    if (id === undefined) {
      this.commit('setSelectedCreature', undefined)
    } else {
      const creature = await getCreature(id)
      if (creature) {
        this.commit('setSelectedCreature', creature)
      } else {
        console.warn('setSelectedCreature could not retrieve creature')
      }
    }
  }
  async createCreature (creature: Creature) {
    // making sure we allow google to generate an id
    creature.id = undefined
    const newId = await createCreature(creature)
    creature.id = newId
    this.commit('setSelectedCreature', creature)
    await indexesStore.actions.addCreature(getCreatureIndex(creature))
  }
  async updateFavorite (update: { creatureId: string, favorite: boolean }) {
    console.warn('not implementted: updateFavorite')

    // this.mutations.updateFavorite(update)
    // const creature = this.getters.get(update.creatureId)
    // if (creature) {
    //   await updateCreature(creature)
    // }
  }
  async updateCreature (creature: Creature) {
    this.mutations.updateCreature(creature)
    await updateCreature(creature)
    await indexesStore.actions.updateCreature(getCreatureIndex(creature))
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters,
  mutations: CreatureMutations,
  actions: CreatureActions
})

export const creatureMapper = createMapper(creatureModule)
