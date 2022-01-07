import Vue from 'vue'
import Vuex from 'vuex'
import { createStore, Module } from 'vuex-smart-module'
import { creatureModule } from './creatures'
import { filterModule } from './filter'

class RootState {
  started = true
}

export const rootModule = new Module({
  state: RootState,
  modules: {
    creatureModule,
    filterModule
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
