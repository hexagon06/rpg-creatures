import { CreatureIndex, EncounterIndex } from '.'

export type UserIndexes = {
  id: string, // user id
  encounters: EncounterIndex[]
}

export type Indexes = UserIndexes & {
  creatures: CreatureIndex[]
}
