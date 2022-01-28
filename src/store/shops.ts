import { getShops, updateShop } from '@/api/shop'
import { Shop } from '@/types/shops'
import Vue from 'vue'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'

class ShopState {
  shops: Shop[] = [];
  selectedShop: Shop | undefined
  initialized = false;
  currentPage = 1;
  filteredCount = 0;
  perPage = 20;
}

class ShopGetters extends Getters<ShopState> {
  get (id: number): Shop | undefined {
    return this.state.shops.find((shop) => shop.id === id)
  }
}

class ShopMutations extends Mutations<ShopState> {
  setShops (shops: Shop[]) {
    this.state.shops = shops
  }
  setInitialized (init: boolean) {
    this.state.initialized = init
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
  setSelectedShop (shop?: Shop) {
    // need to do this with set because the mappers and reactive stuff does not handle nullable properly
    Vue.set(this.state, 'selectedShop', shop)
  }
  addShop (shop: Shop) {
    this.state.shops.push(shop)
  }
  updateShop (shop: Shop) {
    const storedShop = this.state.shops.find(c => c.id === shop.id)
    // using assign so we dont add the update source to the vue state. 
    // this way we can using that object to edit
    Object.assign(storedShop, shop)
  }
  updateFavorite (update: { shopId: number, favorite: boolean }) {
    const { favorite, shopId } = update
    // const index = this.state.shops.findIndex(c => c.id === update.shopId)
    // Vue.set(this.state.shops[index], 'favorite', update.favorite)
    const shop = this.state.shops.find(c => c.id === shopId)
    Object.assign(shop, { favorite })
  }
}

class ShopActions extends Actions<ShopState, ShopGetters, ShopMutations, ShopActions> {
  async initialize () {
    await this.actions.fetchShops()
    this.mutations.setInitialized(true)
  }
  async fetchShops () {
    var results = await getShops()
    this.mutations.setShops(results)
    this.mutations.setFilteredCount(results.length)
  }
  async setSelectedShop (id?: number) {
    if (id === undefined) {
      this.commit('setSelectedShop', undefined)
    } else {
      const shop = this.getters.get(id)
      this.commit('setSelectedShop', shop)
    }
  }
  // async createShop (shop: Shop) {
  //   // making sure we allow google to generate an id
  //   shop.id = undefined
  //   const newId = await createShop(shop)
  //   shop.id = newId
  //   this.mutations.addShop(shop)
  // }
  async updateFavorite (update: { shopId: number, favorite: boolean }) {
    this.mutations.updateFavorite(update)
    const shop = this.getters.get(update.shopId)
    if (shop) {
      await updateShop(shop)
    }
  }
  async updateShop (shop: Shop) {
    this.mutations.updateShop(shop)
    await updateShop(shop)
  }
}

export const shopModule = new Module({
  state: ShopState,
  getters: ShopGetters,
  mutations: ShopMutations,
  actions: ShopActions
})

export const shopMapper = createMapper(shopModule)
