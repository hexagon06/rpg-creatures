import { DatedItem } from 'rpg-vue-base'
import { now } from 'moment-timezone'

export function setInitialDates<T extends DatedItem> (item: T): T {
  const created = now()
  const lastEdited = created
  return {
    ...item,
    created,
    lastEdited,
  } as T
}

export function setEditedDate<T extends DatedItem> (item: T): T {
  const created = item.created ? item.created : now()
  const lastEdited = now()
  return {
    ...item,
    created,
    lastEdited,
  } as T
}
