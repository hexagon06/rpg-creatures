import { CreatureIndex, EncounterIndex, SessionPrepIndex } from '.'
import { IdeaIndex } from './ideas'

export type UserIndexes = {
  id: string, // user id
  encounters: EncounterIndex[]
  sessions?: SessionPrepIndex[]
  ideas?: IdeaIndex[]
}

export type Indexes = UserIndexes & {
  creatures: CreatureIndex[]
}
