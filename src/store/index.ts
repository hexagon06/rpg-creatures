import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { abilityModule } from './abilities'
import { creatureModule } from './creatures'
import { filterModule } from './filter'
import { shopModule } from './shops'

export { abilityMapper } from './abilities'
export { creatureMapper } from './creatures'
export { filterMapper, CreatureFilter } from './filter'
export { shopMapper } from './shops'
class RootState {
  started = true
}

export const rootModule = new Module({
  state: RootState,
  modules: {
    abilityModule,
    creatureModule,
    filterModule,
    shopModule,
  }
})

Vue.use(Vuex)

export const store = createStore(
  // Root module
  rootModule,

  // Vuex store options
  {
    strict: process.env.NODE_ENV !== 'production'
  }
)

export const creatureStore = rootModule.context(store).modules.creatureModule
export const filterStore = rootModule.context(store).modules.filterModule
export const shopStore = rootModule.context(store).modules.shopModule
export const abilityStore = rootModule.context(store).modules.abilityModule
