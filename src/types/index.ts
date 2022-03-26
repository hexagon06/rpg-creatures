export * from './abilities'
export * from './creatures'
export * from './encounter'
export * from './shops'
export * from './tags'
export * from './indexes'
export * from './gameSession'

export type IdItem = { id?: string }

export type Reference = { id: string }

export type ReferenceCount = Reference & { count: number }

export type LabeledReference = Reference & { label: string }

export type ReferenceLink = LabeledReference & { routerName: string }

export type ReferenceListItem = LabeledReference & { routerName?: string }
