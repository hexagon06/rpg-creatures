import { Creature } from '@/types/creatures'
import { Getters, Module, createMapper, Actions, Mutations } from 'vuex-smart-module'
import api from '@/api/creature'

class CreatureState {
  creatures: Creature[] = [];
}

class CreatureGetters extends Getters<CreatureState> {
  get (id: string): Creature | undefined {
    return this.state.creatures.find((creature) => creature.id === id)
  }
}

class CreatureMutations extends Mutations<CreatureState> {

}

class CreatureActions extends Actions<CreatureState, CreatureGetters, CreatureMutations, CreatureActions> {
  async fetchCreatures () {
    await api.testGet()
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters,
  actions: CreatureActions
})

export const reatureMapper = createMapper(creatureModule)
