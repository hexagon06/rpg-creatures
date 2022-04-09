import { IdItem, Reference, ReferenceInstance, ReferenceListItem } from '.'

export type RollingListItem = {
  weight: number
  order: number
  repeatable: boolean
}

export function getRollingListItem (lastOrder: number): ReferenceListItem & RollingListItem {
  const id = Date.now().toString()
  return {
    label: '',
    weight: 1,
    order: lastOrder + 1,
    repeatable: true,
    id
  }
}

export type RollingListBase = {
  name: string
  userId: string
}

export type RollingListIndex = Reference & RollingListBase

export function getRollingListIndex (id: string, idea: RollingList): RollingListIndex {
  return {
    id,
    userId: idea.userId,
    name: idea.name,
  }
}

export type RollingList = IdItem & RollingListBase & {
  items: (ReferenceListItem & RollingListItem)[]
}

export type FilledRollingList = IdItem & RollingListBase & {
  items: (ReferenceListItem & ReferenceInstance)[]
}
