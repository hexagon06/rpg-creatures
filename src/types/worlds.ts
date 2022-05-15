import { DatedItem, IdItem, Reference } from 'rpg-vue-base'


export type WorldPageBase = {
  name: string
  synopsis: string
}

export type WorldBase = WorldPageBase & {
  author: string
}
export type WorldIndex = Reference & DatedItem & WorldBase
export function getWorldIndex (id: string, world: World): WorldIndex {
  const { name, synopsis, created, lastEdited, author } = world
  return {
    id, name, synopsis, created, lastEdited, author
  }
}
export type World = IdItem & DatedItem & WorldBase & {
  pages: WorldPageIndex[]
}
export type FilledWorld = IdItem & DatedItem & WorldBase & {
  pages: WorldPageIndex[]
}


export type WorldPageIndex = Reference & DatedItem & WorldPageBase
export function getWorldPageIndex (id: string, world: WorldPage): WorldPageIndex {
  const { name, synopsis, created, lastEdited } = world
  return {
    id, name, synopsis, created, lastEdited
  }
}
export type WorldPage = IdItem & DatedItem & WorldPageBase & {}
