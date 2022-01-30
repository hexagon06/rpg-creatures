import { CreatureAbilityValues } from '@/types/abilities'
import { Creature } from '@/types/creatures'
import { uniq } from 'lodash'

const propertiesRegex = new RegExp(/(#[\w-]+)/, 'gm')
const variablesRegex = new RegExp(/(\$[\w-]+)/, 'gm')
const spellsRegex = new RegExp(/(~[\w\s]+~)/, 'gm')
const returnRegex = new RegExp(/([\r\n])/, 'gm')
const formulaeRegex = new RegExp(/(\^[\w]+)/, 'gm')

export type AbilityFormat = {
  properties: string[]
  variables: string[]
  spells: string[]
  formulae: string[]
  returns: number[]
}

export function parseFormatText (text: string): AbilityFormat {
  const properties = [...text.matchAll(propertiesRegex)]
  const variables = [...text.matchAll(variablesRegex)]
  const spells = [...text.matchAll(spellsRegex)]
  const returns = [...text.matchAll(returnRegex)]
  const formulae = [...text.matchAll(formulaeRegex)]

  return {
    properties: uniq(properties.map(match => match[0].substring(1))),
    variables: uniq(variables.map(match => match[0].substring(1))),
    formulae: uniq(formulae.map(match => match[0].substring(1))),
    spells: uniq(spells.map(match => match[0].substring(1, match[0].length - 1))),
    returns: returns.map(match => match.index!)
  }
}

export type CreatureProperties = {
  Name: string
  name: string
  pron1: string
  pron2: string
  strength?: number
  dexterity?: number
  constitution?: number
  intelligence?: number
  wisdom?: number
  charisma?: number
  speed?: number
}
const creaturePropertiesInstance: CreatureProperties = {
  Name: '',
  name: '',
  pron1: '',
  pron2: '',
  strength: 0,
  dexterity: 0,
  constitution: 0,
  intelligence: 0,
  wisdom: 0,
  charisma: 0,
  speed: 0,
}

type propertyKey = keyof CreatureProperties
function isPropertyKey (tbd: string): tbd is propertyKey {
  return Object.keys(creaturePropertiesInstance).indexOf(tbd) != -1
}

export function setProperties (text: string, format: AbilityFormat, creature: CreatureProperties) {
  const invalid = [] as string[]
  let newText = text
  format.properties.forEach(property => {
    if (isPropertyKey(property)) {
      const value = creature[property]
      if (value !== undefined) {
        newText = newText.replaceAll(`#${property}`, value.toString())
      }
    } else {
      invalid.push(property)
    }
  })
  return {
    text: newText,
    invalid
  }
}

export function toProperties (creature: Creature): CreatureProperties {
  const {
    name, nameIsNoun,
    pronoun1, pronoun2,
    strength, dexterity,
    constitution, intelligence,
    wisdom, charisma, speed } = creature

  return {
    Name: nameIsNoun ? name : `The ${name}`,
    name: nameIsNoun ? name : `the ${name}`,
    pron1: pronoun1 ?? 'it',
    pron2: pronoun2 ?? 'its',
    strength, dexterity, constitution, intelligence, wisdom, charisma,
    speed
  }
}

export function setVariables (text: string, format: AbilityFormat, values: CreatureAbilityValues) {
  const missingVariables = [] as string[]
  const missingFormulae = [] as string[]
  let newText = text
  format.variables.forEach(variable => {
    const kvp = values.variables.find(v => v.k === variable)
    if (kvp) {
      newText = newText.replaceAll(`$${kvp.k}`, kvp.v)
    } else {
      missingVariables.push(variable)
    }
  })
  format.formulae.forEach(formula => {
    const kvvp = values.formulae.find(f => f.k === formula)
    if (kvvp) {
      newText = newText.replaceAll(`^${kvvp.k}`, `${kvvp.a}d${kvvp.n}`)
    } else {
      missingFormulae.push(formula)
    }
  })
  return {
    text: newText,
    missingVariables,
    missingFormulae,
  }
}

export function formatAbilityForCreature (text: string, creature: Creature, values: CreatureAbilityValues) {
  const format = parseFormatText(text)
  const properties = toProperties(creature)
  const creatureText = setProperties(text, format, properties)
  const variableText = setVariables(creatureText.text, format, values)

  return {
    ...variableText,
    invalidProperties: creatureText.invalid,
  }
}
