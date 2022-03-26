import { CreatureIndex, EncounterIndex, SessionPrepIndex } from '.'

export type UserIndexes = {
  id: string, // user id
  encounters: EncounterIndex[]
  sessions?: SessionPrepIndex[]
}

export type Indexes = UserIndexes & {
  creatures: CreatureIndex[]
}
