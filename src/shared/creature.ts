import { Creature } from '@/types'
import { setInitialDates } from './dates'

export function createDefaultCreature(name: string): Creature {

  return setInitialDates({
    name,
    abilityScores: {},
    alignment: [],
    organisation: [],
    environment: [],
    tags: [],
    newTags: [],
    favorite: false,
    abilityKeys: [],
    nameIsNoun: false,
    created: 0,
    lastEdited: 0,
  })
}
