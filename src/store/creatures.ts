import { getCreatures } from '@/api/creature'
import { Creature } from '@/types/creatures'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'

const KEY_CREATURE_SEARCH = 'creatureSearch'

class CreatureState {
  creatures: Creature[] = [];
  initialized = false;
  search = '';
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
  setSearch (search: string) {
    this.state.search = search
    window.sessionStorage.setItem(KEY_CREATURE_SEARCH, search)
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
}

class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
  async initialize () {
    await this.actions.fetchCreatures()
    this.mutations.setInitialized(true)
  }
  async fetchCreatures () {
    var results = await getCreatures()
    this.mutations.setCreatures(results)
  }
  async fetchSearch () {
    var search = window.sessionStorage.getItem(KEY_CREATURE_SEARCH)
    if (search) {
      this.mutations.setSearch(search)
    }
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters,
  mutations: CreatureMutations,
  actions: CreatureActions
})

export const creatureMapper = createMapper(creatureModule)
