import { CreatureIndex, EncounterIndex, SessionPrepIndex } from '.'
import { IdeaIndex, RollingListIndex } from '@/types'
import { WorldIndex } from './worlds'
import { UserDataIndex } from './userData'

export type UserIndexes = {
  id: string, // user id
  encounters: EncounterIndex[]
  sessions?: SessionPrepIndex[]
  ideas?: IdeaIndex[]
  lists?: RollingListIndex[]
  worlds?: WorldIndex[]
}

export type Indexes = UserIndexes & {
  creatures: CreatureIndex[]
  users: UserDataIndex[]
}
