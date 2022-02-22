import { createAbility, getAbilities, updateAbility } from '@/api/ability'
import { Ability } from '@/types/abilities'
import Vue from 'vue'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'

class AbilityState {
  abilities: Ability[] = [];
  selectedAbility: Ability | undefined
  initialized = false;
  currentPage = 1;
  filteredCount = 0;
  perPage = 20;
}

class AbilityGetters extends Getters<AbilityState> {
  get (id: string): Ability | undefined {
    return this.state.abilities.find((ability) => ability.id === id)
  }
}

class AbilityMutations extends Mutations<AbilityState> {
  setAbilities (abilities: Ability[]) {
    this.state.abilities = abilities
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
  setSelectedAbility (ability?: Ability) {
    // need to do this with set because the mappers and reactive stuff does not handle nullable properly
    Vue.set(this.state, 'selectedAbility', ability)
  }
  addAbility (ability: Ability) {
    this.state.abilities.push(ability)
  }
  updateAbility (ability: Ability) {
    const storedAbility = this.state.abilities.find(c => c.id === ability.id)
    // using assign so we dont add the update source to the vue state. 
    // this way we can using that object to edit
    Object.assign(storedAbility, ability)
  }
  updateFavorite (update: { abilityId: string, favorite: boolean }) {
    const { favorite, abilityId } = update
    // const index = this.state.abilities.findIndex(c => c.id === update.abilityId)
    // Vue.set(this.state.abilitys[index], 'favorite', update.favorite)
    const ability = this.state.abilities.find(c => c.id === abilityId)
    Object.assign(ability, { favorite })
  }
}

class AbilityActions extends Actions<AbilityState, AbilityGetters, AbilityMutations, AbilityActions> {
  async initialize () {
    await this.actions.fetchAbilities()
    this.mutations.setInitialized(true)
  }
  async fetchAbilities () {
    var results = await getAbilities()
    this.mutations.setAbilities(results)
    this.mutations.setFilteredCount(results.length)
  }
  async setSelectedAbility (id?: string) {
    if (id === undefined) {
      this.commit('setSelectedAbility', undefined)
    } else {
      const ability = this.getters.get(id)
      this.commit('setSelectedAbility', ability)
    }
  }
  async createAbility (ability: Ability) {
    // making sure we allow google to generate an id
    ability.id = undefined
    const newId = await createAbility(ability)
    ability.id = newId
    this.mutations.addAbility(ability)
  }
  async updateFavorite (update: { abilityId: string, favorite: boolean }) {
    this.mutations.updateFavorite(update)
    const ability = this.getters.get(update.abilityId)
    if (ability) {
      await updateAbility(ability)
    }
  }
  async updateAbility (ability: Ability) {
    this.mutations.updateAbility(ability)
    await updateAbility(ability)
  }
}

export const abilityModule = new Module({
  state: AbilityState,
  getters: AbilityGetters,
  mutations: AbilityMutations,
  actions: AbilityActions
})

export const abilityMapper = createMapper(abilityModule)
