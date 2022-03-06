import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { abilityStore, indexesStore } from '.'
import { filter, uniq } from 'lodash'
import { AbillityFilterOptions, CreatureFilter, CreatureFilterOptions, defaultCreatureFilterOptions, defaultResult, FilterResult } from '@/types/filter'

const KEY_CREATURE_FILTERS = 'creature-filters'

export type NumberBounds = { min: number, max: number }

class FilterState {
  initialized: boolean = false

  creatureFilter: CreatureFilter = new CreatureFilter()
  creatureOptions: CreatureFilterOptions = defaultCreatureFilterOptions()
  creatureFilterResult: FilterResult = defaultResult()

  abilityOptions: AbillityFilterOptions = {
    tags: []
  }
}

class FilterGetters extends Getters<FilterState> {
  getFilter (): CreatureFilter {
    return this.state.creatureFilter
  }
}

class FilterMutations extends Mutations<FilterState> {
  setCreatureFilter (filter: CreatureFilter) {
    Object.assign(this.state.creatureFilter, filter)
    // Vue.set(this.state, 'selectedCreature', creature)
  }
  setCreatureFilterResult (result: FilterResult) {
    Object.assign(this.state.creatureFilterResult, result)
  }
  setFilterOptions (options: {
    sizeOptions: string[],
    typeOptions: string[],
    environmentOptions: string[],
    tagsOptions: string[],
    abilityTagsOptions: string[],
    systemOptions: string[],
    crOptions: number[],
    sourceOptions: string[],
  }): void {
    const { sizeOptions, typeOptions, environmentOptions, tagsOptions, abilityTagsOptions, systemOptions, crOptions, sourceOptions } = options
    this.state.creatureOptions.size = sizeOptions
    this.state.creatureOptions.type = typeOptions
    this.state.creatureOptions.environment = environmentOptions
    this.state.creatureOptions.tags = tagsOptions
    this.state.creatureOptions.system = systemOptions
    this.state.creatureOptions.cr = crOptions
    this.state.creatureOptions.source = sourceOptions

    this.state.abilityOptions.tags = abilityTagsOptions
  }
  addEnvironment (environment: string) {
    this.state.creatureOptions.environment.push(environment)
  }
  addOrganisation (organisation: string) {
    this.state.creatureOptions.organisation.push(organisation)
  }
  addTag (tag: string) {
    this.state.creatureOptions.tags.push(tag)
  }
  addAbilityTag (tag: string) {
    this.state.abilityOptions.tags.push(tag)
  }
  setInitialized (init: boolean) {
    this.state.initialized = init
  }
}

class FilterActions extends Actions<FilterState, FilterGetters, FilterMutations, FilterActions> {
  async setCreatureFilter (filter: CreatureFilter) {
    this.mutations.setCreatureFilter(filter)
  }

  async fetchSearch () {
    var filterString = window.sessionStorage.getItem(KEY_CREATURE_FILTERS)
    if (filterString) {
      var saved = JSON.parse(filterString)

      if (saved?.creatureFilter) {
        this.mutations.setCreatureFilter({
          ...saved.creatureFilter
        })
      }
    }

    if (!indexesStore.state.initialized) throw new Error('IndexStore should have been initialized before fetching search')

    var creatures = indexesStore.state.creatures
    var abilities = abilityStore.state.abilities

    this.mutations.setFilterOptions({
      sizeOptions: toUniqueStrings(creatures.map(c => c.size)),
      typeOptions: toUniqueStrings(creatures.map(c => c.type)),
      environmentOptions: toUniqueStrings(creatures.flatMap(c => c.environment)),
      tagsOptions: toUniqueStrings(creatures.flatMap(c => c.tags)),
      abilityTagsOptions: toUniqueStrings(abilities.flatMap(c => c.tags)),
      systemOptions: toUniqueStrings(creatures.map(c => c.system)),
      crOptions: toUniqueNumbers(creatures.map(c => c.cr)),
      sourceOptions: toUniqueStrings(creatures.map(c => c.source))
    })
    this.mutations.setInitialized(true)
  }
  storeSelection () {
    // const {
    //   search,
    //   sizeSelection,
    //   typeSelection,
    //   environmentSelection,
    //   tagsSelection,
    //   systemSelection,
    //   crSelection,
    //   favoriteSelection } = this.state
    const selection = {
      creatureFilter: this.state.creatureFilter
    }
    window.sessionStorage.setItem(KEY_CREATURE_FILTERS, JSON.stringify(selection))
  }
  async addEnvironment (environment: string) {
    this.mutations.addEnvironment(environment)
  }
  async addOrganisation (organisation: string) {
    this.mutations.addOrganisation(organisation)
  }
  async addTag (tag: string) {
    this.mutations.addTag(tag)
  }
  async addAbilityTag (tag: string) {
    this.mutations.addAbilityTag(tag)
  }
  async setCreatureFilterResult (result: FilterResult) {
    this.mutations.setCreatureFilterResult(result)
  }
}

export const filterModule = new Module({
  state: FilterState,
  getters: FilterGetters,
  mutations: FilterMutations,
  actions: FilterActions
})

export const filterMapper = createMapper(filterModule)

function toUniques<T> (values: (T | undefined | null)[]): T[] {
  return filter(uniq(values), (s) => s !== undefined) as T[]
}

function toUniqueStrings (values: (string | undefined | null)[]): string[] {
  return toUniques(values).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function toUniqueNumbers (values: (number | undefined | null)[]): number[] {
  return toUniques(values).sort((a, b) => a - b)
}
