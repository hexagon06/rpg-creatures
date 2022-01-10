import { createCreature, getCreatures } from '@/api/creature'
import { Creature } from '@/types/creatures'
import Vue from 'vue'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'

class CreatureState {
  creatures: Creature[] = [];
  selectedCreature: Creature | undefined
  initialized = false;
  currentPage = 1;
  filteredCount = 0;
  perPage = 20;
}

class CreatureGetters extends Getters<CreatureState> {
  get (id: number): Creature | undefined {
    return this.state.creatures.find((creature) => creature.id === id)
  }
}

class CreatureMutations extends Mutations<CreatureState> {
  setCreatures (creatures: Creature[]) {
    this.state.creatures = creatures
  }
  setInitialized (init: boolean) {
    this.state.initialized = init
  }
  setFilteredCount (count: number) {
    this.state.filteredCount = count
    this.state.currentPage = 1
  }
  setCurrentPage (page: number) {
    this.state.currentPage = page
  }
  setPerPage (amount: number) {
    this.state.perPage = amount
  }
  setSelectedCreature (creature?: Creature) {
    // need to do this with set because the mappers and reactive stuff does not handle nullable properly
    Vue.set(this.state, 'selectedCreature', creature)
  }
  addCreature (creature: Creature) {
    this.state.creatures.push(creature)
  }
}

class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
  async initialize () {
    await this.actions.fetchCreatures()
    this.mutations.setInitialized(true)
  }
  async fetchCreatures () {
    var results = await getCreatures()
    this.mutations.setCreatures(results)
    this.mutations.setFilteredCount(results.length)
  }
  async setSelectedCreature (id?: number) {
    if (id === undefined) {
      this.commit('setSelectedCreature', undefined)
    } else {
      const creature = this.getters.get(id)
      this.commit('setSelectedCreature', creature)
    }
  }
  async createCreature (creature: Creature) {
    // making sure we allow google to generate an id
    creature.id = undefined
    await createCreature(creature)
    this.mutations.addCreature(creature)
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters,
  mutations: CreatureMutations,
  actions: CreatureActions
})

export const creatureMapper = createMapper(creatureModule)
