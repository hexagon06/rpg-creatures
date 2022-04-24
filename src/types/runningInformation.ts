import { IdItem } from 'rpg-vue-base'

export type RunningInformationPart = {
  title: string
  content: string
  sortOrder: number
}

export type RunningInformation = IdItem & {
  userId: string
  parts: RunningInformationPart[]
}

export function createDummyInfo (order: number): RunningInformationPart {
  return {
    title: `Item ${order + 1}`,
    content: `Content for item ${order + 1}`,
    sortOrder: order,
  }
}
