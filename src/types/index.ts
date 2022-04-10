import { Creature } from './creatures'
import { Encounter } from './encounter'
import { SessionPrep } from './gameSession'
import { RollingList } from './rollingList'

export * from './abilities'
export * from './creatures'
export * from './encounter'
export * from './gameSession'
export * from './ideas'
export * from './indexes'
export * from './rollingList'
export * from './tags'

export type IdItem = { id?: string }

export type Reference = { id: string }

export type ReferenceCount = Reference & { count: number }

export type LabeledReference = Reference & { label: string }

export type ReferenceLink = LabeledReference & { routerName: string }

export type ReferenceListItem = LabeledReference & { routerName?: string }

export type ReferenceType = Creature | Encounter | SessionPrep | RollingList

export type ReferenceInstance = Reference & ReferenceType
