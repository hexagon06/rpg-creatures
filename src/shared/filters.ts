import { difference } from 'lodash'
import { CreatureFilter, CreatureIndex, ListFilter, RollingListIndex } from 'rpg-vue-base'

export function filterCreature (
  creature: CreatureIndex,
  filter: CreatureFilter
): boolean {
  return (
    creature.name.toLowerCase().includes(filter.search.toLowerCase()) &&
    valueIsInSet(creature.size, filter.size) &&
    valueIsInSet(creature.type, filter.type) &&
    valueIsInSet(creature.system, filter.system) &&
    valueIsInSet(creature.cr, filter.cr) &&
    valueContainsSet(creature.environment, filter.environment) &&
    valueContainsSet(creature.tags, filter.tags) &&
    valueIsInSet(creature.source, filter.source) &&
    valueIsFilter(creature.favorite, filter.favorite)
  )
}

export function filterList (
  list: RollingListIndex,
  filter: ListFilter,
): boolean {
  return (
    list.name.toLowerCase().includes(filter.search.toLowerCase())
  )
}

function valueIsInSet<T> (value: T, filter: T[]): boolean {
  return filter.length === 0 || filter.indexOf(value) >= 0
}
function valueContainsSet<T> (value: T[], filter: T[]): boolean {
  return filter.length === 0 || difference(filter, value).length === 0
}
function valueIsFilter (value: boolean, filter: boolean): boolean {
  return filter ? value === filter : true
}
