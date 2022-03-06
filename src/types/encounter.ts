import { CreatureIndex, IdItem, Reference, ReferenceCount } from '.'
import { Tag } from './tags'

export type EncounterBase = {
  name: string
  synopsis: string
  tags: Tag[]
  group?: string
}

export type EncounterIndex = Reference & EncounterBase

export function getEncounterIndex (id: string, encounter: Encounter): EncounterIndex {
  return {
    id: id,
    name: encounter.name,
    synopsis: encounter.synopsis,
    tags: encounter.tags,
  }
}

export type Encounter = IdItem & EncounterBase & {
  flavorText: string
  description: string
  reward?: string
  locations: Reference[]
  creatures: ReferenceCount[]
  environment: string[]
}

export type FilledEncounter = IdItem & EncounterBase & {
  flavorText: string
  description: string
  reward?: string
  locations: Reference[]
  creatures: (CreatureIndex & { count: number })[]
  environment: string[]
}
