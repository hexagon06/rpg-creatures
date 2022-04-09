import { CreatureIndex, EncounterIndex, SessionPrepIndex } from '.'
import { IdeaIndex } from './ideas'
import { RollingListIndex } from './rollingList'

export type UserIndexes = {
  id: string, // user id
  encounters: EncounterIndex[]
  sessions?: SessionPrepIndex[]
  ideas?: IdeaIndex[]
  lists?: RollingListIndex[]
}

export type Indexes = UserIndexes & {
  creatures: CreatureIndex[]
}
