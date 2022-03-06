import { IdItem } from '.'

export type Tag = IdItem & {
  label: string
  color?: string
  icon?: string
}
