import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { abilityModule } from './abilities'
import { filterModule } from './filter'
import { shopModule } from './shops'
import { userModule } from './users'
import { indexesModule } from './indexes'

export { abilityMapper } from './abilities'
export { filterMapper } from './filter'
export { shopMapper } from './shops'
export { indexesMapper, } from './indexes'
class RootState {
  started = true
}

export const rootModule = new Module({
  state: RootState,
  modules: {
    abilityModule,
    filterModule,
    shopModule,
    userModule,
    indexesModule,
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

export const filterStore = rootModule.context(store).modules.filterModule
export const shopStore = rootModule.context(store).modules.shopModule
export const abilityStore = rootModule.context(store).modules.abilityModule
export const userStore = rootModule.context(store).modules.userModule
export const indexesStore = rootModule.context(store).modules.indexesModule
