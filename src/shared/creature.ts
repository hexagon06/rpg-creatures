import { Creature } from '@/types/creatures'

export function createDefaultCreature (name: string): Creature {
  return {
    name,
    abilityScores: {},
    alignment: [],
    organisation: [],
    environment: [],
    tags: [],
    newTags: [],
    favorite: false,
    abilityKeys: [],
    nameIsNoun: false
  }
}
