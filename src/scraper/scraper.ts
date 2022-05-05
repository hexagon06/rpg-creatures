import { setInitialDates } from '@/shared/dates'
import { toCreatureSize, toCreatureType } from '@/types'
import $ from 'jquery'
import { Creature } from 'rpg-vue-base'

export function scrapeCreature (source: string) {
  const e = $(source)

  const name = text(e, 'h1')
  const subscript = text(e, '.type')

  const creature = {
    name,
    ...parseSubscript(subscript)
  }
  console.log('scrapeCreature', creature)

  return creature
}

function text (element: JQuery<HTMLElement>, selector: string) {
  return element.find(selector).text()
}

const splitSubscriptRegex = new RegExp(/^(\w+) (.+), (.+)$/)

function parseSubscript (script: string) {
  const result = splitSubscriptRegex.exec(script)

  let parsed = {}
  if (result) {
    const size = result[1]
    const type = result[2]
    const alignment = result[3]
    parsed = {
      ...parsed,
      size: toCreatureSize(size),
      ...parseCreatureType(type),
      alignment: toAlignment(alignment),
    }
  }
  console.log('parseSubscrip', parsed)

  return parsed
}

// word (optional)
const splitCreatureType = new RegExp(/(\w+)(?: \((\w+)\))?/)

function parseCreatureType (type: string) {
  const result = splitCreatureType.exec(type)
  let parsed = {}
  if (result) {
    parsed = { ...parsed, type: toCreatureType(result[1]) }
    if (result[2]) {
      parsed = { ...parsed, subType: result[2] }
    }
  }
  return parsed
}

function toAlignment (alignment: string): string[] {
  return alignment.split(' ').filter(a => a !== 'alignment')
}
