import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { abilityModule } from './abilities'
import { shopModule } from './shops'
import { userModule } from './users'

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
    userModule,
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
export const userStore = rootModule.context(store).modules.userModule
