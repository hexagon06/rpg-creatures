import { createAbility, getAbilities, updateAbility } from '@/api/ability'
import { Ability } from '@/types/abilities'
import { defineStore } from 'pinia'
import Vue from 'vue'

export const useAbilityStore = defineStore('abilities', {
  state: () => {
    return {
      abilities: [] as Ability[],
      selectedAbility: undefined as Ability | undefined,
      initialized: false,
      currentPage: 1,
      filteredCount: 0,
      perPage: 20,
    }
  },
  actions: {
    get (id: string): Ability | undefined {
      return this.abilities.find((ability) => ability.id === id)
    },
    async initialize () {
      await this.fetchAbilities()
      this.initialized = true
    },
    async fetchAbilities () {
      var results = await getAbilities()
      this.abilities = results
      this.filteredCount = results.length
    },
    async setSelectedAbility (id?: string) {
      if (id === undefined) {
        this.selectedAbility = undefined
      } else {
        const ability = this.get(id)
        this.selectedAbility = ability
      }
    },
    async createAbility (ability: Ability) {
      // making sure we allow google to generate an id
      ability.id = undefined
      const newId = await createAbility(ability)
      ability.id = newId
      this.abilities.push(ability)
    },
    async updateFavorite (update: { abilityId: string, favorite: boolean }) {
      const { favorite, abilityId } = update
      // const index = this.state.abilities.findIndex(c => c.id === update.abilityId)
      // Vue.set(this.state.abilitys[index], 'favorite', update.favorite)
      const ability = this.get(abilityId)
      console.warn('check if this still should be done this way')
      Object.assign(ability, { favorite })
      if (ability) {
        await updateAbility(ability)
      }
    },
    async updateAbility (ability: Ability) {
      const index = this.abilities.findIndex(a => a.id === ability.id)
      this.abilities[index] = ability
      await updateAbility(ability)
    },
  }
})
