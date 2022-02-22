import { IdItem } from '.'

export type Ability = IdItem & {
  name: string
  key: string
  text: string
  tags: string[]
  dice: string[]
  type: AbilityType
}

export type AbilityType = 'skill' | 'action' | 'reaction' | 'legendary'

export type CreatureAbilityValues = {
  key: string
  variables: kvp[]
  formulae: kvvp[]
}

export type MappedAbility = { ability: Ability; values: CreatureAbilityValues }

type kvp = { k: string; v: string }
type kvvp = { k: string; a: number; n: number, m: number }

export function toAbilityValues (value: string): CreatureAbilityValues {
  return JSON.parse(value.replaceAll("§", ",")) as CreatureAbilityValues
}

export function toMappedAbility (abilities: Ability[], values: CreatureAbilityValues): MappedAbility {
  const ability = abilities.find((a) => a.key === values.key)
  if (ability) {
    return {
      values,
      ability,
    }
  } else {
    throw new Error("ability should not be undefined")
  }
}
