import { IdItem, Reference, Tag } from '.'

export type CreatureBase = {
  cr?: number
  environment: string[]
  favorite: boolean
  name: string
  newTags: Tag[]
  image?: string
  size?: string
  source?: string
  system?: string
  tags: string[]
  type?: string
}

export function creatureLabel (creature: CreatureBase): string {
  const descriptors: string[] = []

  if (creature.cr !== undefined) descriptors.push(`CR${creature.cr}`)
  if (creature.type !== undefined) descriptors.push(creature.type)
  if (descriptors.length > 0) {
    return `${creature.name} (${descriptors.join(' ')})`
  } else {
    return `${creature.name}`
  }
}

export type CreatureIndex = Reference & CreatureBase

export function getCreatureIndex (creature: Creature): CreatureIndex {
  if (creature.id) {
    const { id, cr, environment, favorite, name, newTags, image, size, source, system, tags, type } = creature
    return {
      id, cr, environment, favorite, name, newTags, image, size, source, system, tags, type
    }
  } else throw new Error('creature.id should be set to create an index')
}

export type RPGAbilities = {
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}

export type Creature = IdItem & CreatureBase & {
  ac?: number
  abilityKeys: string[]
  abilityScores: RPGAbilities
  alignment: string[]
  amountHitDice?: number
  burrowSpeed?: number
  charisma?: number
  constitution?: number
  comments?: string
  climbSpeed?: number
  dexterity?: number
  flyingSpeed?: number
  hp?: number
  hpFormula?: string
  hitDice?: number
  intelligence?: number
  image?: string
  link?: string
  nameIsNoun: boolean
  organisation: string[]
  page?: string
  pronoun1?: string
  pronoun2?: string
  strength?: number
  speed?: number
  swimSpeed?: number
  wisdom?: number
}
