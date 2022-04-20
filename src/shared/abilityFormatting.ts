import { CreatureAbilityValues } from '@/types'
import { Creature } from '@/types'
import { isNumber, uniq } from 'lodash'
import { toMod } from '.'
import { modString, toDiceFormula } from './hitDice'

const propertiesRegex = new RegExp(/(#[\w-]+)/, 'gm')
const variablesRegex = new RegExp(/(\$[\w-]+)/, 'gm')
const spellsRegex = new RegExp(/(~[\w\s]+~)/, 'gm')
const returnRegex = new RegExp(/(?:[\r\n])/, 'gm')
const formulaeRegex = new RegExp(/(\^[\w]+)/, 'gm')
const cursiveRegex = new RegExp(/(_[\w\s:]+_)/, 'gm')

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

function toProficiency (cr: number): number {
  return Math.max(1, Math.ceil(cr / 4)) + 1
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
  prof_str: number,
  prof_dex: number,
  prof_con: number,
  prof_wis: number,
  prof_int: number,
  prof_cha: number,
  proficiency: number,
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
  prof_str: 0,
  prof_dex: 0,
  prof_con: 0,
  prof_wis: 0,
  prof_int: 0,
  prof_cha: 0,
  proficiency: 0,
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
        if (isNumber(value)) {
          newText = newText.replaceAll(`#${property}`, modString(value) ?? '')
        } else {
          newText = newText.replaceAll(`#${property}`, value)
        }
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
    wisdom, charisma, speed, cr } = creature

  const proficiency = cr === undefined ? 0 : toProficiency(cr)

  return {
    Name: nameIsNoun ? name : `The ${name}`,
    name: nameIsNoun ? name : `the ${name}`,
    pron1: pronoun1 ?? 'it',
    pron2: pronoun2 ?? 'its',
    strength, dexterity, constitution, intelligence, wisdom, charisma,
    speed,
    proficiency,
    prof_str: (toMod(strength) ?? 0) + proficiency,
    prof_dex: (toMod(dexterity) ?? 0) + proficiency,
    prof_con: (toMod(constitution) ?? 0) + proficiency,
    prof_wis: (toMod(wisdom) ?? 0) + proficiency,
    prof_int: (toMod(intelligence) ?? 0) + proficiency,
    prof_cha: (toMod(charisma) ?? 0) + proficiency,
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
      const formText = toDiceFormula(Number(kvvp.a), Number(kvvp.n), Number(kvvp.m))
      newText = newText.replaceAll(`^${kvvp.k}`, formText)
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
export function formatForRender (text: string) {
  const format = parseFormatText(text)

  const paragraphs = text.split(returnRegex)
  const texted = paragraphs.map(p => formatTextParts(p))
  return texted
}

export type TextPart = {
  text: string
  isSpell: boolean
  italic: boolean
}

function formatTextParts (text: string): TextPart[] {
  const split = text.split(spellsRegex)
  return split.map(s => {
    if (spellsRegex.test(s)) {
      return [{
        text: s.slice(1, s.length - 1),
        isSpell: true,
        italic: false
      }]
    } else {
      const cSplit = s.split(cursiveRegex)
      return cSplit.map(cs => {
        if (cursiveRegex.test(cs)) {
          return {
            text: cs.slice(1, cs.length - 1),
            isSpell: false,
            italic: true,
          }
        } else {
          return {
            text: cs,
            isSpell: false,
            italic: false,
          }
        }
      })
    }
  }).flat()
}

const LEGENDARY_FORMAT = '#Name can take 3 legendary actions, choosing from the options below. Only one legendary action option can be used at a time and only at the end of another creature\'s turn. #Name regains spent legendary actions at the start of #pron2 turn.'

export function getLegendaryText (creature: Creature): string {
  const format = parseFormatText(LEGENDARY_FORMAT)
  const properties = toProperties(creature)
  const creatureText = setProperties(LEGENDARY_FORMAT, format, properties)
  return creatureText.text
}

