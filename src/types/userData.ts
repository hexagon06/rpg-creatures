import { DatedItem, IdItem, Reference } from 'rpg-vue-base'

export type UserDataBase = {
  name: string,
  userId: string,
  alias?: string,
}

export type UserDataIndex = Reference & DatedItem & UserDataBase
export function getUserDataIndex (id: string, userData: UserData): UserDataIndex {
  const { name, alias, created, lastEdited, userId } = userData
  return {
    id, name, alias, created, lastEdited, userId
  }
}

export type UserData = IdItem & DatedItem & UserDataBase & {
  lastWorldId?: string,
}
