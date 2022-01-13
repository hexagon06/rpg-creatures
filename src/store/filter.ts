import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import { creatureStore } from '.'
import { filter, max, uniq } from 'lodash'

const KEY_CREATURE_FILTERS = 'creature-filters'

export type NumberBounds = { min: number, max: number }
export type CreatureFilter = {
  search: string,
  size: string[],
  type: string[],
  environment: string[],
  tags: string[],
  system: string[],
  cr: number[],
  source: string[],
  favorite: boolean,
}

class FilterState {
  initialized: boolean = false
  search = '';
  sizeOptions: string[] = [];
  sizeSelection: string[] = [];
  typeOptions: string[] = [];
  typeSelection: string[] = [];
  environmentOptions: string[] = [];
  environmentSelection: string[] = [];
  tagsOptions: string[] = [];
  tagsSelection: string[] = [];
  systemOptions: string[] = [];
  systemSelection: string[] = [];
  crOptions: number[] = [];
  crSelection: number[] = [];
  organisationOptions: string[] = ['not loaded'];
  sourceSelection: string[] = [];
  sourceOptions: string[] = [];
  favoriteSelection: boolean = false;
}

class FilterGetters extends Getters<FilterState> {
  getFilter (): CreatureFilter {
    return {
      search: this.state.search,
      size: this.state.sizeSelection,
      type: this.state.typeSelection,
      environment: this.state.environmentSelection,
      tags: this.state.tagsSelection,
      system: this.state.systemSelection,
      cr: this.state.crSelection,
      source: this.state.sourceSelection,
      favorite: this.state.favoriteSelection
    }
  }
}

class FilterMutations extends Mutations<FilterState> {
  setSearch (search: string) {
    this.state.search = search
  }
  setSizes (sizes: string[]) {
    this.state.sizeSelection = sizes
  }
  setTypes (sizes: string[]) {
    this.state.typeSelection = sizes
  }
  setEnvironments (sizes: string[]) {
    this.state.environmentSelection = sizes
  }
  setTags (sizes: string[]) {
    this.state.tagsSelection = sizes
  }
  setSystems (sizes: string[]) {
    this.state.systemSelection = sizes
  }
  setSources (sources: string[]) {
    this.state.sourceSelection = sources
  }
  setFavorite (favorite: boolean) {
    this.state.favoriteSelection = favorite
  }
  setFilterOptions (options: {
    sizeOptions: string[],
    typeOptions: string[],
    environmentOptions: string[],
    tagsOptions: string[],
    systemOptions: string[],
    crOptions: number[],
    sourceOptions: string[],
  }): void {
    const { sizeOptions, typeOptions, environmentOptions, tagsOptions, systemOptions, crOptions, sourceOptions } = options
    this.state.sizeOptions = sizeOptions
    this.state.typeOptions = typeOptions
    this.state.environmentOptions = environmentOptions
    this.state.tagsOptions = tagsOptions
    this.state.systemOptions = systemOptions
    this.state.crOptions = crOptions
    this.state.sourceOptions = sourceOptions
  }
  setCR (sizes: number[]) {
    this.state.crSelection = sizes
  }
  addEnvironment (environment: string) {
    this.state.environmentOptions.push(environment)
  }
  addOrganisation (organisation: string) {
    this.state.organisationOptions.push(organisation)
  }
  addTag (tag: string) {
    this.state.tagsOptions.push(tag)
  }
  setInitialized (init: boolean) {
    this.state.initialized = init
  }
}

class FilterActions extends Actions<FilterState, FilterGetters, FilterMutations, FilterActions> {
  setSearch (sizes: string) {
    this.mutations.setSearch(sizes)
    this.actions.storeSelection()
  }
  setSizes (sizes: string[]) {
    this.mutations.setSizes(sizes)
    this.actions.storeSelection()
  }
  setTypes (sizes: string[]) {
    this.mutations.setTypes(sizes)
    this.actions.storeSelection()
  }
  setEnvironments (sizes: string[]) {
    this.mutations.setEnvironments(sizes)
    this.actions.storeSelection()
  }
  setTags (sizes: string[]) {
    this.mutations.setTags(sizes)
    this.actions.storeSelection()
  }
  setSystems (sizes: string[]) {
    this.mutations.setSystems(sizes)
    this.actions.storeSelection()
  }
  setCR (sizes: number[]) {
    this.mutations.setCR(sizes)
    this.actions.storeSelection()
  }
  setSources (sources: string[]) {
    this.mutations.setSources(sources)
    this.actions.storeSelection()
  }
  setFavorites (favorite: boolean) {
    this.mutations.setFavorite(favorite)
    this.actions.storeSelection()
  }

  async fetchSearch () {
    var filterString = window.sessionStorage.getItem(KEY_CREATURE_FILTERS)
    if (filterString) {
      var {
        search,
        sizeSelection,
        typeSelection,
        environmentSelection,
        tagsSelection,
        systemSelection,
        crSelection,
        sourceSelection,
        favoriteSelection } = JSON.parse(filterString)

      if (search) this.mutations.setSearch(search)
      if (sizeSelection) this.mutations.setSizes(sizeSelection)
      if (typeSelection) this.mutations.setTypes(typeSelection)
      if (environmentSelection) this.mutations.setEnvironments(environmentSelection)
      if (tagsSelection) this.mutations.setTags(tagsSelection)
      if (systemSelection) this.mutations.setSystems(systemSelection)
      if (crSelection) this.mutations.setCR(crSelection)
      if (sourceSelection) this.mutations.setSources(sourceSelection)
      if (favoriteSelection) this.mutations.setFavorite(favoriteSelection)
    }

    if (!creatureStore.state.initialized) await creatureStore.actions.initialize()

    var creatures = creatureStore.state.creatures

    this.mutations.setFilterOptions({
      sizeOptions: toUniqueStrings(creatures.map(c => c.size)),
      typeOptions: toUniqueStrings(creatures.map(c => c.type)),
      environmentOptions: toUniqueStrings(creatures.flatMap(c => c.environment)),
      tagsOptions: toUniqueStrings(creatures.flatMap(c => c.tags)),
      systemOptions: toUniqueStrings(creatures.map(c => c.system)),
      crOptions: toUniqueNumbers(creatures.map(c => c.cr)),
      sourceOptions: toUniqueStrings(creatures.map(c => c.source))
    })
    this.mutations.setInitialized(true)
  }
  storeSelection () {
    const {
      search,
      sizeSelection,
      typeSelection,
      environmentSelection,
      tagsSelection,
      systemSelection,
      crSelection,
      favoriteSelection } = this.state
    const selection = {
      search,
      sizeSelection,
      typeSelection,
      environmentSelection,
      tagsSelection,
      systemSelection,
      crSelection,
      favoriteSelection
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
