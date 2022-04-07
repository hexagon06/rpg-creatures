export type Filter<T> = {
  apply (collection: T[]): T[]
}

export class FilterResult {
  count: number = 0
  pageSize: number = 20
  currentPage: number = 0
}

export function defaultResult (): FilterResult {
  return {
    count: 0,
    pageSize: 20,
    currentPage: 1
  }
}

export class CreatureFilter {
  search: string = ''
  size: string[] = []
  type: string[] = []
  environment: string[] = []
  tags: string[] = []
  system: string[] = []
  cr: number[] = []
  source: string[] = []
  favorite: boolean = false
}

export type CreatureFilterOptions = {
  size: string[]
  type: string[]
  environment: string[]
  organisation: string[]
  tags: string[]
  system: string[]
  cr: number[]
  source: string[]
}

export type IdeaFilterOptions = {
  tags: string[],
  categories: string[],
}

export function defaultCreatureFilterOptions (): CreatureFilterOptions {
  return {
    size: [],
    type: [],
    organisation: [],
    environment: [],
    tags: [],
    system: [],
    cr: [],
    source: [],
  }
}

export type AbillityFilterOptions = {
  tags: string[]
}
