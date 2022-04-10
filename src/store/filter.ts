import { abilityStore } from '.'
import { filter, uniq } from 'lodash'
import { AbillityFilterOptions, CreatureFilter, CreatureFilterOptions, defaultCreatureFilterOptions, defaultResult, FilterResult, IdeaFilterOptions } from '@/types/filter'
import { defineStore } from 'pinia'
import { useIdeaStore } from './ideas'
import { useIndexesStore } from './indexes'

const KEY_CREATURE_FILTERS = 'creature-filters'

export type NumberBounds = { min: number, max: number }

export const useFilterStore = defineStore('filters', {
  state: () => {
    return {
      creatureFilter: {
        search: '',
        size: [] as string[],
        type: [] as string[],
        environment: [] as string[],
        tags: [] as string[],
        system: [] as string[],
        cr: [] as number[],
        source: [] as string[],
        favorite: false
      } as CreatureFilter,
      creatureOptions: {
        size: [],
        type: [],
        organisation: [],
        environment: [],
        tags: [],
        system: [],
        cr: [],
        source: [],
      } as CreatureFilterOptions,
      creatureFilterResult: {
        count: 0,
      } as FilterResult,
      abilityOptions: {
        tags: []
      } as AbillityFilterOptions,
      ideaOptions: {
        tags: [],
        categories: [],
      } as IdeaFilterOptions,
      initialized: false
    }
  },
  actions: {
    addEnvironment (environment: string) {
      this.$patch((state) => {
        state.creatureOptions.environment.push(environment)
      })
    },
    addOrganisation (organisation: string) {
      this.$patch((state) => {
        state.creatureOptions.organisation.push(organisation)
      })
    },
    addTag (tag: string) {
      this.$patch((state) => {
        state.creatureOptions.tags.push(tag)
      })
    },
    addAbilityTag (tag: string) {
      this.$patch((state) => {
        state.abilityOptions.tags.push(tag)
      })
    },
    addIdeaTag (tag: string) {
      this.$patch((state) => {
        state.ideaOptions.tags.push(tag)
      })
    },
    addIdeaCategory (category: string) {
      this.$patch((state) => {
        state.ideaOptions.categories.push(category)
      })
    },

    async setCreatureFilter (filter: CreatureFilter) {
      this.$patch({
        creatureFilter: { ...filter }
      })
    },
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
        creatureFilter: this.creatureFilter
      }
      window.sessionStorage.setItem(KEY_CREATURE_FILTERS, JSON.stringify(selection))
    },
    async fetchSearch () {
      var filterString = window.sessionStorage.getItem(KEY_CREATURE_FILTERS)
      if (filterString) {
        var saved = JSON.parse(filterString)

        if (saved?.creatureFilter) {
          this.$patch({
            creatureFilter: { ...saved.creatureFilter }
          })
        }
      }

      if (!useIndexesStore().initialized) throw new Error('IndexStore should have been initialized before fetching search')

      const creatures = useIndexesStore().creatures
      const ideas = useIndexesStore().ideas
      const abilities = abilityStore.state.abilities

      this.$patch({
        creatureOptions: {
          size: toUniqueStrings(creatures.map(c => c.size)),
          type: toUniqueStrings(creatures.map(c => c.type)),
          environment: toUniqueStrings(creatures.flatMap(c => c.environment)),
          tags: toUniqueStrings(creatures.flatMap(c => c.tags)),
          system: toUniqueStrings(creatures.map(c => c.system)),
          cr: toUniqueNumbers(creatures.map(c => c.cr)),
          source: toUniqueStrings(creatures.map(c => c.source))
        },
        abilityOptions: {
          tags: toUniqueStrings(abilities.flatMap(c => c.tags)),
        },
        ideaOptions: {
          tags: toUniqueStrings(ideas.flatMap(i => i.tags)),
          categories: toUniqueStrings(ideas.map(i => i.category)),
        },
        initialized: true
      })
    }
  }
})

function toUniques<T> (values: (T | undefined | null)[]): T[] {
  return filter(uniq(values), (s) => s !== undefined) as T[]
}

function toUniqueStrings (values: (string | undefined | null)[]): string[] {
  return toUniques(values).sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
}

function toUniqueNumbers (values: (number | undefined | null)[]): number[] {
  return toUniques(values).sort((a, b) => a - b)
}
