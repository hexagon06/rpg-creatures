import { Creature } from '@/types/creatures'
import { Getters, Module, createMapper } from 'vuex-smart-module'

class CreatureState {
  creatures: Creature[] = []
}

class CreatureGetters extends Getters<CreatureState> {
  get (id: string): Creature | undefined {
    return this.state.creatures.find((creature) => creature.id === id)
  }
}

export const creatureModule = new Module({
  state: CreatureState,
  getters: CreatureGetters
})

export const reatureMapper = createMapper(creatureModule)
