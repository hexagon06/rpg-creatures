import { IdItem, Reference, ReferenceCount } from '.'
import { Tag } from './tags'

export type EncounterBase = {
  name: string
  synopsis: string
  tags: Tag[]
  group? :string
}

export type EncounterIndex = Reference & EncounterBase

export type Encounter = IdItem & EncounterBase & {
  flavorText: string
  description: string
  reward?: string
  locations: Reference[]
  creatures: ReferenceCount[]
  environment: string[]
}
