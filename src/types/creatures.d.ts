export type Creature = {
  id?: number
  link?: string //
  source?: string //
  page?: string //
  name: string //
  size?: string //
  type?: string //
  alignment: string[] //
  ac?: number //
  hp?: number //
  hitDice?: number //
  amountHitDice?: number //
  strength?: number //
  dexterity?: number //
  constitution?: number //
  intelligence?: number //
  wisdom?: number //
  charisma?: number //
  hpFormula?: string //
  speed?: number //
  cr?: number //
  organisation: string[] //
  environment: string[] //
  system?: string //
  tags: string[] //
  flyingSpeed?: number //
  swimSpeed?: number //
  climbSpeed?: number //
  burrowSpeed?: number //
  comments?: string //
  image?: string //
  favorite: boolean //
  abilityKeys: string[]
  nameIsNoun: boolean
}

type RPGAbilities = {
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
}
