import { getCreatures } from '@/api/creature'
import { Creature } from '@/types/creatures'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'

class CreatureState {
  creatures: Creature[] = [];
}

class CreatureGetters extends Getters<CreatureState> {
  get (id: number): Creature | undefined {
    return this.state.creatures.find((creature) => creature.id === id)
  }
}

class CreatureMutations extends Mutations<CreatureState> {
  setCreatures (creatures: Creature[]) {
    this.state.creatures = creatures
  }
}

class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
  async fetchCreatures () {
    var results = await getCreatures()
    console.log(this.mutations)
    this.mutations.setCreatures(results)
    console.log(this.state)
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters,
  mutations: CreatureMutations,
  actions: CreatureActions
})

export const creatureMapper = createMapper(creatureModule)
