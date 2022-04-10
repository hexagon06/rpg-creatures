import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { abilityModule } from './abilities'
import { shopModule } from './shops'

export { abilityMapper } from './abilities'
export { shopMapper } from './shops'
class RootState {
  started = true
}

export const rootModule = new Module({
  state: RootState,
  modules: {
    abilityModule,
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

export const shopStore = rootModule.context(store).modules.shopModule
export const abilityStore = rootModule.context(store).modules.abilityModule
