import { IdItem, Tag } from '.'

export type CreatureBase = {
  name: string
  type?: string
  cr?: number
  tags: string[]
  newTags: Tag[]
  system?: string
  favorite: boolean
}

export type CreatureIndex = Reference & EncounterBase

export type Creature = IdItem & EncounterBase & {
  link?: string
  source?: string
  page?: string
  size?: string
  type?: string
  alignment: string[]
  ac?: number
  hp?: number
  hitDice?: number
  amountHitDice?: number
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  hpFormula?: string
  speed?: number
  organisation: string[]
  environment: string[]
  flyingSpeed?: number
  swimSpeed?: number
  climbSpeed?: number
  burrowSpeed?: number
  comments?: string
  image?: string
  abilityKeys: string[]
  nameIsNoun: boolean
  pronoun1?: string
  pronoun2?: string
}

type RPGAbilities = {
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}
