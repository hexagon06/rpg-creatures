import { Creature } from '@/types/creatures'

export function createDefaultCreature (name: string): Creature {
  return {
    name,
    alignment: [],
    organisation: [],
    environment: [],
    tags: [],
    favorite: false,
    abilityKeys: [],
    nameIsNoun: false
  }
}
